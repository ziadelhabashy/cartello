// 1. Simple object to store product quantities: { productId: quantity }
let cartData = {};

/**
 * SEARCH FUNCTION:
 * Filters products based on the text typed in the search bar.
 */
function filterProducts() {
    // Get the text from the search input and make it lowercase
    let input = document.getElementById('product-search').value.toLowerCase();
    
    // Get all product cards and the "No Results" message div
    let cards = document.querySelectorAll('.product-card');
    let message = document.getElementById('no-results');
    
    // Track if we found at least one match
    let foundAny = false;

    // Loop through every card one by one
    for (let i = 0; i < cards.length; i++) {
        // Get the title of the current product
        let title = cards[i].querySelector('.product-title').textContent.toLowerCase();
        
        // Check if the search text is inside the title
        if (title.indexOf(input) > -1) {
            cards[i].style.display = ""; // Show it
            foundAny = true;            // Mark that we found something
        } else {
            cards[i].style.display = "none"; // Hide it
        }
    }

    // If the loop finished and nothing was found, show the "No Results" message
    if (foundAny == true) {
        message.style.display = "none";
    } else {
        message.style.display = "block";
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

    // If quantity hits 0, remove it and go back to "Add to Cart" button
    if (cartData[productId] < 1) {
        delete cartData[productId];
        resetToDefaultButton(productId);
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

function showPage(page) {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("products").classList.add("hidden");
    document.getElementById("orders").classList.add("hidden");
  
    document.getElementById(page).classList.remove("hidden");
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
            <h1>📦 Product Management</h1>
            <button class="search-button" style="margin-bottom:15px">+ Add New Product</button>
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

