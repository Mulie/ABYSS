// Main JavaScript file for common functionality

// Load featured products on home page
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products if on home page
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        loadFeaturedProducts();
    }

    // Load all products if on products page
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        loadAllProducts();
        setupFilters();
        setupSorting();
    }

    // Handle newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
});

// Load featured products (first 4)
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featuredProducts = products.slice(0, 4);
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load all products
function loadAllProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;

    container.innerHTML = products.map(product => createProductCard(product)).join('');
    updateProductCount(products.length);
}

// Setup filters
function setupFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const filterRadios = document.querySelectorAll('.filter-group input[type="radio"]');
    const clearFiltersBtn = document.getElementById('clear-filters');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    filterRadios.forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
}

// Apply filters
function applyFilters() {
    const filters = {
        categories: [],
        priceRange: null,
        minRating: null
    };

    // Get selected categories
    const categoryCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]:checked');
    categoryCheckboxes.forEach(checkbox => {
        const value = checkbox.value;
        if (['electronics', 'fashion', 'home', 'sports'].includes(value)) {
            filters.categories.push(value);
        } else if (value === '4' || value === '3') {
            filters.minRating = parseFloat(value);
        }
    });

    // Get selected price range
    const priceRadio = document.querySelector('.filter-group input[name="price"]:checked');
    if (priceRadio) {
        const value = priceRadio.value;
        if (value === '0-50') {
            filters.priceRange = [0, 50];
        } else if (value === '50-100') {
            filters.priceRange = [50, 100];
        } else if (value === '100-200') {
            filters.priceRange = [100, 200];
        } else if (value === '200+') {
            filters.priceRange = [200, 10000];
        }
    }

    // Filter products
    let filteredProducts = filterProducts(filters);

    // Apply sorting
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        filteredProducts = sortProducts(filteredProducts, sortSelect.value);
    }

    // Display filtered products
    displayProducts(filteredProducts);
}

// Clear filters
function clearFilters() {
    const allInputs = document.querySelectorAll('.filter-group input');
    allInputs.forEach(input => {
        input.checked = false;
    });
    applyFilters();
}

// Setup sorting
function setupSorting() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applyFilters();
        });
    }
}

// Display products
function displayProducts(productList) {
    const container = document.getElementById('products-grid');
    if (!container) return;

    if (productList.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #6b7280; margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p style="color: #6b7280;">Try adjusting your filters</p>
            </div>
        `;
    } else {
        container.innerHTML = productList.map(product => createProductCard(product)).join('');
    }

    updateProductCount(productList.length);
}

// Update product count
function updateProductCount(count) {
    const countElement = document.getElementById('products-count');
    if (countElement) {
        countElement.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
    }
}

// Handle newsletter submit
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (input && input.value) {
        alert('Thank you for subscribing to our newsletter!');
        input.value = '';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#search' && href !== '#user') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
