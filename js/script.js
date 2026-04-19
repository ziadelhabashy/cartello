// ==========================================================================
// 1. GLOBAL VARIABLES & MOCK DATABASE
// ==========================================================================

let cartData = JSON.parse(localStorage.getItem("cart")) || {};
let currentCategory = "All";

const products = [
  {
    id: 1,
    name: "Premium Watch",
    price: 199.0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    category: "Accessories"
  },
  {
    id: 2,
    name: "Leather Bag",
    price: 85.0,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 150.0,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Smart Speaker",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1586078875290-c22eb791ad5d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
    category: "Electronics"
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 110.0,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", 
    category: "Accessories"
  },
 {
    id: 6,
    name: "Wireless Mouse",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80",
    category: "Electronics"
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    price: 135.0,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80",
    category: "Electronics"
  },
  {
    id: 8,
    name: "Polarized Sunglasses",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
    category: "Accessories"
  },
  {
    id: 9,
    name: "Classic Canvas Backpack",
    price: 55.0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    category: "Accessories"
  },
  {
    id: 10,
    name: "Fitness Tracker Band",
    price: 90.0,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=400&q=80",
    category: "Electronics"
  },
  {
    id: 11,
    name: "Minimalist Wallet",
    price: 35.0,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80",
    category: "Accessories"
  },
  {
    id: 12,
    name: "Noise-Canceling Earbuds",
    price: 180.0,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
    category: "Electronics"
  },
  {
    id: 13,
    name: "Modern Desk Lamp",
    price: 40.0,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
    category: "Electronics"
  },
  {
    id: 14,
    name: "Insulated Coffee Thermos",
    price: 28.0,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80",
    category: "Accessories"
  },
  {
    id: 15,
    name: "Portable Power Bank",
    price: 50.0,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80",
    category: "Electronics"
  },

  {
    id: 16,
    name: "Hydrating Face Cleanser",
    price: 24.0,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80",
    category: "Skin Care"
  },
  {
    id: 17,
    name: "Vitamin C Serum",
    price: 35.0,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    category: "Skin Care"
  },
  {
    id: 18,
    name: "Daily SPF 50 Sunscreen",
    price: 28.0,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80",
    category: "Skin Care"
  },
  {
    id: 19,
    name: "Purifying Clay Mask",
    price: 22.0,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80",
    category: "Skin Care"
  },
  {
    id: 20,
    name: "Night Repair Cream",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
    category: "Skin Care"
  },

 
  {
    id: 21,
    name: "Extra Virgin Olive Oil",
    price: 18.0,
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=400&q=80",
    category: "Grocery"
  },
  {
    id: 22,
    name: "Artisan Coffee Beans",
    price: 20.0,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=400&q=80",
    category: "Grocery"
  },
  {
    id: 23,
    name: "Whole Wheat Pasta",
    price: 5.0,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80",
    category: "Grocery"
  },
  {
    id: 24,
    name: "Fresh Green Apples",
    price: 8.0,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
    category: "Grocery"
  }
];


// ==========================================================================
// 2. INITIALIZATION & GLOBAL UTILITIES
// ==========================================================================

window.onload = function () {
  updateCartBadge();
  initMobileMenu();

  // ---> NEW: Render featured products on the Homepage
  if (document.getElementById("featured-products-grid")) {
    renderFeaturedProducts();
  }

  if (document.getElementById("cart-items")) {
    renderCart();
  }

  if (document.querySelector(".products-grid") && document.getElementById("product-search")) {
    renderProducts(products);
  }

  if (document.getElementById("checkout-items")) {
    renderCheckout();
  }
};

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  if (!menuToggle || !navbar) return;

  menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("show");
  });

  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      navbar.classList.remove("show");
    });
  });
}

// ==========================================================================
// 3. CORE RENDERING FUNCTIONS (Building HTML)
// ==========================================================================

function renderProducts(productsToDisplay) {
  const grid = document.querySelector(".products-grid");
  if (!grid) return;

  let htmlContent = "";
  productsToDisplay.forEach(product => {
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
  grid.innerHTML = htmlContent;
}

function renderFeaturedProducts() {
  const grid = document.getElementById("featured-products-grid");
  if (!grid) return;

  let htmlContent = "";
  // Grab only the first 4 products from the array
  const featured = products.slice(0, 4);

  featured.forEach(product => {
    // This HTML matches Wael's cart setup perfectly
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
  
  grid.innerHTML = htmlContent;
}


function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const cart = getCart();
  if (!cartContainer) return;

  if (Object.keys(cart).length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add items to get started</p>
        <button id="go-shopping" onclick="goToShop()">Go Shopping</button>
        <img class="empcart" src="https://thumbs.dreamstime.com/b/realistic-empty-supermarket-shopping-cart-vector-illustration-isolated-white-background-realistic-empty-supermarket-shopping-118192710.jpg" alt="empty cart">
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  for (let id in cart) {
    const item = products.find(p => p.id == id);
    const qty = cart[id];
    if (!item) continue;

    const itemTotal = item.price * qty;
    total += itemTotal;
    cartContainer.innerHTML += `
      <div class="cart-card">
        <img src="${item.image}" class="cart-img" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <div class="cart-controls">
            <button onclick="changeCartQty(${id}, -1)">-</button>
            <span>${qty}</span>
            <button onclick="changeCartQty(${id}, 1)">+</button>
          </div>
          <p>Total: $${itemTotal.toFixed(2)}</p>
          <button class="remove-btn" onclick="removeItem(${id})">Remove</button>
        </div>
      </div>
    `;
  }

  cartContainer.innerHTML += `
    <div class="cart-summary">
      <h2>Total: $${total.toFixed(2)}</h2>
      <button class="checkout-btn" onclick="goToCheckout()">
        Continue to Checkout →
      </button>
    </div>
  `;
}

function renderCheckout() {
  const itemsContainer = document.getElementById("checkout-items");
  const totalContainer = document.getElementById("checkout-total");
  const shippingContainer = document.getElementById("checkout-shipping");

  if (!itemsContainer || !totalContainer) return;

  const cart = getCart();

  if (Object.keys(cart).length === 0) {
    itemsContainer.innerHTML = "<p>Your cart is empty</p>";
    if (shippingContainer) shippingContainer.innerHTML = "";
    totalContainer.innerHTML = "";
    return;
  }

  let subtotal = 0;
  let html = "";

  for (let id in cart) {
    const item = products.find(p => p.id == id);
    if (!item) continue;

    const qty = cart[id];
    const itemTotal = item.price * qty;
    subtotal += itemTotal;

    html += `
      <div class="checkout-item">
        <span>${item.name} (x${qty})</span>
        <span>$${itemTotal.toFixed(2)}</span>
      </div>
    `;
  }

  itemsContainer.innerHTML = html;

  const shipping = getShippingPrice();
  const finalTotal = subtotal + shipping;

  if (shippingContainer) {
    shippingContainer.innerHTML = `<h3>Shipping: $${shipping.toFixed(2)}</h3>`;
  }

  totalContainer.innerHTML = `<h3>Total: $${finalTotal.toFixed(2)}</h3>`;
}

// ==========================================================================
// 4. PRODUCT FILTERING & SEARCH
// ==========================================================================

function setCategory(categoryName) {
  currentCategory = categoryName;
  filterProducts();
}

function filterProducts() {
  const searchInput = document.getElementById("product-search");
  const input = searchInput ? searchInput.value.toLowerCase() : "";

  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(input);
    const matchesCategory = currentCategory === "All" || product.category === currentCategory;
    return matchesSearch && matchesCategory;
  });
  renderProducts(filtered);

  const message = document.getElementById("no-results");
  if (message) {
    message.style.display = filtered.length === 0 ? "block" : "none";
  }
}

// ==========================================================================
// 5. CART LOGIC & OPERATIONS
// ==========================================================================

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartData));
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || {};
}

function initQuantity(productId, btn) {
  const container = btn.parentElement;
  btn.style.display = "none";

  const selector = container.querySelector(".qty-selector");
  if (selector) {
    selector.style.display = "flex";
  }

  cartData[productId] = 1;
  saveCart();
  updateGlobalUI(productId);
}

function changeQty(productId, delta) {
  if (!cartData[productId]) return;

  cartData[productId] += delta;
  if (cartData[productId] < 1) {
    delete cartData[productId];
    resetToDefaultButton(productId);
  }

  saveCart();
  updateGlobalUI(productId);
  updateCartBadge();
}

function changeCartQty(id, delta) {
  const cart = getCart();
  if (!cart[id]) return;

  cart[id] += delta;
  if (cart[id] < 1) {
    delete cart[id];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  cartData = cart;

  renderCart();
  updateCartBadge();
}

function removeItem(id) {
  const cart = getCart();
  delete cart[id];

  localStorage.setItem("cart", JSON.stringify(cart));
  cartData = cart;

  renderCart();
  updateCartBadge();
}

function updateGlobalUI(productId) {
  const container = document.getElementById("qty-container-" + productId);
  if (!container) return;

  const qtyDisplay = container.querySelector(".qty-number");
  if (qtyDisplay && cartData[productId]) {
    qtyDisplay.textContent = cartData[productId];
  }

  updateCartBadge();
}

function updateCartBadge() {
  let totalItems = 0;
  for (let key in cartData) {
    totalItems += cartData[key];
  }

  const badge = document.getElementById("cart-badge");
  if (!badge) return;

  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "flex" : "none";
}

function resetToDefaultButton(productId) {
  const container = document.getElementById("qty-container-" + productId);
  if (!container) return;

  const addButton = container.querySelector(".add-to-cart-btn");
  const selector = container.querySelector(".qty-selector");

  if (addButton) addButton.style.display = "block";
  if (selector) selector.style.display = "none";
}

// ==========================================================================
// 6. CHECKOUT & ORDERS
// ==========================================================================

function goToShop() {
  window.location.href = "shop.html";
}

function goToCheckout() {
  const cart = getCart();
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

function placeOrder(event) {
  event.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const governorate = document.getElementById("customer-governorate").value;
  const address = document.getElementById("customer-address").value.trim();
  const paymentMethod = document.getElementById("payment-method").value;

  const cart = getCart();

  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }

  if (name.length < 3) {
    alert("Please enter a valid full name.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!isValidPhone(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  if (governorate === "") {
    alert("Please select your governorate.");
    return;
  }

  if (address.length < 8) {
    alert("Please enter a complete address.");
    return;
  }

  if (paymentMethod === "") {
    alert("Please select a payment method.");
    return;
  }

  const shipping = getShippingPrice();

  showOrderModal();
}

 const shippingRates = {
  Cairo: 50,
  Giza: 50,
  Alexandria: 70,
  Dakahlia: 80,
  Sharqia: 80,
  Monufia: 75,
  Qalyubia: 60,
  Beheira: 85,
  "Kafr El Sheikh": 85,
  Gharbia: 80,
  "Port Said": 90,
  Suez: 90,
  Ismailia: 85,
  Damietta: 85,
  Fayoum: 75,
  "Beni Suef": 80,
  Minya: 90,
  Assiut: 100,
  Sohag: 110,
  Qena: 120,
  Luxor: 130,
  Aswan: 140,
  "Red Sea": 120,
  "New Valley": 150,
  Matrouh: 120,
  "North Sinai": 130,
  "South Sinai": 140
};

function getShippingPrice() {
  const govSelect = document.getElementById("customer-governorate");
  if (!govSelect || !govSelect.value) return 0;
  return shippingRates[govSelect.value] || 0;
}

function updateShipping() {
  const shippingContainer = document.getElementById("checkout-shipping");
  const totalContainer = document.getElementById("checkout-total");
  const cart = getCart();

  if (!shippingContainer || !totalContainer) return;

  let subtotal = 0;

  for (let id in cart) {
    const item = products.find(p => p.id == id);
    if (!item) continue;
    subtotal += item.price * cart[id];
  }

  const shipping = getShippingPrice();
  const finalTotal = subtotal + shipping;

  shippingContainer.innerHTML = shipping > 0
    ? `<h3>Shipping: $${shipping.toFixed(2)}</h3>`
    : `<h3>Shipping: $0.00</h3>`;

  totalContainer.innerHTML = `<h3>Total: $${finalTotal.toFixed(2)}</h3>`;
}

function cancelUI(btn) {
  if (confirm("Cancel this order?")) {
    const card = btn.closest(".order-card");
    const status = card.querySelector(".status-chip");
    card.style.opacity = "0.5";
    status.textContent = "Cancelled";
    status.style = "background:#ffebee; color:#c62828;";
    btn.remove();
  }
}
function showOrderModal() {
  const modal = document.getElementById("order-success-modal");
  if (modal) {
    modal.classList.add("show");
  }
}

function closeOrderModal() {
  localStorage.removeItem("cart");
  cartData = {};
  window.location.href = "cart.html";
}

// ==========================================================================
// 7. USER AUTHENTICATION & PROFILE
// ==========================================================================

function showForm(id) {
  document.querySelectorAll(".auth-box").forEach(box => {
    box.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

function mockLogin() {
  const authArea = document.getElementById("auth-area");
  const dashboardArea = document.getElementById("dashboard-area");

  if (authArea) authArea.style.display = "none";
  if (dashboardArea) dashboardArea.style.display = "block";
}

function validateLogin() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-pass").value.trim();
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }
  mockLogin();
}

function validateForgotPassword() {
  const forgotInput = document.querySelector("#forgot-view input[type='email']");
  if (!forgotInput) return;

  const email = forgotInput.value.trim();
  if (!email) {
    alert("Please enter your email address.");
    return;
  }
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Reset link sent successfully!");
  forgotInput.value = "";
  showForm("login-form");
}

function joinNow() {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const pass = document.getElementById("reg-pass").value;
  const confirm = document.getElementById("reg-confirm").value;
  if (!name || !email || !pass || !confirm) {
    alert("Please fill in all fields.");
    return;
  }
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (pass.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }
  if (pass !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  const sidebarName = document.getElementById("sidebar-name");
  const sidebarEmail = document.getElementById("sidebar-email");
  const sidebarAvatar = document.getElementById("sidebar-avatar");

  if (sidebarName) sidebarName.textContent = name;
  if (sidebarEmail) sidebarEmail.textContent = email;
  if (sidebarAvatar) sidebarAvatar.textContent = name.substring(0, 2).toUpperCase();

  const authArea = document.getElementById("auth-area");
  const dashboardArea = document.getElementById("dashboard-area");
  if (authArea) authArea.style.display = "none";
  if (dashboardArea) dashboardArea.style.display = "block";

  window.scrollTo(0, 0);
  alert("Welcome " + name + "!");
}

function updateProfile() {
  const nameInput = document.getElementById("edit-full-name");
  const emailInput = document.getElementById("edit-email");

  const newName = nameInput.value.trim();
  const newEmail = emailInput.value.trim();

  if (newName !== "" && newEmail !== "") {
    document.getElementById("sidebar-name").textContent = newName;
    document.getElementById("sidebar-email").textContent = newEmail;
    document.getElementById("sidebar-avatar").textContent = newName.substring(0, 2).toUpperCase();
    alert("Profile updated successfully!");
  } else {
    alert("Please fill in both Name and Email.");
  }
}

function changePasswordAction() {
  const inputs = document.querySelectorAll("#tab-security input");
  if (inputs[1].value.length < 6) {
    alert("Min 6 characters.");
    return;
  }
  alert("Updated!");
  inputs.forEach(input => (input.value = ""));
}

function addNewAddressPrompt() {
  const title = prompt("Title:");
  const detail = prompt("Details:");
  if (title && detail) {
    const emptyMsg = document.getElementById("empty-addr-msg");
    if (emptyMsg) emptyMsg.style.display = "none";
    const item = document.createElement("div");
    item.className = "address-item active";
    item.innerHTML = `
      <strong>${title}</strong>
      <p>${detail}</p>
      <a href="#" onclick="this.parentElement.remove()">Remove</a>
    `;
    document.getElementById("address-list").appendChild(item);
  }
}

// ==========================================================================
// 8. ADMIN PANEL
// ==========================================================================

function adminLogin() {
  const email = document.getElementById("admin-email").value.trim();
  const pass = document.getElementById("admin-pass").value;

  const ADMIN_EMAIL = "admin@cartello.com";
  const ADMIN_PASS = "admin123";
  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    window.location.href = "admin.html";
  } else {
    alert("Invalid admin credentials. Please try again.");
  }
}

function loadTab(tabName) {
  const contentArea = document.getElementById("admin-panel-content");
  if (!contentArea) return;

  document.querySelectorAll(".admin-link").forEach(btn => {
    btn.classList.remove("active");
  });
  if (typeof event !== "undefined" && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  const adminViews = {
    dashboard: `
      <h1>📊 Dashboard</h1>
      <div class="products-grid" style="margin-top:20px">
        <div class="card" style="padding:20px; border:1px solid #eee"><h3>Sales</h3><p>$12,450</p></div>
        <div class="card" style="padding:20px; border:1px solid #eee"><h3>Orders</h3><p>156</p></div>
        <div class="card" style="padding:20px; border:1px solid #eee"><h3>Customers</h3><p>1,024</p></div>
      </div>
    `,
    products: `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <h1>📦 Product Management</h1>
        <button class="search-button">+ Add New Product</button>
      </div>
      <table class="admin-table">
        <tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Action</th></tr>
        <tr><td>#1</td><td>Premium Watch</td><td>$199</td><td>12</td><td><button>Edit</button></td></tr>
        <tr><td>#2</td><td>Leather Bag</td><td>$85</td><td>5</td><td><button>Edit</button></td></tr>
      </table>
    `,
    categories: `
      <h1>📁 Category Management</h1>
      <table class="admin-table">
        <tr><th>Category Name</th><th>Products Count</th><th>Action</th></tr>
        <tr><td>Accessories</td><td>45</td><td><button>Manage</button></td></tr>
        <tr><td>Electronics</td><td>12</td><td><button>Manage</button></td></tr>
      </table>
    `,
    orders: `
      <h1>🛒 Order Management</h1>
      <table class="admin-table">
        <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr>
        <tr><td>#1001</td><td>Ziad Ahmed</td><td>$284.00</td><td><span class="status-badge status-shipped">Shipped</span></td></tr>
        <tr><td>#1002</td><td>John Doe</td><td>$120.00</td><td><span class="status-badge status-pending">Pending</span></td></tr>
      </table>
    `,
    users: `
      <h1>👥 User Management</h1>
      <table class="admin-table">
        <tr><th>User</th><th>Email</th><th>Role</th><th>Action</th></tr>
        <tr><td>Ziad</td><td>ziad@cartello.com</td><td>Admin</td><td><button>Edit</button></td></tr>
      </table>
    `,
    reports: `
      <h1>📈 Sales Reports</h1>
      <p>Select Month: <input type="month"></p>
      <div style="height:200px; background:#f9f9f9; display:flex; align-items:center; justify-content:center; border:2px dashed #ccc; margin-top:20px">
        [ Chart.js Visualization Placeholder ]
      </div>
    `,
    shipping: `
      <h1>🚚 Shipping Settings</h1>
      <div style="max-width:400px; margin-top:20px">
        <label>Default Shipping Fee ($):</label><br>
        <input type="number" class="search-input" value="10.00" style="width:100%; margin:10px 0;">
        <button class="search-button">Save Configuration</button>
      </div>
    `,
    policy: `
      <h1>📜 Policy Pages</h1>
      <label>Return Policy</label>
      <textarea class="search-input" style="width:100%; height:150px; margin:10px 0;">We accept returns within 30 days...</textarea>
      <button class="search-button">Update Policy</button>
    `
  };

  contentArea.innerHTML = adminViews[tabName] || "<h1>Module Coming Soon</h1>";
}

// ==========================================================================
// 9. NAVIGATION & DATA VALIDATION
// ==========================================================================

function switchTab(id) {
  document.querySelectorAll(".nav-btn, .tab-pane").forEach(el => {
    el.classList.remove("active");
  });
  if (typeof event !== "undefined" && event.target) {
    event.target.classList.add("active");
  }

  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^(\+?\d[\d\s-]{9,})$/.test(phone.trim());
}