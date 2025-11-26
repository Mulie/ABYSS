# LIYU.ca E-Commerce Platform
# Deployment Instructions for Netlify

## Project Type
This is a **static HTML/CSS/JavaScript website**. No build process or npm is required.

## Netlify Configuration

### Option 1: Using netlify.toml (Recommended)
The `netlify.toml` file at the repository root configures Netlify automatically:
- **Build Command**: None (static site)
- **Publish Directory**: `ecommerce`
- **No package.json needed**

### Option 2: Manual Netlify Configuration
If you prefer to configure via Netlify UI:

1. **Site Settings** → **Build & Deploy** → **Build Settings**
2. Set the following:
   - **Base directory**: (leave empty)
   - **Build command**: (leave empty)
   - **Publish directory**: `ecommerce`
   - **Node version**: Not required (can ignore)

## Deployment Steps

### Initial Setup
1. Connect your GitHub repository to Netlify
2. Select branch: `claude/create-ecommerce-project-01Cevz1nVQP8kRpxWSTYrCUp`
3. Netlify will auto-detect the `netlify.toml` configuration
4. Click "Deploy site"

### Manual Deploy (if needed)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from repository root
netlify deploy --prod --dir=ecommerce
```

## Site Structure After Deployment

```
https://your-site.netlify.app/
├── index.html              # Home page
├── products.html           # Product listing
├── product-detail.html     # Product details
├── cart.html              # Shopping cart
├── checkout.html          # Checkout
├── admin/
│   ├── login.html         # Admin login
│   ├── dashboard.html     # Dashboard
│   ├── inventory.html     # Inventory management
│   ├── pricing.html       # Price management
│   ├── promotions.html    # Promotions
│   └── audit-logs.html    # Audit logs
├── css/                   # Stylesheets
├── js/                    # JavaScript files
├── images/               # Product images
└── assets/               # Brand assets
```

## Access URLs

After deployment:
- **Storefront**: `https://your-site.netlify.app/`
- **Admin Portal**: `https://your-site.netlify.app/admin/`

## Demo Credentials

Admin Portal Login:
- **Email**: admin@liyu.ca
- **Password**: admin123
- **Role**: Super Admin (MFA enabled - any 6-digit code works in demo)

Alternative accounts:
- merchandiser@liyu.ca / merch123 (Merchandiser role)
- marketing@liyu.ca / market123 (Marketing role)

## Environment Variables (Optional)

If you need to configure API endpoints for backend integration:

1. Go to **Site Settings** → **Environment Variables**
2. Add:
   - `API_URL`: Your backend API URL
   - `ENVIRONMENT`: `production`

## Security Considerations

The `netlify.toml` includes:
- Security headers (X-Frame-Options, CSP, etc.)
- HTTPS enforcement for admin portal
- Asset caching for performance
- Clean URL redirects

## Troubleshooting

### Issue: Build fails with npm errors
**Solution**: This is a static site - no npm needed
- Ensure Build Command is empty
- Ensure Publish Directory is `ecommerce`
- Check that `netlify.toml` is at repository root

### Issue: 404 errors
**Solution**: Check publish directory
- Verify `ecommerce` folder exists
- Verify HTML files are in `ecommerce` directory

### Issue: Admin portal not accessible
**Solution**: Check redirects
- URL should be `/admin/` or `/admin/login.html`
- Verify admin files are in `ecommerce/admin/` directory

## Performance

Expected Lighthouse scores:
- **Performance**: 95-100
- **Accessibility**: 90-100
- **Best Practices**: 95-100
- **SEO**: 90-100

Core Web Vitals:
- **LCP**: < 1.8s
- **INP**: < 144ms
- **CLS**: < 0.045

## Custom Domain (Optional)

To add a custom domain:
1. Go to **Site Settings** → **Domain Management**
2. Click **Add custom domain**
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Netlify)

## Monitoring

Netlify provides:
- Deploy logs and history
- Analytics (with paid plan)
- Form submissions tracking
- Function logs (not used in this project)

For production monitoring, consider:
- Google Analytics
- Sentry for error tracking
- Datadog for performance monitoring

## Next Steps

1. **Deploy the site** using this configuration
2. **Test all pages** after deployment
3. **Configure custom domain** (optional)
4. **Set up backend API** (when ready)
5. **Enable monitoring** for production

## Support

For deployment issues:
- Check Netlify deploy logs
- Verify `netlify.toml` configuration
- Ensure all files are committed to git
- Contact: tech@liyu.ca

---

**Project Type**: Static HTML/CSS/JavaScript
**No Build Required**: Direct deployment
**Instant Updates**: Push to git = auto-deploy
