# Liyu Shop - E-Commerce Website

A modern, fully functional e-commerce website built with HTML, CSS, and JavaScript. This project features a complete shopping experience including product browsing, cart management, and checkout functionality.

## Features

### Core Functionality
- **Product Catalog**: Browse through a variety of products across different categories
- **Product Search & Filter**: Filter products by category, price range, and ratings
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add, remove, and update product quantities
- **Checkout Process**: Complete order with shipping and payment information
- **Responsive Design**: Fully responsive layout that works on all devices

### User Experience
- **Intuitive Navigation**: Easy-to-use header with category links
- **Product Categories**: Electronics, Fashion, Home & Living, Sports
- **Real-time Cart Updates**: Cart count updates instantly
- **Product Ratings**: Star ratings and review counts for each product
- **Cart Persistence**: Shopping cart data saved in localStorage
- **Notifications**: Visual feedback when adding items to cart

### Design Features
- **Modern UI**: Clean, professional design with smooth animations
- **Color Scheme**: Blue and orange accent colors for a vibrant look
- **Icons**: Font Awesome icons throughout the interface
- **Cards & Shadows**: Elegant card designs with hover effects
- **Responsive Grid**: Products displayed in adaptive grid layouts

## Project Structure

```
ecommerce/
├── index.html              # Home page
├── products.html           # Products listing page
├── product-detail.html     # Individual product page
├── cart.html               # Shopping cart page
├── checkout.html           # Checkout page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── products.js        # Product data and utilities
│   ├── cart.js            # Shopping cart functionality
│   ├── main.js            # Common functionality
│   ├── product-detail.js  # Product detail page logic
│   ├── cart-page.js       # Cart page functionality
│   └── checkout.js        # Checkout page logic
├── images/                # Product images directory
│   └── placeholder.txt    # Image guidelines
├── assets/                # Brand assets and resources
│   └── logo.txt           # Assets information
└── README.md             # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome 6.4**: Icon library
- **localStorage API**: Cart data persistence

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce
```

2. Open the project:
Simply open `index.html` in your web browser. No build process or dependencies required!

### Opening the Website

- **Option 1**: Double-click `index.html` to open in your default browser
- **Option 2**: Right-click `index.html` and choose "Open with" your preferred browser
- **Option 3**: Use a local development server (recommended for best experience)

### Using a Local Server (Recommended)

#### Python 3:
```bash
python -m http.server 8000
```

#### Node.js (http-server):
```bash
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

### Browsing Products

1. **Home Page**: View featured products and categories
2. **Products Page**: Browse all products with filtering options
3. **Filters**: Use sidebar filters to narrow down products by:
   - Category (Electronics, Fashion, Home, Sports)
   - Price range
   - Customer ratings
4. **Sorting**: Sort products by price, name, or featured status

### Shopping Cart

1. **Add to Cart**: Click "Add to Cart" button on any product
2. **View Cart**: Click the cart icon in the header
3. **Update Quantity**: Use +/- buttons to adjust quantities
4. **Remove Items**: Click the trash icon to remove items
5. **Cart Persistence**: Your cart is saved automatically

### Checkout

1. **Navigate to Checkout**: Click "Proceed to Checkout" from cart page
2. **Enter Information**: Fill in shipping and contact details
3. **Select Shipping**: Choose from Standard, Express, or Overnight
4. **Payment**: Enter payment information
5. **Complete Order**: Submit to complete the purchase

## Customization

### Adding Products

Edit `js/products.js` and add new product objects:

```javascript
{
    id: 13,
    name: "Your Product Name",
    category: "electronics", // or fashion, home, sports
    price: 99.99,
    rating: 4.5,
    reviews: 123,
    description: "Product description here",
    image: "images/your-product.jpg", // or null for icon
    icon: "fa-your-icon" // Font Awesome icon class
}
```

### Styling Changes

Modify `css/style.css` to customize:
- **Colors**: Update CSS variables in `:root`
- **Fonts**: Change font-family properties
- **Spacing**: Adjust padding and margins
- **Layout**: Modify grid and flexbox properties

### Color Theme

```css
:root {
    --primary-color: #2563eb;     /* Main brand color */
    --secondary-color: #1e40af;   /* Darker shade */
    --accent-color: #f59e0b;      /* Accent color */
    --text-color: #1f2937;        /* Text color */
    --text-light: #6b7280;        /* Secondary text */
}
```

## Features in Detail

### Product Management
- 12 sample products across 4 categories
- Product ratings and review counts
- Detailed product descriptions
- Related products section

### Shopping Cart
- Add multiple items
- Update quantities (1-10 per item)
- Remove individual items
- Clear entire cart
- Real-time price calculations
- Free shipping on orders over $50

### Checkout System
- Contact information form
- Shipping address fields
- Multiple shipping options with pricing
- Payment method selection
- Order summary
- Tax calculation (8%)
- Form validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Mobile Responsive

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## Future Enhancements

Potential features to add:
- User authentication and accounts
- Product search functionality
- Wishlist feature
- Order history
- Product reviews and ratings system
- Backend integration with database
- Payment gateway integration
- Email notifications
- Admin panel for product management
- Advanced filtering options
- Product image galleries
- Discount codes and promotions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Created by Liyu

## Acknowledgments

- Font Awesome for the icon library
- Inspiration from modern e-commerce websites
- Built with vanilla JavaScript (no frameworks required)

## Support

For questions or issues, please open an issue on GitHub.

---

**Enjoy building your e-commerce store!**
