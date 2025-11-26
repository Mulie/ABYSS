// Cart page functionality

document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartSummary();
    setupCartEventListeners();
});

// Display cart items
function displayCartItems() {
    const cartItems = cart.getItems();
    const container = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartItems.length === 0) {
        if (container) container.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }

    if (container) container.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'block';

    if (container) {
        container.innerHTML = cartItems.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<i class="fas ${item.icon}"></i>`}
                </div>
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.category}</p>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="cart-item-price">
                        Total: $${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <i class="fas fa-trash remove-item" onclick="removeCartItem(${item.id})"></i>
                </div>
            </div>
        `).join('');
    }
}

// Update cart summary
function updateCartSummary() {
    const summary = getCartSummary();

    const elements = {
        subtotal: document.getElementById('cart-subtotal'),
        shipping: document.getElementById('cart-shipping'),
        tax: document.getElementById('cart-tax'),
        total: document.getElementById('cart-total')
    };

    if (elements.subtotal) elements.subtotal.textContent = `$${summary.subtotal}`;
    if (elements.shipping) elements.shipping.textContent = `$${summary.shipping}`;
    if (elements.tax) elements.tax.textContent = `$${summary.tax}`;
    if (elements.total) elements.total.textContent = `$${summary.total}`;
}

// Change item quantity
function changeQuantity(productId, change) {
    const item = cart.getItems().find(item => item.id === productId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0 && newQuantity <= 10) {
            updateCartQuantity(productId, newQuantity);
            displayCartItems();
            updateCartSummary();
        }
    }
}

// Remove cart item
function removeCartItem(productId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        removeFromCart(productId);
        displayCartItems();
        updateCartSummary();
    }
}

// Setup event listeners
function setupCartEventListeners() {
    const applyPromoBtn = document.getElementById('apply-promo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoInput = document.getElementById('promo-input');
            if (promoInput && promoInput.value) {
                alert('Promo code feature coming soon!');
                promoInput.value = '';
            }
        });
    }
}
