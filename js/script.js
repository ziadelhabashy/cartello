// ==========================================================================
// 1. GLOBAL VARIABLES 
// ==========================================================================
const API = 'https://cartello.me';
let cartData = JSON.parse(localStorage.getItem("cart")) || {};

function adminHeaders() {
  const token = localStorage.getItem('adminToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

let currentCategory = "All";
let currentPage = 1;
const itemsPerPage = 8;
let currentList = [];
let products = []; 

const translations = {
  en: {
    // Nav
    home: "Home",
    shop: "Shop",
    cart: "Cart",
    login: "Login",
    logout: "Logout",
    profile: "Profile",
    // Search
    search: "Search",
    searchProducts: "Search products",
    // Hero (index)
    heroLabel: "New Arrivals 2026",
    heroTitle: "SAVE MORE WITH CARTELLO",
    heroText: "Browse our collection and discover products that match your style",
    shopNow: "Shop Now",
    // Features (index)
    featuredProducts: "Featured Products",
    freeShipping: "Free Shipping",
    freeShippingText: "On all orders over 3000 EGP",
    easyReturns: "Easy Returns",
    easyReturnsText: "15-day return policy",
    securePayment: "Secure Payment",
    securePaymentText: "100% safe",
    support: "24/7 Support",
    supportText: "Always here to help",
    // Shop page
    shopLabel: "Shop",
    browseProducts: "Browse Products",
    filterAll: "All",
    filterElectronics: "Electronics",
    filterAccessories: "Accessories",
    filterGrocery: "Grocery",
    filterSkinCare: "Skin Care",
    filterClothing: "Clothing",
    filterShoes: "Shoes",
    filterMakeup: "Makeup",
    filterBabyCare: "Baby Care",
    // Product cards (JS-rendered)
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
    // Checkout page
    checkoutTitle: "Checkout",
    checkoutSubtitle: "Enter your details to place your order.",
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    email: "Email",
    emailPlaceholder: "Email Address",
    phone: "Phone",
    password: "Password",
    address: "Address",
    governorate: "Governorate",
    paymentMethod: "Payment Method",
    selectPayment: "Select payment method",
    cod: "Cash on Delivery",
    placeOrder: "Place Order",
    orderSummary: "Order Summary",
    orderSuccess: "Order Placed Successfully",
    orderSuccessText: "Your order has been confirmed and will be processed soon.",
    
     emptyCart: "Your cart is empty",
    emptyCartText: "Add items to get started",
    goShopping: "Go Shopping",
    // Login page
    welcomeTitle: "Welcome to Cartello",
    loginSubtitle: "Log in to your account",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    newUser: "New?",
    createAccount: "Create account",
    adminLogin: "Admin login",
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    phonePlaceholder: "+20 1xx xxx xxxx",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Confirm your password",
    alreadyHaveAccount: "Already have an account?",
    //admin
    
    adminLoginTitle: "Admin Login",
    adminLoginSubtitle: "Restricted access — staff only",
    accessDashboard: "Access Dashboard",
    backToLogin: "← Back to Login",
    passwordPlaceholder: "••••••••",
    langButton: "عربي"
  },
  ar: {
    // Nav
    home: "الرئيسية",
    shop: "المتجر",
    cart: "السلة",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    profile: "الحساب",
    // Search
    search: "بحث",
    searchProducts: "ابحث عن المنتجات",
    // Hero (index)
    heroLabel: "وصل حديثا 2026",
    heroTitle: "وفر أكثر مع كارتيلو",
    heroText: "تصفح مجموعتنا واكتشف منتجات تناسب أسلوبك",
    shopNow: "تسوق الآن",
    // Features (index)
    featuredProducts: "منتجات مميزة",
    freeShipping: "شحن مجاني",
    freeShippingText: "على كل الطلبات فوق 3000 جنيه",
    easyReturns: "إرجاع سهل",
    easyReturnsText: "سياسة إرجاع خلال 15 يوم",
    securePayment: "دفع آمن",
    securePaymentText: "آمن 100%",
    support: "دعم 24/7",
    supportText: "دائما هنا للمساعدة",
    // Shop page
    shopLabel: "المتجر",
    browseProducts: "تصفح المنتجات",
    filterAll: "الكل",
    filterElectronics: "إلكترونيات",
    filterAccessories: "إكسسوارات",
    filterGrocery: "بقالة",
    filterSkinCare: "العناية بالبشرة",
    filterClothing: "ملابس",
    filterShoes: "أحذية",
    filterMakeup: "مكياج",
    filterBabyCare: "عناية بالأطفال",
    // Product cards (JS-rendered)
    
    addToCart: "أضف للسلة",
    outOfStock: "نفد المخزون",
    // Checkout page
    checkoutTitle: "الدفع",
    checkoutSubtitle: "أدخل بياناتك لإتمام الطلب.",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "اسمك الكامل",
    email: "البريد الإلكتروني",
    emailPlaceholder: "بريدك الإلكتروني",
    phone: "الهاتف",
    password: "كلمة المرور",
    address: "العنوان",
    governorate: "المحافظة",
    paymentMethod: "طريقة الدفع",
    selectPayment: "اختر طريقة الدفع",
    cod: "الدفع عند الاستلام",
    placeOrder: "إتمام الطلب",
    orderSummary: "ملخص الطلب",
    orderSuccess: "تم تقديم الطلب بنجاح",
    orderSuccessText: "تم تأكيد طلبك وسيتم معالجته قريباً.",
    // Login page
    welcomeTitle: "مرحباً بك في كارتيلو",
    loginSubtitle: "سجّل الدخول لحسابك",
    forgotPassword: "نسيت كلمة المرور؟",
    signIn: "تسجيل الدخول",
    newUser: "جديد؟",
    createAccount: "إنشاء حساب",
    adminLogin: "دخول المسؤول",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "اسمك الكامل",
    phone: "رقم الهاتف",
    phonePlaceholder: "+20 1xx xxx xxxx",
    confirmPassword: "تأكيد كلمة المرور",
    confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    emptyCart: "سلتك فارغة",
    emptyCartText: "أضف منتجات للبدء",
    goShopping: "تسوق الآن",
    //admin 
    adminLoginTitle: "دخول المسؤول",
    adminLoginSubtitle: "وصول مقيد — للموظفين فقط",
    accessDashboard: "دخول لوحة التحكم",
    backToLogin: "→ العودة لتسجيل الدخول",
    passwordPlaceholder: "••••••••",
    langButton: "English"
  }
};

function getLanguage() {
  return localStorage.getItem("language") || "en";
}

function applyLanguage() {
  const lang = getLanguage();
  const dict = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) el.placeholder = dict[key];
  });

  document.querySelectorAll(".lang-toggle").forEach(btn => {
    btn.textContent = dict.langButton;
  });

  updateNavForUser(); // ← ADD THIS LINE
}

function toggleLanguage() {
  const nextLang = getLanguage() === "ar" ? "en" : "ar";
  localStorage.setItem("language", nextLang);
  applyLanguage();
}

// Helper: get translated string for use inside JS-rendered HTML
function t(key) {
  const dict = translations[getLanguage()];
  return (dict && dict[key]) ? dict[key] : key;
}
// ==========================================================================
// 2. INITIALIZATION & GLOBAL UTILITIES
// ==========================================================================

window.onload = async function () {
  applyLanguage();
  updateCartBadge();
  initMobileMenu();
  updateNavForUser();
  
  if (document.getElementById("admin-panel-content")) {
  const adminSession = localStorage.getItem("adminSession");
  if (!adminSession) {
    window.location.href = "login.html";
  } else {
    loadTab("dashboard", document.querySelector(".admin-link"));
  }
}

  // Auto-login if user session exists
  if (document.getElementById("auth-area")) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      mockLogin();
    }
  }

  try {
    const response = await fetch(`${API}/api/products`);
    const data = await response.json();
    products = data;

    if (document.getElementById("featured-products-grid")) {
      renderFeaturedProducts();
    }
    if (document.getElementById("product-container")) {
      currentList = products;
      updatePage();
    }
    if (document.getElementById("cart-items")) {
      renderCart();
    }
    if (document.getElementById("checkout-items")) {
      renderCheckout();
    }

  } catch (error) {
    console.error("Could not load products from server:", error);
    const container = document.getElementById("product-container") || document.getElementById("featured-products-grid");
    if (container) container.innerHTML = "<p>Error connecting to database.</p>";
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
function updateNavForUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'login.html') {
      link.style.visibility = "visible";
      link.textContent = currentUser ? t('profile') : t('login');
    }
  });
}
// ==========================================================================
// 3. PAGINATION & CORE RENDERING 
// ==========================================================================

function renderProducts(productsToDisplay) {
  const grid = document.getElementById("product-container");
  if (!grid) return;

  let htmlContent = "";
  productsToDisplay.forEach(product => {
    
    let buttonHtml = "";
    if (product.stock > 0) {
        buttonHtml = `<button class="add-to-cart-btn" onclick="initQuantity('${product._id}', this)">${t('addToCart')}</button>`;
    } else {
        buttonHtml = `<button class="add-to-cart-btn out-of-stock-btn" disabled>${t('outOfStock')}</button>`;
    }

    htmlContent += `
      <div class="product-card" id="qty-container-${product._id}">
      
        <a href="javascript:void(0);"onclick="openModal('${product._id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        </a>
        
        <div class="product-info">
        
          <a href="javascript:void(0);" onclick="openModal('${product._id}')" style="text-decoration: none; color: inherit;">
            <h3 class="product-title">${product.name}</h3>
          </a>
          
          <p class="product-price">EGP ${product.price.toFixed(2)}</p>
          
          ${buttonHtml}

          <div class="qty-selector" style="display: none;">
            <button class="qty-btn"onclick="changeQty('${product._id}', -1)">-</button>
            <span class="qty-number">1</span>
            <button class="qty-btn"onclick="changeQty('${product._id}', 1)">+</button>
          </div>
        </div>
      </div>
    `;
});
  grid.innerHTML = htmlContent;
  applyLanguage();
  
  if (typeof getCart === 'function' && typeof syncProductCardState === 'function') {
      Object.keys(getCart()).forEach(id => syncProductCardState(id));
  }
}

function updatePage() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToShow = currentList.slice(startIndex, endIndex);

  renderProducts(itemsToShow);

  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const pageInfo = document.getElementById("page-info");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const noResults = document.getElementById("no-results");

  if (currentList.length === 0) {
      if (noResults) noResults.style.display = "block";
      if (pageInfo) pageInfo.textContent = "Page 0 of 0";
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
  } else {
      if (noResults) noResults.style.display = "none";
      if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      
      if (prevBtn) {
          prevBtn.style.display = (currentPage === 1) ? "none" : "block";
      }
      
      if (nextBtn) {
          nextBtn.style.display = (currentPage === totalPages) ? "none" : "block";
      }
  }
}

// ==========================================
// MODAL POP-UP LOGIC
// ==========================================

function openModal(productId) {
    const modal = document.getElementById("product-modal");
    const container = document.getElementById("modal-details-container");
    if (!modal || !container) return;

const product = products.find(p => p._id.toString() === productId.toString());
  if (!product) return;

    const starCount = Math.round(product.rating);
    const stars = "★".repeat(starCount) + "☆".repeat(5 - starCount);

    container.innerHTML = `
        <div class="pdp-container" id="qty-container-${product.id}" style="box-shadow: none; margin: 0; padding: 0;">
            <div class="pdp-image-col">
                <img src="${product.image}" alt="${product.name}">
            </div>
            
            <div class="pdp-info-col">
                <span class="pdp-category">${product.category}</span>
                <h2 class="pdp-title">${product.name}</h2>
                <div class="pdp-rating">${stars} ${product.rating} <span style="color:#888; font-weight:normal;">(${product.reviews} reviews)</span></div>
                <div class="pdp-price">EGP ${product.price.toFixed(2)}</div>
                
                <p class="pdp-desc">${product.description}</p>
                
                <div class="pdp-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock > 0 ? `In Stock (${product.stock} available)` : `Currently Out of Stock`}
                </div>

                <div class="pdp-action-area">
                    ${product.stock > 0 
                        ? `<button class="search-button pdp-add-btn add-to-cart-btn" onclick="initQuantity(${product.id}, this)">Add to Cart</button>`
                        : `<button class="pdp-out-of-stock-btn add-to-cart-btn" disabled>Out of Stock</button>`
                    }

                    <div class="qty-selector pdp-qty-wrapper" style="display: none;">
                        <button class="pdp-qty-btn qty-btn" onclick="changeQty(${product.id}, -1)">-</button>
                        <span class="pdp-qty-number qty-number">1</span>
                        <button class="pdp-qty-btn qty-btn" onclick="changeQty(${product.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add("active");

    if (typeof syncProductCardState === 'function') {
        syncProductCardState(product.id);
    }
}

function closeModal() {
    const modal = document.getElementById("product-modal");
    if (modal) {
        modal.classList.remove("active");
        document.getElementById("modal-details-container").innerHTML = ""; 
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("product-modal");
    if (event.target === modal) {
        closeModal();
    }
}

function prevPage() {
  if (currentPage > 1) {
      currentPage--;
      updatePage(); 
  }
}

function nextPage() {
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  if (currentPage < totalPages) {
      currentPage++;
      updatePage(); 
  }
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

  currentList = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(input);
    const matchesCategory = currentCategory === "All" || product.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  currentPage = 1;
  updatePage();
}

// ==========================================================================
// 5. FEATURED, CART LOGIC & OPERATIONS
// ==========================================================================

function renderFeaturedProducts() {
  const grid = document.getElementById("featured-products-grid");
  if (!grid) return;

  let htmlContent = "";
  const featured = products.slice(0, 4);

  featured.forEach(product => {
    
    let buttonHtml = `<button class="add-to-cart-btn search-button" onclick="initQuantity('${product._id}', this)">Add to Cart</button>`;
    if (product.stock > 0) {
  buttonHtml = `<button class="add-to-cart-btn search-button" onclick="initQuantity('${product._id}', this)">${t('addToCart')}</button>`;
} else {
  buttonHtml = `<button class="add-to-cart-btn" style="background-color: #e0e0e0; color: #888; cursor: not-allowed; border: none;" disabled>${t('outOfStock')}</button>`;
}

    htmlContent += `
  <div class="product-card" id="qty-container-${product._id}">
    <a href="javascript:void(0);" onclick="openModal('${product._id}')">
      <img src="${product.image}" alt="${product.name}" class="product-image">
    </a>
    <div class="product-info">
      <a href="javascript:void(0);" onclick="openModal('${product._id}')" style="text-decoration: none; color: inherit;">
        <h3 class="product-title">${product.name}</h3>
      </a>
      <p class="product-price">EGP ${product.price.toFixed(2)}</p>
      ${buttonHtml}
      <div class="qty-selector" style="display: none;">
        <button class="qty-btn" onclick="changeQty('${product._id}', -1)">-</button>
        <span class="qty-number">1</span>
        <button class="qty-btn" onclick="changeQty('${product._id}', 1)">+</button>
      </div>
    </div>
  </div>
`;
  });
  
  grid.innerHTML = htmlContent;

  if (typeof getCart === 'function' && typeof syncProductCardState === 'function') {
      Object.keys(getCart()).forEach(id => syncProductCardState(id));
  }
}

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const cart = getCart();
  if (!cartContainer) return;

  if (Object.keys(cart).length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h2>${t('emptyCart')}</h2>
        <p>${t('emptyCartText')}</p>
        <button id="go-shopping" onclick="goToShop()">${t('goShopping')}</button>
        <img class="empcart" src="https://thumbs.dreamstime.com/b/realistic-empty-supermarket-shopping-cart-vector-illustration-isolated-white-background-realistic-empty-supermarket-shopping-118192710.jpg" alt="empty cart">
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  for (let id in cart) {
    const item = products.find(p => p._id.toString() === id);
    const qty = cart[id];
    if (!item) continue;

    const itemTotal = item.price * qty;
    total += itemTotal;
    cartContainer.innerHTML += `
      <div class="cart-card">
        <img src="${item.image}" class="cart-img" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>${t('price')}: EGP ${item.price.toFixed(2)}</p>
          <div class="cart-controls">
            <button onclick="changeCartQty('${id}', -1)">-</button>
            <span>${qty}</span>
            <button onclick="changeCartQty('${id}', 1)">+</button>
          </div>
          <p>${t('total')}: EGP ${itemTotal.toFixed(2)}</p>
          <button class="remove-btn" onclick="removeItem('${id}')">${t('remove')}</button>
        </div>
      </div>
    `;
  }

  cartContainer.innerHTML += `
    <div class="cart-summary">
      <h2>${t('total')}: EGP ${total.toFixed(2)}</h2>
      <button class="checkout-btn" onclick="goToCheckout()">
        ${t('continueToCheckout')} →
      </button> 
    </div>
  `;
} 

function syncProductCardState(productId) {
  const container = document.getElementById("qty-container-" + productId);
  if (!container) return;

  const cart = getCart();
  const qty = cart[productId] || 0;

  const addButton = container.querySelector(".add-to-cart-btn");
  const selector = container.querySelector(".qty-selector");
  const qtyDisplay = container.querySelector(".qty-number");

  if (qty > 0) {
    if (addButton) addButton.style.display = "none";
    if (selector) selector.style.display = "flex";
    if (qtyDisplay) qtyDisplay.textContent = qty;
  } else {
    if (addButton) addButton.style.display = "block";
    if (selector) selector.style.display = "none";
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartData));
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || {};
}

function initQuantity(productId, btn) {
const product = products.find(p => p._id.toString() === productId.toString());
  if (product && product.stock <= 0) {
      showMessage("Sorry, this item is currently out of stock.");
      return; 
  }

  const container = btn.parentElement;
  btn.style.display = "none";

  const selector = container.querySelector(".qty-selector");
  if (selector) {
    selector.style.display = "flex";
  }

cartData[productId.toString()] = 1;  saveCart();
  updateGlobalUI(productId);
}

function changeQty(productId, delta) {
if (!cartData[productId.toString()]) return;
  if (delta > 0) { 
const product = products.find(p => p._id.toString() === productId.toString());  
  if (product && cartData[productId] >= product.stock) {
      showMessage(`Sorry, we only have ${product.stock} of these in stock!`);
      return; 
    }
  }

 

cartData[productId.toString()] += delta;  
  if (cartData[productId] < 1) {
    delete cartData[productId.toString()];
    resetToDefaultButton(productId);
  }

  saveCart();
  updateGlobalUI(productId);
  updateCartBadge();
}

function changeCartQty(id, delta) {
  const cart = getCart();
  if (!cart[id]) return;


  if (delta > 0) {
const product = products.find(p => p._id.toString() === id.toString());  
 if (product && cart[id] >= product.stock) {
      showMessage(`Sorry, we only have ${product.stock} of these in stock!`);
      return; 
    }
  }

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
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let totalItems = 0;
  for (let key in cart) {
    totalItems += cart[key];
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

function renderCheckout() {
  // Auto-fill user info
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  const nameField = document.getElementById("customer-name");
  const emailField = document.getElementById("customer-email");
  const phoneField = document.getElementById("customer-phone");
  const addressField = document.getElementById("customer-address"); // ← must be INSIDE here

  if (nameField && !nameField.value) nameField.value = currentUser.name || "";
  if (emailField && !emailField.value) emailField.value = currentUser.email || "";
  if (phoneField && !phoneField.value) phoneField.value = currentUser.phone || "";

  if (addressField && !addressField.value && currentUser.id) {
    fetch(`${API}/api/addresses/${currentUser.id}`)
      .then(res => res.json())
      .then(addresses => {
        if (addresses.length > 0) {
          addressField.value = addresses[0].detail;
        }
      });
  }
} 

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
const item = products.find(p => p._id.toString() === id);
    if (!item) continue;

    const qty = cart[id];
    const itemTotal = item.price * qty;
    subtotal += itemTotal;

    html += `
      <div class="checkout-item">
        <span>${item.name} (x${qty})</span>
        <span>EGP ${itemTotal.toFixed(2)}</span>
      </div>
    `;
  }

  itemsContainer.innerHTML = html;

  const shipping = getShippingPrice();
  const finalTotal = subtotal + shipping;

  if (shippingContainer) {
    shippingContainer.innerHTML = `<h3>Shipping: EGP ${shipping.toFixed(2)}</h3>`;
  }

  totalContainer.innerHTML = `<h3>Total: EGP ${finalTotal.toFixed(2)}</h3>`;
}

function goToCheckout() {
  const cart = getCart();

  if (Object.keys(cart).length === 0) {
    showMessage("Your cart is empty!");
    return;
  }

  const currentUser = localStorage.getItem("currentUser");

 if (!currentUser) {
    showMessage("Please login first to continue your order.");

    setTimeout(() => {
        localStorage.setItem("redirectAfterLogin", "checkout.html");
        window.location.href = "login.html";
    }, 2000);

    return;
}

  window.location.href = "checkout.html";
}

async function placeOrder(event) {
  event.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    showMessage("Please login first.");
    localStorage.setItem("redirectAfterLogin", "checkout.html");
    window.location.href = "login.html";
    return;
  }
  //collect data
  const name = document.getElementById("customer-name").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const governorate = document.getElementById("customer-governorate").value;
  const address = document.getElementById("customer-address").value.trim();
  const paymentMethod = document.getElementById("payment-method").value;
  const cart = getCart();

  if (Object.keys(cart).length === 0) { showMessage("Your cart is empty."); return; }
  if (name.length < 3) { showMessage("Please enter a valid full name."); return; }
  if (!isValidEmail(email)) { showMessage("Please enter a valid email address."); return; }
  if (!isValidPhone(phone)) { showMessage("Please enter a valid phone number."); return; }
  if (!governorate) { showMessage("Please select your governorate."); return; }
  if (address.length < 8) { showMessage("Please enter a complete address."); return; }
  if (!paymentMethod) { showMessage("Please select a payment method."); return; }

  try {
    const response = await fetch(`${API}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.id,
        customer: { name, email, phone, governorate, address },
        cart,
        paymentMethod
      })
    });
    if (response.ok) { showOrderModal(); }
    else { showMessage("Failed to place order. Please try again."); }
  } catch (error) { showMessage("Could not connect to server."); }
}


const shippingRates = {
  Cairo: 50, Giza: 50, Alexandria: 70, Dakahlia: 80, Sharqia: 80, Monufia: 75,
  Qalyubia: 60, Beheira: 85, "Kafr El Sheikh": 85, Gharbia: 80, "Port Said": 90,
  Suez: 90, Ismailia: 85, Damietta: 85, Fayoum: 75, "Beni Suef": 80, Minya: 90,
  Assiut: 100, Sohag: 110, Qena: 120, Luxor: 130, Aswan: 140, "Red Sea": 120,
  "New Valley": 150, Matrouh: 120, "North Sinai": 130, "South Sinai": 140
};

function getShippingPrice() {
  const govSelect = document.getElementById("customer-governorate");
  if (!govSelect || !govSelect.value) return 0;
  return shippingRates[govSelect.value] || 0;
}

function showMessage(message){
    const box = document.getElementById("messageBox");

    if (!box) return;


    box.textContent = message;
    box.classList.add("show");

    setTimeout(()=>{
        box.classList.remove("show");
    },3000);
}

function updateShipping() {
  const shippingContainer = document.getElementById("checkout-shipping");
  const totalContainer = document.getElementById("checkout-total");
  const cart = getCart();

  if (!shippingContainer || !totalContainer) return;

  let subtotal = 0;

  for (let id in cart) {
  const item = products.find(p => p._id.toString() === id);
    if (!item) continue;
    subtotal += item.price * cart[id];
  }

  const shipping = getShippingPrice();
  const finalTotal = subtotal + shipping;

  shippingContainer.innerHTML = `<h3>Shipping: EGP ${shipping.toFixed(2)}</h3>`;
  totalContainer.innerHTML = `<h3>Total: EGP ${finalTotal.toFixed(2)}</h3>`;
}

function cancelUI(btn) {
  if (btn.dataset.confirming) return;
  btn.dataset.confirming = "true";
  const originalText = btn.textContent;
  btn.textContent = "Sure? Yes";
  btn.classList.add("order-cancel-btn--confirming");

  const noBtn = document.createElement("button");
  noBtn.textContent = "No";
  noBtn.className = "confirm-no-btn";
  btn.after(noBtn);

  btn.onclick = function() {
    const card = btn.closest(".order-card");
    const status = card.querySelector(".status-chip");
    card.style.opacity = "0.5";
    status.textContent = "Cancelled";
    status.className = "status-chip status-cancelled";
    noBtn.remove();
    btn.remove();
  };

  noBtn.onclick = function() {
    btn.textContent = originalText;
    btn.classList.remove("order-cancel-btn--confirming");
    delete btn.dataset.confirming;
    btn.onclick = function() { cancelUI(btn); };
    noBtn.remove();
  };
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
async function loadUserOrders(userId) {
  const ordersTab = document.getElementById("tab-orders");
  if (!ordersTab) return;

  try {
    const response = await fetch(`${API}/api/orders/user/${userId}`);
    const orders = await response.json();

    if (orders.length === 0) {
      ordersTab.innerHTML = "<h3>Orders</h3><div class='order-card'><p>No orders yet.</p></div>";
      return;
    }

    let html = "<h3>Orders</h3>";
    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('en-EG');
      const cancelBtn = order.status === 'Pending'
        ? `<button onclick="cancelOrder('${order._id}')" class="order-cancel-btn">Cancel Order</button>`
        : "";

      html += `
        <div class="order-card" style="border:1px solid #eee; padding:16px; margin-bottom:16px; border-radius:8px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong>Order #${order._id.toString().slice(-6).toUpperCase()}</strong>
            <span style="color:#888; font-size:13px;">${date}</span>
          </div>
          <p style="margin:4px 0;">Status: <strong>${order.status}</strong></p>
          <p style="margin:4px 0;">Items: ${order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>
          <p style="margin:4px 0;">Shipping to: ${order.customer.governorate}</p>
          <p style="margin:4px 0; font-weight:bold;">Total: EGP ${order.total.toFixed(2)}</p>
          ${cancelBtn}
        </div>
      `;
    });

    ordersTab.innerHTML = html;
  } catch (error) {
    ordersTab.innerHTML = "<h3>Orders</h3><p>Could not load orders.</p>";
  }
}
function cancelOrder(orderId) {
  const btn = event.target;
  if (btn.dataset.confirming) return;
  btn.dataset.confirming = "true";
  const originalText = btn.textContent;
  btn.textContent = "Sure? Yes";
  btn.classList.add("order-cancel-btn--confirming");

  const noBtn = document.createElement("button");
  noBtn.textContent = "No";
  noBtn.className = "confirm-no-btn";
  btn.after(noBtn);

  btn.onclick = async function() {
    try {
      const response = await fetch(`${API}/api/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        showMessage("Order cancelled successfully.");
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        loadUserOrders(currentUser.id);
      } else {
        showMessage(data.message || "Could not cancel order.");
      }
    } catch (error) {
      showMessage("Could not connect to server.");
    }
  };

  noBtn.onclick = function() {
    btn.textContent = originalText;
    btn.classList.remove("order-cancel-btn--confirming");
    delete btn.dataset.confirming;
    btn.onclick = function() { cancelOrder(orderId); };
    noBtn.remove();
  };
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
  updateNavForUser();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  if (document.getElementById("sidebar-name")) document.getElementById("sidebar-name").textContent = currentUser.name;
  if (document.getElementById("sidebar-email")) document.getElementById("sidebar-email").textContent = currentUser.email;
  if (document.getElementById("sidebar-avatar")) document.getElementById("sidebar-avatar").textContent = currentUser.name.substring(0, 2).toUpperCase();
  if (document.getElementById("edit-full-name")) document.getElementById("edit-full-name").value = currentUser.name;
  if (document.getElementById("edit-email")) document.getElementById("edit-email").value = currentUser.email;
  if (document.getElementById("edit-phone")) document.getElementById("edit-phone").value = currentUser.phone || "";

  loadUserOrders(currentUser.id);
  loadUserAddresses(currentUser.id);
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cart");
  location.reload();
}

async function validateLogin() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-pass").value.trim();

  if (!email || !password) { showMessage("Please enter both email and password."); return; }

  try {
    const response = await fetch(`${API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) { showMessage(data.message); return; }

    localStorage.setItem("currentUser", JSON.stringify(data.user));
    const redirectPage = localStorage.getItem("redirectAfterLogin");
    if (redirectPage) { localStorage.removeItem("redirectAfterLogin"); window.location.href = redirectPage; return; }
    mockLogin();
  } catch (error) { showMessage("Could not connect to server."); }
}


async function joinNow() {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const phone = document.getElementById("reg-phone").value.trim();
  const pass = document.getElementById("reg-pass").value;
  const confirm = document.getElementById("reg-confirm").value;

  const msg = document.getElementById("signup-message");
  const btn = document.getElementById("signup-btn");

  function showMessage(text, type) {
    msg.textContent = text;
    msg.className = `signup-message ${type}`;
  }

  function resetButton() {
    btn.disabled = false;
    btn.textContent = "Create Account";
  }

  btn.disabled = true;
  btn.textContent = "Creating Account...";

  if (!name || !email || !phone || !pass || !confirm) {
    showMessage("Please fill in all fields.", "error");
    resetButton();
    return;
  }
  if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(name)) {
  showMessage("Full name must contain letters only.", "error");
  resetButton();
return;
}

  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    resetButton();
    return;
  }

  if (!isValidPhone(phone)) {
    showMessage("Please enter a valid phone number.", "error");
    resetButton();
    return;
  }

  if (pass.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    resetButton();
    return;
  }

  if (pass !== confirm) {
    showMessage("Passwords do not match.", "error");
    resetButton();
    return;
  }

  try {
    const response = await fetch(`${API}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password: pass
      })
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message || "Registration failed.", "error");
      resetButton();
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(data.user));

    btn.textContent = "✓ Account Created";

    showMessage(
      `Welcome ${name}! Account created successfully! Redirecting to shop...`,
      "success"
    );

    setTimeout(() => {
      window.location.href = "shop.html";
    }, 2500);

  } catch (error) {
    showMessage("Could not connect to server.", "error");
    resetButton();
  }
}

async function updateProfile() {
  const newName = document.getElementById("edit-full-name").value.trim();
  if (newName.length < 3) {
    showMessage("Name must be at least 3 characters.");
    return;
}

if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(newName)) {
    showMessage("Name can contain letters only.");
    return;
}
  const newEmail = document.getElementById("edit-email").value.trim();
  const newPhone = document.getElementById("edit-phone") ? document.getElementById("edit-phone").value.trim() : "";

  if (!newName || !newEmail) { showMessage("Please fill in both Name and Email."); return; }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) { showMessage("Not logged in."); return; }

  try {
    const response = await fetch(`${API}/api/update-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: currentUser.id, name: newName, email: newEmail, phone: newPhone })
    });
    const data = await response.json();
    if (!response.ok) { showMessage(data.message); return; }

    localStorage.setItem("currentUser", JSON.stringify(data.user));
    document.getElementById("sidebar-name").textContent = newName;
    document.getElementById("sidebar-email").textContent = newEmail;
    document.getElementById("sidebar-avatar").textContent = newName.substring(0, 2).toUpperCase();
    showMessage("Profile updated successfully!");
  } catch (error) { showMessage("Could not connect to server."); }
}

async function changePasswordAction() {
  const inputs = document.querySelectorAll("#tab-security input");
  const currentPass = inputs[0].value;
  const newPass = inputs[1].value;

  if (!currentPass || !newPass) {
    showMessage("Please fill in all fields.");
    return;
  }

  if (newPass.length < 6) {
    showMessage("Password must be at least 6 characters.");
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    showMessage("You are not logged in.");
    return;
  }

  try {
    const response = await fetch(`${API}/api/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: currentUser.email,
        currentPassword: currentPass,
        newPassword: newPass
      })
    });

    const data = await response.json();
    showMessage(data.message);

    if (response.ok) {
      inputs.forEach(input => input.value = "");
    }

  } catch (error) {
    showMessage("Could not connect to server.");
  }
}

async function addNewAddressPrompt() {
  const title = prompt("Address Title (e.g. Home, Work):");
  const detail = prompt("Address Details (Street, City, Area):");
  if (!title || !detail) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) { showMessage("Not logged in."); return; }

  try {
    const response = await fetch(`${API}/api/add-address`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, title, detail })
    });
    const data = await response.json();
    if (!response.ok) { showMessage(data.message); return; }
    loadUserAddresses(currentUser.id);
  } catch (error) { showMessage("Could not connect to server."); }
}
async function loadUserAddresses(userId) {
  const addressList = document.getElementById("address-list");
  if (!addressList) return;

  try {
    const response = await fetch(`${API}/api/addresses/${userId}`);
    const addresses = await response.json();

    if (addresses.length === 0) {
      addressList.innerHTML = "<p>No addresses saved yet.</p>";
      return;
    }

    addressList.innerHTML = "";
    addresses.forEach(addr => {
      const item = document.createElement("div");
      item.className = "address-item active";
      item.innerHTML = `
        <strong>${addr.title}</strong>
        <p>${addr.detail}</p>
        <a href="#" onclick="removeAddress('${addr._id}')">Remove</a>
      `;
      addressList.appendChild(item);
    });
  } catch (error) {
    console.error("Could not load addresses.");
  }
}

async function removeAddress(addressId) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  try {
    await fetch(`${API}/api/remove-address`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, addressId })
    });
    loadUserAddresses(currentUser.id);
  } catch (error) { showMessage("Could not connect to server."); }
}

// ==========================================================================
// 8. ADMIN PANEL
// ==========================================================================

async function adminLogin() {
  const email = document.getElementById("admin-email").value.trim();
  const pass  = document.getElementById("admin-pass").value;

  try {
    const res  = await fetch(`${API}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();
    if (!res.ok) { showMessage(data.message); return; }

    localStorage.setItem("adminSession", "true");
    localStorage.setItem("adminToken", data.token);
    window.location.href = "admin.html";
  } catch (error) {
    showMessage("Could not connect to server.");
  }
}

function adminLogout() {
  localStorage.removeItem("adminSession");
  localStorage.removeItem("adminToken");
  window.location.href = "login.html";
}

function loadTab(tabName, btn) {
  const contentArea = document.getElementById("admin-panel-content");
  if (!contentArea) return;

  document.querySelectorAll(".admin-link").forEach(link => link.classList.remove("active"));
  if (btn) btn.classList.add("active");

  if (tabName === "dashboard") loadAdminDashboard();
  else if (tabName === "products") loadAdminProducts();
  else if (tabName === "orders") loadAdminOrders();
  else if (tabName === "users") loadAdminUsers();
   else if (tabName === "reports") {
    contentArea.innerHTML = `<h1>📈 Sales Reports</h1><p style="margin-top:16px">Coming soon.</p>`;
  } else if (tabName === "policy") {
    contentArea.innerHTML = `<h1>📜 Policy Pages</h1><label>Return Policy</label><textarea class="search-input" style="width:100%; height:150px; margin:10px 0;">We accept returns within 30 days...</textarea><button class="search-button">Update Policy</button>`;
  }
}

async function loadAdminDashboard() {
  const contentArea = document.getElementById("admin-panel-content");
  contentArea.innerHTML = "<h1>📊 Dashboard</h1><p>Loading...</p>";

  try {
    const [ordersRes, usersRes, productsRes] = await Promise.all([
      fetch(`${API}/api/admin/orders`, { headers: adminHeaders() }),
      fetch(`${API}/api/admin/users`, { headers: adminHeaders() }),
      fetch(`${API}/api/admin/products`, { headers: adminHeaders() })
    ]);
    const orders = await ordersRes.json();
    const users = await usersRes.json();
    const products = await productsRes.json();

    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    contentArea.innerHTML = `
      <h1>📊 Dashboard</h1>
      <div style="display:grid; grid-template-columns: repeat(4,1fr); gap:16px; margin-top:20px">
        <div style="padding:20px; border:1px solid #eee; border-radius:8px; text-align:center">
          <h3>Total Sales</h3><p style="font-size:22px; font-weight:bold">EGP ${totalSales.toFixed(2)}</p>
        </div>
        <div style="padding:20px; border:1px solid #eee; border-radius:8px; text-align:center">
          <h3>Orders</h3><p style="font-size:22px; font-weight:bold">${orders.length}</p>
        </div>
        <div style="padding:20px; border:1px solid #eee; border-radius:8px; text-align:center">
          <h3>Customers</h3><p style="font-size:22px; font-weight:bold">${users.length}</p>
        </div>
        <div style="padding:20px; border:1px solid #eee; border-radius:8px; text-align:center">
          <h3>Products</h3><p style="font-size:22px; font-weight:bold">${products.length}</p>
        </div>
      </div>
    `;
  } catch (error) {
    contentArea.innerHTML = "<h1>📊 Dashboard</h1><p>Could not load data.</p>";
  }
}

async function loadAdminProducts() {
  const contentArea = document.getElementById("admin-panel-content");
  contentArea.innerHTML = "<h1>📦 Products</h1><p>Loading...</p>";

  try {
    const res = await fetch(`${API}/api/admin/products`, { headers: adminHeaders() });
    const products = await res.json();

    let rows = products.map(p => `
      <tr>
        <td>${p._id.toString().slice(-6).toUpperCase()}</td>
        <td>${p.name}</td>
        <td>EGP ${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.category}</td>
        <td>
          <button onclick="editProduct('${p._id}')" class="admin-action-btn admin-action-btn--edit">✏️ Edit</button>
          <button onclick="deleteProduct('${p._id}')" class="admin-action-btn admin-action-btn--delete">🗑 Delete</button>
        </td>
      </tr>
    `).join("");

    const template = document.getElementById("products-tab-template");
    const clone = template.content.cloneNode(true);
    clone.getElementById("products-table-body").innerHTML = rows;

    contentArea.innerHTML = "";
    contentArea.appendChild(clone);
  } catch (error) {
    contentArea.innerHTML = "<h1>📦 Products</h1><p>Could not load products.</p>";
  }
}

async function loadAdminOrders() {
  const contentArea = document.getElementById("admin-panel-content");
  contentArea.innerHTML = "<h1>🛒 Orders</h1><p>Loading...</p>";

  try {
    const res = await fetch(`${API}/api/admin/orders`, { headers: adminHeaders() });
    const orders = await res.json();

    let rows = orders.map(o => `
      <tr>
        <td>#${o._id.toString().slice(-6).toUpperCase()}</td>
        <td>${o.customer.name}</td>
        <td>${o.customer.governorate}</td>
        <td>EGP ${o.total.toFixed(2)}</td>
        <td>
          <select onchange="updateOrderStatus('${o._id}', this.value)">
            <option ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `).join("");

    contentArea.innerHTML = `
      <h1>🛒 Order Management</h1>
      <table class="admin-table" style="margin-top:20px; width:100%; border-collapse:collapse">
        <tr><th>Order ID</th><th>Customer</th><th>Governorate</th><th>Total</th><th>Status</th></tr>
        ${rows}
      </table>
    `;
  } catch (error) {
    contentArea.innerHTML = "<h1>🛒 Orders</h1><p>Could not load orders.</p>";
  }
}

async function loadAdminUsers() {
  const contentArea = document.getElementById("admin-panel-content");
  contentArea.innerHTML = "<h1>👥 Users</h1><p>Loading...</p>";

  try {
    const res = await fetch(`${API}/api/admin/users`, { headers: adminHeaders() });
    const users = await res.json();

   let rows = users.map(u => `
  <tr>
    <td>${u.name}</td>
    <td>${u.email}</td>
    <td>${u.phone || '-'}</td>
    <td>${new Date(u.createdAt).toLocaleDateString('en-EG')}</td>
    <td><button onclick="deleteUser('${u._id}')" style="color:red; background:none; border:none; cursor:pointer">🗑 Delete</button></td>
  </tr>
`).join("");

    contentArea.innerHTML = `
      <h1>👥 User Management</h1>
      <table class="admin-table" style="margin-top:20px; width:100%; border-collapse:collapse">
<tr><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th><th>Action</th></tr>
        ${rows}
      </table>
    `;
  } catch (error) {
    contentArea.innerHTML = "<h1>👥 Users</h1><p>Could not load users.</p>";
  }
}

function deleteProduct(productId) {
  // Find the delete button that was clicked and replace it with inline confirmation
  const deleteBtn = event.target;
  const td = deleteBtn.closest('td');
  const editBtn = td.querySelector('.admin-action-btn--edit');
  if (editBtn) editBtn.style.display = 'none';
  deleteBtn.style.display = 'none';

  const confirmBar = document.createElement('span');
  confirmBar.className = 'admin-delete-confirm';
  confirmBar.innerHTML = `Sure? <button class="admin-delete-yes" onclick="confirmDeleteProduct('${productId}')">Yes</button> <button class="admin-delete-no" onclick="cancelDeleteProduct(this)">No</button>`;
  td.appendChild(confirmBar);
}

async function confirmDeleteProduct(productId) {
  try {
    await fetch(`${API}/api/admin/products/${productId}`, {
      method: 'DELETE',
      headers: adminHeaders()
    });
    showMessage("Product deleted!");
    loadAdminProducts();
  } catch (error) { showMessage("Could not delete product."); }
}

function cancelDeleteProduct(btn) {
  const td = btn.closest('td');
  td.querySelector('.admin-delete-confirm').remove();
  td.querySelector('.admin-action-btn--edit').style.display = '';
  td.querySelector('.admin-action-btn--delete').style.display = '';
}
async function addNewProduct() {
  const name        = document.getElementById("new-product-name").value.trim();
  const price       = parseFloat(document.getElementById("new-product-price").value);
  const stock       = parseInt(document.getElementById("new-product-stock").value);
  const category    = document.getElementById("new-product-category").value.trim();
  const imageFile   = document.getElementById("new-product-image").files[0];
  const rating      = parseFloat(document.getElementById("new-product-rating").value) || 0;
  const description = document.getElementById("new-product-description").value.trim();

  if (!name || isNaN(price) || isNaN(stock) || !category) {
    showMessage('Please fill in Name, Price, Stock and Category at minimum.');
    return;
  }

  if (price < 0) {
    showMessage('Price must be a positive number.');
    return;
  }

  if (stock < 0) {
    showMessage('Stock must be a positive number.');
    return;
  }

  if (rating && (rating < 0 || rating > 5)) {
    showMessage('Rating must be between 0 and 5.');
    return;
  }

  const formData = new FormData();
  formData.append('name',        name);
  formData.append('price',       price);
  formData.append('stock',       stock);
  formData.append('category',    category);
  formData.append('rating',      rating);
  formData.append('description', description);
  if (imageFile) formData.append('image', imageFile);

  try {
    const res = await fetch(`${API}/api/admin/products`, {
      method: 'POST',
      headers: adminHeaders(),
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      showMessage(data.message || 'Failed to add product.');
      return;
    }
    showMessage('Product added successfully!');
    setTimeout(() => loadAdminProducts(), 1500);
  } catch (error) {
    showMessage('Could not connect to server.');
  }
}

function deleteUser(userId) {
  const deleteBtn = event.target;
  const td = deleteBtn.closest('td');
  deleteBtn.style.display = 'none';

  const confirmBar = document.createElement('span');
  confirmBar.className = 'admin-delete-confirm';
  confirmBar.innerHTML = `Sure? <button class="admin-delete-yes" onclick="confirmDeleteUser('${userId}')">Yes</button> <button class="admin-delete-no" onclick="cancelDeleteUser(this)">No</button>`;
  td.appendChild(confirmBar);
}

async function confirmDeleteUser(userId) {
  try {
    await fetch(`${API}/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers: adminHeaders()
    });
    showMessage("User deleted!");
    loadAdminUsers();
  } catch (error) {
    showMessage("Could not delete user.");
  }
}

function cancelDeleteUser(btn) {
  const td = btn.closest('td');
  td.querySelector('.admin-delete-confirm').remove();
  td.querySelector('button[style]').style.display = '';
}
async function updateOrderStatus(orderId, status) {
  try {
    await fetch(`${API}/api/admin/orders/${orderId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify({ status })
    });
  } catch (error) { showMessage("Could not update order status."); }
}

async function editProduct(productId) {
  try {
    const res = await fetch(`${API}/api/admin/products`, { headers: adminHeaders() });
    const products = await res.json();
    const product = products.find(p => p._id === productId);
    if (!product) { showMessage('Product not found.'); return; }

    const editSection = document.getElementById('admin-edit-product-section');
    const addSection = document.getElementById('admin-add-product-section');
    if (addSection) addSection.style.display = 'none';
    if (editSection) editSection.style.display = 'block';

    document.getElementById('edit-product-id').value = productId;
    document.getElementById('edit-product-name').value = product.name || '';
    document.getElementById('edit-product-price').value = product.price || '';
    document.getElementById('edit-product-stock').value = product.stock ?? '';
    document.getElementById('edit-product-category').value = product.category || '';
    document.getElementById('edit-product-rating').value = product.rating || '';
    document.getElementById('edit-product-description').value = product.description || '';

    editSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    showMessage('Could not load product data.');
  }
}

function cancelEditProduct() {
  const editSection = document.getElementById('admin-edit-product-section');
  const addSection = document.getElementById('admin-add-product-section');
  if (editSection) editSection.style.display = 'none';
  if (addSection) addSection.style.display = 'block';
}

async function saveEditProduct() {
  const productId   = document.getElementById('edit-product-id').value;
  const name        = document.getElementById('edit-product-name').value.trim();
  const price       = parseFloat(document.getElementById('edit-product-price').value);
  const stock       = parseInt(document.getElementById('edit-product-stock').value);
  const category    = document.getElementById('edit-product-category').value.trim();
  const imageFile   = document.getElementById('edit-product-image').files[0];
  const rating      = parseFloat(document.getElementById('edit-product-rating').value) || 0;
  const description = document.getElementById('edit-product-description').value.trim();

  if (!name || isNaN(price) || isNaN(stock) || !category) {
    showMessage('Please fill in Name, Price, Stock and Category at minimum.');
    return;
  }

  if (price < 0) {
    showMessage('Price must be a positive number.');
    return;
  }

  if (stock < 0) {
    showMessage('Stock must be a positive number.');
    return;
  }

  if (rating && (rating < 0 || rating > 5)) {
    showMessage('Rating must be between 0 and 5.');
    return;
  }

  const formData = new FormData();
  formData.append('name',        name);
  formData.append('price',       price);
  formData.append('stock',       stock);
  formData.append('category',    category);
  formData.append('rating',      rating);
  formData.append('description', description);
  if (imageFile) formData.append('image', imageFile);

  try {
    const res = await fetch(`${API}/api/admin/products/${productId}`, {
      method: 'PUT',
      headers: adminHeaders(),
      body: formData
    });
    const data = await res.json();

    if (!res.ok) {
      showMessage(data.message || 'Failed to update product.');
      return;
    }

    showMessage('Product updated successfully!');
    setTimeout(() => loadAdminProducts(), 1500);
  } catch (error) {
    showMessage('Could not connect to server.');
  }
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
