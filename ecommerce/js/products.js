// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        rating: 4.5,
        reviews: 234,
        description: "Premium wireless headphones with noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
        image: null,
        icon: "fa-headphones"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 199.99,
        rating: 4.8,
        reviews: 567,
        description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance up to 50m.",
        image: null,
        icon: "fa-watch"
    },
    {
        id: 3,
        name: "Casual Denim Jacket",
        category: "fashion",
        price: 59.99,
        rating: 4.3,
        reviews: 189,
        description: "Classic denim jacket with a modern fit. Made from premium cotton for comfort and durability. Available in multiple sizes.",
        image: null,
        icon: "fa-vest"
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        category: "fashion",
        price: 89.99,
        rating: 4.6,
        reviews: 342,
        description: "Elegant leather crossbody bag with multiple compartments. Perfect for daily use and special occasions.",
        image: null,
        icon: "fa-bag-shopping"
    },
    {
        id: 5,
        name: "Modern Table Lamp",
        category: "home",
        price: 45.99,
        rating: 4.4,
        reviews: 156,
        description: "Contemporary table lamp with adjustable brightness and USB charging port. Ideal for bedrooms and offices.",
        image: null,
        icon: "fa-lamp"
    },
    {
        id: 6,
        name: "Decorative Throw Pillows Set",
        category: "home",
        price: 34.99,
        rating: 4.7,
        reviews: 289,
        description: "Set of 4 decorative throw pillows with removable covers. Made from soft, durable fabric in stylish designs.",
        image: null,
        icon: "fa-couch"
    },
    {
        id: 7,
        name: "Yoga Mat Premium",
        category: "sports",
        price: 39.99,
        rating: 4.9,
        reviews: 678,
        description: "Extra thick yoga mat with non-slip surface and carrying strap. Perfect for yoga, pilates, and fitness exercises.",
        image: null,
        icon: "fa-person-running"
    },
    {
        id: 8,
        name: "Adjustable Dumbbells Set",
        category: "sports",
        price: 149.99,
        rating: 4.8,
        reviews: 423,
        description: "Space-saving adjustable dumbbell set with weight range from 5 to 52.5 lbs. Includes storage tray.",
        image: null,
        icon: "fa-dumbbell"
    },
    {
        id: 9,
        name: "4K Ultra HD Webcam",
        category: "electronics",
        price: 129.99,
        rating: 4.6,
        reviews: 512,
        description: "Professional 4K webcam with auto-focus, built-in microphone, and low-light correction. Perfect for streaming and video calls.",
        image: null,
        icon: "fa-camera"
    },
    {
        id: 10,
        name: "Wireless Charging Pad",
        category: "electronics",
        price: 29.99,
        rating: 4.4,
        reviews: 234,
        description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
        image: null,
        icon: "fa-bolt"
    },
    {
        id: 11,
        name: "Designer Sunglasses",
        category: "fashion",
        price: 119.99,
        rating: 4.7,
        reviews: 298,
        description: "Premium UV protection sunglasses with polarized lenses. Stylish design suitable for any occasion.",
        image: null,
        icon: "fa-glasses"
    },
    {
        id: 12,
        name: "Running Shoes Pro",
        category: "sports",
        price: 129.99,
        rating: 4.8,
        reviews: 845,
        description: "Lightweight running shoes with advanced cushioning technology and breathable mesh upper. Perfect for marathon training.",
        image: null,
        icon: "fa-shoe-prints"
    }
];

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}">` : `<i class="fas ${product.icon}"></i>`}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="quick-view" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
    if (!category || category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Sort products
function sortProducts(productList, sortBy) {
    const sorted = [...productList];

    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// Filter products
function filterProducts(filters) {
    let filtered = [...products];

    // Filter by category
    if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter(product =>
            filters.categories.includes(product.category)
        );
    }

    // Filter by price range
    if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        filtered = filtered.filter(product =>
            product.price >= min && (max ? product.price <= max : true)
        );
    }

    // Filter by rating
    if (filters.minRating) {
        filtered = filtered.filter(product =>
            product.rating >= filters.minRating
        );
    }

    return filtered;
}

// View product details
function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        getProductById,
        getProductsByCategory,
        sortProducts,
        filterProducts,
        generateStars,
        createProductCard
    };
}
