// Checkout page functionality

document.addEventListener('DOMContentLoaded', function() {
    displayCheckoutItems();
    updateCheckoutSummary();
    setupCheckoutForm();
    setupShippingOptions();
    setupPaymentMethods();
});

// Display checkout items
function displayCheckoutItems() {
    const cartItems = cart.getItems();
    const container = document.getElementById('checkout-items');

    if (!container) return;

    if (cartItems.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    container.innerHTML = cartItems.map(item => `
        <div class="order-item">
            <div class="order-item-image">
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<i class="fas ${item.icon}"></i>`}
            </div>
            <div class="order-item-info">
                <h4>${item.name}</h4>
                <div class="order-item-details">
                    Qty: ${item.quantity} × $${item.price.toFixed(2)}
                </div>
            </div>
        </div>
    `).join('');
}

// Update checkout summary
function updateCheckoutSummary() {
    const summary = getCheckoutSummary();

    const elements = {
        subtotal: document.getElementById('checkout-subtotal'),
        shipping: document.getElementById('checkout-shipping'),
        tax: document.getElementById('checkout-tax'),
        total: document.getElementById('checkout-total')
    };

    if (elements.subtotal) elements.subtotal.textContent = `$${summary.subtotal}`;
    if (elements.shipping) elements.shipping.textContent = `$${summary.shipping}`;
    if (elements.tax) elements.tax.textContent = `$${summary.tax}`;
    if (elements.total) elements.total.textContent = `$${summary.total}`;
}

// Get checkout summary with selected shipping
function getCheckoutSummary() {
    const subtotal = cart.getTotal();
    const shippingOption = document.querySelector('input[name="shipping"]:checked');
    let shippingCost = 5.99; // default

    if (shippingOption) {
        switch(shippingOption.value) {
            case 'standard':
                shippingCost = subtotal > 50 ? 0 : 5.99;
                break;
            case 'express':
                shippingCost = 12.99;
                break;
            case 'overnight':
                shippingCost = 24.99;
                break;
        }
    }

    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shippingCost + tax;

    return {
        subtotal: subtotal.toFixed(2),
        shipping: shippingCost.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}

// Setup shipping options
function setupShippingOptions() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateCheckoutSummary);
    });
}

// Setup payment methods
function setupPaymentMethods() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('card-details');

    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (cardDetails) {
                cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
            }
        });
    });
}

// Setup checkout form
function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            processCheckout();
        });
    }
}

// Process checkout
function processCheckout() {
    // Validate form
    const form = document.getElementById('checkout-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        cart.clearCart();

        // Show success message
        showSuccessModal();

        // Reset button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Complete Order';
        }
    }, 2000);
}

// Show success modal
function showSuccessModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: white; padding: 3rem; border-radius: 12px; text-align: center; max-width: 500px;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;"></i>
            <h2 style="margin-bottom: 1rem; color: #1f2937;">Order Placed Successfully!</h2>
            <p style="color: #6b7280; margin-bottom: 2rem;">Thank you for your purchase. You will receive a confirmation email shortly.</p>
            <button onclick="window.location.href='index.html'" class="btn btn-primary">
                Continue Shopping
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}
