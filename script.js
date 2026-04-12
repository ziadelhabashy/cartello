// 1. Simple object to store product quantities: { productId: quantity }
let cartData =JSON.parse(localStorage.getItem("cart")) ||  {};



// 1. Your Product Database (You can add more items here later)
const products = [
  { 
    id: 1, 
    name: "Premium Watch", 
    price: 199.00, 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" 
  },
  { 
    id: 2, 
    name: "Leather Bag", 
    price: 85.00, 
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80" 
  },
  { 
    id: 3, 
    name: "Wireless Headphones", 
    price: 150.00, 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" 
  },
  { 
    id: 4, 
    name: "Smart Speaker", 
    price: 120.00, 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" 
  }
];

// 2. The Render Function
function renderProducts(productsToDisplay) {
  // Grab the empty grid container from shop.html
  const grid = document.querySelector('.products-grid');
  
  // Create an empty text variable to hold our HTML
  let htmlContent = '';

  // Loop through whatever array is passed into the function
  productsToDisplay.forEach(product => {
    // Build the HTML for this specific product and add it to our variable
    // Notice how we use ${product.name} to insert the data dynamically!
    htmlContent += `
      <div class="product-card" id="qty-container-${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart-btn" onclick="initQuantity(${product.id}, this)">Add to Cart</button>
          <div class="qty-selector" style="display: none;">
            <button class="qty-btn" onclick="changeQty(${product.id}, -1)">-</button>
            <span class="qty-number">1</span>
            <button class="qty-btn" onclick="changeQty(${product.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });

  // Inject all the generated HTML into the grid at once
  grid.innerHTML = htmlContent;
}

// 3. Call the function when the page loads so the products appear
renderProducts(products);
/**
 * SEARCH FUNCTION:
 * Filters products based on the text typed in the search bar.
 */
function filterProducts() {
  const input = document.getElementById('product-search').value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(input)
  );

  renderProducts(filtered);

  const message = document.getElementById('no-results');

  if (filtered.length === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

/**
 * CART LOGIC:
 * Initializes the quantity selector when "Add to Cart" is first clicked.
 */
function initQuantity(productId, btn) {
    // The "container" is the parent div of the button
    let container = btn.parentElement;
    
    // Hide the main "Add to Cart" button
    btn.style.display = 'none';
    
    // Find the +/- selector div and show it
    let selector = container.querySelector('.qty-selector');
    if (selector) {
        selector.style.display = 'flex';
    }
    
    // Set starting quantity to 1 in our data
    cartData[productId] = 1;
    localStorage.setItem("cart", JSON.stringify(cartData));
    
    // Update the numbers on the screen
    updateGlobalUI(productId);
}

/**
 * Changes product quantity (Add or Subtract)
 */
function changeQty(productId, delta) {
    // If product isn't in cart, stop
    if (!cartData[productId]) {
        return;
    }

    // Add delta (1 or -1) to the current quantity
    cartData[productId] = cartData[productId] + delta;
    localStorage.setItem("cart", JSON.stringify(cartData));

    // If quantity hits 0, remove it and go back to "Add to Cart" button
    if (cartData[productId] < 1) {
        delete cartData[productId];
        resetToDefaultButton(productId);
        localStorage.setItem("cart", JSON.stringify(cartData));
    } else {
        updateGlobalUI(productId);
    }
    
    updateCartBadge();
}

/**
 * Updates the quantity number shown on the card
 */
function updateGlobalUI(productId) {
    let container = document.getElementById('qty-container-' + productId);
    if (container) {
        let qtyDisplay = container.querySelector('.qty-number');
        if (qtyDisplay) {
            qtyDisplay.textContent = cartData[productId];
        }
    }
    updateCartBadge();
}

/**
 * Updates the red cart badge in the header
 */
function updateCartBadge() {
    let totalItems = 0;
    
    // Use a loop to sum up all quantities in cartData
    for (let key in cartData) {
        totalItems = totalItems + cartData[key];
    }
    
    let badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalItems;
        
        // Show badge if items > 0, otherwise hide it
        if (totalItems > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

/**
 * Resets the UI back to the "Add to Cart" button
 */
function resetToDefaultButton(productId) {
    let container = document.getElementById('qty-container-' + productId);
    if (container) {
        // Show "Add to Cart" and hide the +/- buttons
        container.querySelector('.add-to-cart-btn').style.display = 'block';
        container.querySelector('.qty-selector').style.display = 'none';
    }
}
  
  function loadTab(tabName) {
    const contentArea = document.getElementById('admin-panel-content');
    
    // Update Active Button State
    document.querySelectorAll('.admin-link').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Content Templates
    const adminViews = {
        dashboard: `
            <h1>📊 Dashboard</h1>
            <div class="products-grid" style="margin-top:20px">
                <div class="card" style="padding:20px; border:1px solid #eee"><h3>Sales</h3><p>$12,450</p></div>
                <div class="card" style="padding:20px; border:1px solid #eee"><h3>Orders</h3><p>156</p></div>
                <div class="card" style="padding:20px; border:1px solid #eee"><h3>Customers</h3><p>1,024</p></div>
            </div>`,
        
        products: `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <h1>📦 Product Management</h1>
        <button class="search-button">+ Add New Product</button>
    </div>
    <table class="admin-table">
                <tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Action</th></tr>
                <tr><td>#1</td><td>Premium Watch</td><td>$199</td><td>12</td><td><button>Edit</button></td></tr>
                <tr><td>#2</td><td>Leather Bag</td><td>$85</td><td>5</td><td><button>Edit</button></td></tr>
            </table>`,

        categories: `
            <h1>📁 Category Management</h1>
            <table class="admin-table">
                <tr><th>Category Name</th><th>Products Count</th><th>Action</th></tr>
                <tr><td>Accessories</td><td>45</td><td><button>Manage</button></td></tr>
                <tr><td>Electronics</td><td>12</td><td><button>Manage</button></td></tr>
            </table>`,

        orders: `
            <h1>🛒 Order Management</h1>
            <table class="admin-table">
                <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr>
                <tr><td>#1001</td><td>Ziad Ahmed</td><td>$284.00</td><td><span class="status-badge status-shipped">Shipped</span></td></tr>
                <tr><td>#1002</td><td>John Doe</td><td>$120.00</td><td><span class="status-badge status-pending">Pending</span></td></tr>
            </table>`,

        users: `
            <h1>👥 User Management</h1>
            <table class="admin-table">
                <tr><th>User</th><th>Email</th><th>Role</th><th>Action</th></tr>
                <tr><td>Ziad</td><td>ziad@cartello.com</td><td>Admin</td><td><button>Edit</button></td></tr>
            </table>`,

        reports: `
            <h1>📈 Sales Reports</h1>
            <p>Select Month: <input type="month"></p>
            <div style="height:200px; background:#f9f9f9; display:flex; align-items:center; justify-content:center; border:2px dashed #ccc; margin-top:20px">
                [ Chart.js Visualization Placeholder ]
            </div>`,

        shipping: `
            <h1>🚚 Shipping Settings</h1>
            <div style="max-width:400px; margin-top:20px">
                <label>Default Shipping Fee ($):</label><br>
                <input type="number" class="search-input" value="10.00" style="width:100%; margin:10px 0;">
                <button class="search-button">Save Configuration</button>
            </div>`,

        policy: `
            <h1>📜 Policy Pages</h1>
            <label>Return Policy</label>
            <textarea class="search-input" style="width:100%; height:150px; margin:10px 0;">We accept returns within 30 days...</textarea>
            <button class="search-button">Update Policy</button>`
    };

    contentArea.innerHTML = adminViews[tabName] || `<h1>Module Coming Soon</h1>`;

} function goToShop() {
  window.location.href = "shop.html";
}

window.onload = function () {
    updateCartBadge();

   
    let cartContainer = document.getElementById("cart-items");
    if (cartContainer) {
        renderCart();
    }

    // Youssef Ahmed's Shop Logic
    let gridContainer = document.querySelector('.products-grid');
    if (gridContainer) {
        renderProducts(products); // Loads the products on shop.html
    }
};
function renderCart() {
    let cartContainer = document.getElementById("cart-items");

    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    // لو الكارت فاضي
    if (Object.keys(cart).length === 0) {
    cartContainer.innerHTML = `
        <div class="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add items to get started</p>
            <button id="go-shopping" onclick="goToShop()">
                Go Shopping
            </button>
            <img class="empcart" 
            src="https://thumbs.dreamstime.com/b/realistic-empty-supermarket-shopping-cart-vector-illustration-isolated-white-background-realistic-empty-supermarket-shopping-118192710.jpg" 
            alt="empty cart">
        </div>
    `;
    return;
}

    // امسح رسالة "empty cart"
    cartContainer.innerHTML = "";

    // المنتجات (مؤقتًا)
    let products = {
    1: { 
        name: "Premium Watch", 
        price: 199,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    2: { 
        name: "Leather Bag", 
        price: 85,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa"
    },
    3: { 
        name: "Wireless Headphones", 
        price: 150,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    4: { 
        name: "Smart Speaker", 
        price: 120,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    }
};
    let total = 0;

    for (let id in cart) {
        let item = products[id];
        let qty = cart[id];

        let itemTotal = item.price * qty;
        total += itemTotal;

     cartContainer.innerHTML += `
    <div class="cart-card">
        <img src="${item.image}" class="cart-img">

        <div class="cart-info">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>

            <div class="cart-controls">
                <button onclick="changeCartQty(${id}, -1)">-</button>
                <span>${qty}</span>
                <button onclick="changeCartQty(${id}, 1)">+</button>
            </div>

            <p>Total: $${itemTotal}</p>

            <button class="remove-btn" onclick="removeItem(${id})">
                Remove
            </button>
        </div>
    </div>
    `;
    }

    // عرض الإجمالي
    cartContainer.innerHTML += `
        <h2>Total: $${total}</h2>
    `;
}
function changeCartQty(id, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (!cart[id]) return;

    cart[id] += delta;

    if (cart[id] < 1) {
        delete cart[id];
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    updateCartBadge();
}
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    delete cart[id];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    updateCartBadge();
}


const showForm = id => {
    document.querySelectorAll('.auth-box').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
};

const switchTab = id => {
    document.querySelectorAll('.nav-btn, .tab-pane').forEach(el => el.classList.remove('active'));
    if (event) event.target.classList.add('active');
    document.getElementById(id).classList.add('active');
};


const mockLogin = () => {
    document.getElementById('auth-area').style.display = 'none';
    document.getElementById('dashboard-area').style.display = 'block';
};

function updateProfile() {
    const nameInput = document.getElementById('edit-full-name');
    const emailInput = document.getElementById('edit-email'); 
    
    const newName = nameInput.value.trim();
    const newEmail = emailInput.value.trim();

    if (newName !== "" && newEmail !== "") {
        document.getElementById('sidebar-name').textContent = newName;
        document.getElementById('sidebar-email').textContent = newEmail;
        document.getElementById('sidebar-avatar').textContent = newName.substring(0, 2).toUpperCase();

        alert("Profile updated successfully!");
    } else {
        alert("Please fill in both Name and Email.");
    }
}
function joinNow() {
    console.log("Join Now button clicked!"); 
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-confirm').value;
    if (!name || !email || !pass || !confirm) {
        alert("Please fill in all fields.");
        return;
    }
    if (pass !== confirm) {
        alert("Passwords do not match.");
        return;
    }
    if(document.getElementById('sidebar-name')) document.getElementById('sidebar-name').textContent = name;
    if(document.getElementById('sidebar-email')) document.getElementById('sidebar-email').textContent = email;
    if(document.getElementById('sidebar-avatar')) document.getElementById('sidebar-avatar').textContent = name.substring(0, 2).toUpperCase();

    document.getElementById('auth-area').style.display = 'none';
    document.getElementById('dashboard-area').style.display = 'block';
    
    window.scrollTo(0, 0);
    alert("Welcome " + name + "!");
}


function addNewAddressPrompt() {
    const title = prompt("Title:"), detail = prompt("Details:");
    if (title && detail) {
        if (document.getElementById('empty-addr-msg')) document.getElementById('empty-addr-msg').style.display = 'none';
        const item = document.createElement('div');
        item.className = 'address-item active';
        item.innerHTML = `<strong>${title}</strong><p>${detail}</p><a href="#" onclick="this.parentElement.remove()">Remove</a>`;
        document.getElementById('address-list').appendChild(item);
    }
}

function changePasswordAction() {
    const inputs = document.querySelectorAll('#tab-security input');
    if (inputs[1].value.length < 6) return alert("Min 6 characters.");
    alert("Updated!");
    inputs.forEach(i => i.value = "");
}

function cancelUI(btn) {
    if (confirm("Cancel this order?")) {
        const card = btn.closest('.order-card');
        const status = card.querySelector('.status-chip');
        card.style.opacity = '0.5';
        status.textContent = 'Cancelled';
        status.style = 'background:#ffebee; color:#c62828;';
        btn.remove();
    }
}
