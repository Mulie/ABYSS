// LIYU.ca Promotion Management

// Create promotion
window.createPromotion = function() {
    openModal('create-promo-modal');

    // Handle form submission
    const form = document.getElementById('create-promo-form');
    if (form) {
        form.onsubmit = async function(e) {
            e.preventDefault();

            const promotionData = {
                name: document.getElementById('promo-name').value,
                type: document.getElementById('promo-type').value,
                discount_value: parseFloat(document.getElementById('discount-value').value),
                apply_to: document.getElementById('promo-apply-to').value,
                start_date: document.getElementById('promo-start').value,
                end_date: document.getElementById('promo-end').value,
                test_mode: document.getElementById('test-mode').checked
            };

            // Log activity
            await logActivity('promotion_create', promotionData);

            showNotification('Promotion created successfully', 'success');
            closeModal('create-promo-modal');
        };
    }
};

// Edit promotion
window.editPromotion = function(id) {
    showNotification('Edit promotion feature coming soon', 'info');
};

// View report
window.viewReport = function(id) {
    showNotification('Promotion report feature coming soon', 'info');
};

// Pause promotion
window.pausePromotion = function(id) {
    if (confirm('Are you sure you want to pause this promotion?')) {
        logActivity('promotion_pause', { id: id });
        showNotification('Promotion paused', 'success');
    }
};

// Activate promotion now
window.activateNow = function(id) {
    if (confirm('Start this promotion immediately?')) {
        logActivity('promotion_activate', { id: id });
        showNotification('Promotion activated', 'success');
    }
};

// Cancel promotion
window.cancelPromotion = function(id) {
    if (confirm('Cancel this scheduled promotion?')) {
        logActivity('promotion_cancel', { id: id });
        showNotification('Promotion cancelled', 'success');
    }
};

// Generate coupons
window.generateCoupons = function() {
    showNotification('Coupon generation feature coming soon', 'info');
};

// Edit coupon
window.editCoupon = function(code) {
    showNotification(`Edit coupon: ${code}`, 'info');
};

// Copy coupon
window.copyCoupon = function(code) {
    navigator.clipboard.writeText(code);
    showNotification('Coupon code copied to clipboard', 'success');
};

// Deactivate coupon
window.deactivateCoupon = function(code) {
    if (confirm(`Deactivate coupon ${code}?`)) {
        logActivity('coupon_deactivate', { code: code });
        showNotification('Coupon deactivated', 'success');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Setup apply-to field dependencies
    const applyToSelect = document.getElementById('promo-apply-to');
    if (applyToSelect) {
        applyToSelect.addEventListener('change', function() {
            const categorySelect = document.getElementById('category-select');
            if (categorySelect) {
                categorySelect.style.display =
                    this.value === 'category' ? 'block' : 'none';
            }
        });
    }

    // Setup usage limit checkboxes
    const globalLimitCheckbox = document.getElementById('global-limit');
    const perUserLimitCheckbox = document.getElementById('per-user-limit');

    if (globalLimitCheckbox) {
        globalLimitCheckbox.addEventListener('change', function() {
            document.getElementById('global-limit-value').disabled = !this.checked;
        });
    }

    if (perUserLimitCheckbox) {
        perUserLimitCheckbox.addEventListener('change', function() {
            document.getElementById('per-user-limit-value').disabled = !this.checked;
        });
    }
});
