// Product detail page functionality

document.addEventListener('DOMContentLoaded', function() {
    loadProductDetail();
    loadRelatedProducts();
});

// Load product detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        window.location.href = 'products.html';
        return;
    }

    const product = getProductById(productId);
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    // Update breadcrumb
    const breadcrumb = document.getElementById('product-breadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }

    // Update page title
    document.title = `${product.name} - Liyu Shop`;

    // Render product detail
    const container = document.getElementById('product-detail-content');
    if (container) {
        container.innerHTML = `
            <div class="product-detail-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}">` : `<i class="fas ${product.icon}"></i>`}
            </div>
            <div class="product-detail-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h1>${product.name}</h1>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <div class="quantity-controls">
                        <button type="button" onclick="decreaseQuantity()">-</button>
                        <input type="number" id="quantity-input" value="1" min="1" max="10">
                        <button type="button" onclick="increaseQuantity()">+</button>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addProductToCart()">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="buyNow()">
                        Buy Now
                    </button>
                </div>
                <div class="product-features" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
                    <h3 style="margin-bottom: 1rem;">Product Features</h3>
                    <ul style="list-style: disc; margin-left: 1.5rem; color: #6b7280;">
                        <li>High quality materials</li>
                        <li>30-day return policy</li>
                        <li>Free shipping on orders over $50</li>
                        <li>1-year warranty included</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

// Load related products
function loadRelatedProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = getProductById(productId);

    if (!product) return;

    // Get products from same category, excluding current product
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const container = document.getElementById('related-products');
    if (container && relatedProducts.length > 0) {
        container.innerHTML = relatedProducts.map(p => createProductCard(p)).join('');
    }
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('quantity-input');
    if (input) {
        const currentValue = parseInt(input.value);
        if (currentValue < 10) {
            input.value = currentValue + 1;
        }
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity-input');
    if (input) {
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    }
}

// Add product to cart
function addProductToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const quantityInput = document.getElementById('quantity-input');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    addToCart(productId, quantity);
}

// Buy now
function buyNow() {
    addProductToCart();
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}
