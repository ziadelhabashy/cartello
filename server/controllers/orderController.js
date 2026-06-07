const Order   = require('../models/Order');
const Product = require('../models/Product');

const SHIPPING_RATES = {
  Cairo: 50, Giza: 50, Alexandria: 70, Dakahlia: 80, Sharqia: 80, Monufia: 75,
  Qalyubia: 60, Beheira: 85, 'Kafr El Sheikh': 85, Gharbia: 80, 'Port Said': 90,
  Suez: 90, Ismailia: 85, Damietta: 85, Fayoum: 75, 'Beni Suef': 80, Minya: 90,
  Assiut: 100, Sohag: 110, Qena: 120, Luxor: 130, Aswan: 140, 'Red Sea': 120,
  'New Valley': 150, Matrouh: 120, 'North Sinai': 130, 'South Sinai': 140
};

async function sendOrderEmail(order) {
  if (!process.env.WEB3FORMS_ACCESS_KEY) return;

  const orderItems = order.items
    .map(item => `${item.name} x${item.quantity} - EGP ${item.price}`)
    .join('\n');

  const orderDetailsBase = {
    access_key: process.env.WEB3FORMS_ACCESS_KEY,
    from_name: 'Cartello Store',
    name: order.customer.name,
    phone: order.customer.phone,
    governorate: order.customer.governorate,
    address: order.customer.address,
    paymentMethod: order.paymentMethod,
    subtotal: `EGP ${order.subtotal}`,
    shipping: `EGP ${order.shipping}`,
    total: `EGP ${order.total}`,
    items: orderItems
  };

  try {
    // Send order confirmation email to CUSTOMER
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...orderDetailsBase,
        email: order.customer.email,
        subject: `Order Confirmation - Order #${order._id.toString().slice(-6).toUpperCase()}`,
        message: `Thank you for your order! Your order has been received and will be processed soon.`
      })
    });

    // Send order notification email to ADMIN
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...orderDetailsBase,
        email: 'cartelloteam@gmail.com', // Admin email from your store
        subject: `🔔 New Order Received - Order #${order._id.toString().slice(-6).toUpperCase()}`,
        message: `A new order has been placed and requires your attention.`
      })
    });

    console.log('Order emails sent successfully to customer and admin');
  } catch (emailError) {
    console.error('Order email failed:', emailError.message);
  }
}

// POST /api/orders
exports.placeOrder = async (req, res) => {
  try {
    const { userId, customer, cart, paymentMethod } = req.body;

    if (!customer || !cart || Object.keys(cart).length === 0) {
      return res.status(400).json({ message: 'Customer details and cart are required.' });
    }
    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required.' });
    }

    const productIds     = Object.keys(cart);
    const productsFromDB = await Product.find({ _id: { $in: productIds } });

    let subtotal = 0;
    const items = productIds.map(id => {
      const product = productsFromDB.find(p => p._id.toString() === id);
      if (!product) return null;
      const qty = cart[id];
      subtotal += product.price * qty;
      return { productId: id, name: product.name, price: product.price, quantity: qty };
    }).filter(Boolean);

    // Decrease stock for each ordered item
    await Promise.all(
      items.map(item =>
        Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } })
      )
    );

    const shipping = SHIPPING_RATES[customer.governorate] || 0;
    const total    = subtotal + shipping;

    const newOrder = new Order({
      userId: userId || null,
      customer,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod
    });
    await newOrder.save();

    // Send emails to both customer and admin
    await sendOrderEmail(newOrder);

    res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /api/orders/user/:userId
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /api/admin/orders
exports.adminGetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST /api/admin/orders/:id/status
exports.adminUpdateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status.' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    // Restore stock if cancelling a non-cancelled order
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      await Promise.all(
        order.items.map(item =>
          Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } })
        )
      );
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};