# Web Deployment Guide for ABYSS

Complete guide to deploying your ABYSS web game to various hosting platforms.

## Quick Comparison

| Platform | Difficulty | Cost | Speed | Best For |
|----------|------------|------|-------|----------|
| **GitHub Pages** | Easy | Free | Fast | Open source projects |
| **Netlify** | Easiest | Free | Very Fast | Quick deploys |
| **Vercel** | Easy | Free | Very Fast | Developers |
| **itch.io** | Very Easy | Free | Medium | Game distribution |
| **Cloudflare Pages** | Medium | Free | Very Fast | Advanced users |

## Option 1: GitHub Pages (Recommended)

### Prerequisites
- GitHub account
- Git installed
- ABYSS repository on GitHub

### Steps

1. **Prepare your repository:**
   ```bash
   cd /path/to/ABYSS
   git add web/
   git commit -m "Add web version"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source": select **Deploy from branch**
   - Branch: **main** → Folder: **/web** (or root if you moved files)
   - Click **Save**

3. **Wait for deployment** (usually 1-2 minutes)

4. **Access your game:**
   - URL will be: `https://yourusername.github.io/ABYSS/web/`
   - GitHub shows the URL at the top of Pages settings

### Custom Domain (Optional)

1. Buy domain (e.g., `abyss-game.com`)
2. Add CNAME record pointing to `yourusername.github.io`
3. In repository, add file `/web/CNAME` containing your domain
4. Wait for DNS propagation (up to 24 hours)

### Pros & Cons

✅ **Pros:**
- Completely free
- Custom domain support
- HTTPS included
- Version control integrated
- Easy updates (just git push)

❌ **Cons:**
- Public repositories only (for free)
- Limited to static sites
- 1GB size limit
- 100GB/month bandwidth

---

## Option 2: Netlify (Easiest)

### Method A: Drag & Drop (No Git)

1. **Visit** [netlify.com](https://netlify.com)
2. **Sign up** for free account
3. **Drag & drop** your `/web` folder onto dashboard
4. **Done!** Your site is live instantly

Auto-generated URL: `random-name-12345.netlify.app`

### Method B: GitHub Integration (Recommended)

1. **Sign up** at [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import from Git"**
3. **Connect GitHub** and select your ABYSS repository
4. **Configure:**
   - Base directory: `web`
   - Build command: (leave empty)
   - Publish directory: `/` or `web`
5. Click **"Deploy"**

### Custom Domain on Netlify

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow DNS instructions
4. Free HTTPS certificate auto-generated

### Pros & Cons

✅ **Pros:**
- Instant deployments
- Excellent UI
- Custom domains + free SSL
- Forms support
- Serverless functions available
- 100GB/month bandwidth (free tier)
- Auto-deploys from Git

❌ **Cons:**
- Limited build minutes (300/month free)
- Requires account

---

## Option 3: Vercel

### Setup

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import** your GitHub repository
3. **Configure:**
   - Framework Preset: Other
   - Root Directory: `web`
   - Build Command: (leave empty)
   - Output Directory: `./`
4. **Deploy**

### Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from terminal
cd web/
vercel

# Follow prompts
# Your site is deployed!
```

### Pros & Cons

✅ **Pros:**
- Lightning fast CDN
- Zero-config deployments
- Automatic HTTPS
- Preview deployments
- Edge functions support
- Excellent developer experience

❌ **Cons:**
- 100GB bandwidth/month (free)
- Commercial use restrictions on free tier

---

## Option 4: itch.io (For Gamers)

### Setup

1. **Sign up** at [itch.io](https://itch.io)
2. **Create new project**:
   - Go to Dashboard → Create new project
   - Fill in details (name, description, screenshots)
3. **Upload HTML5 game:**
   - Kind of project: **HTML**
   - Upload: ZIP entire `/web` folder
   - Check: **"This file will be played in the browser"**
   - Select `index.html` as main file
4. **Configure:**
   - Set viewport dimensions (1280x720 recommended)
   - Embed options (fullscreen recommended)
5. **Publish**

### Custom Pricing

- Free to play
- Pay what you want
- Fixed price
- Or keep it private

### Pros & Cons

✅ **Pros:**
- Gaming community
- Easy monetization
- Analytics included
- Download + web version
- Comments & ratings
- No bandwidth limits

❌ **Cons:**
- Takes 10% of sales (if paid)
- Slower than modern CDNs
- Limited customization

---

## Option 5: Cloudflare Pages

### Setup

1. **Sign up** at [cloudflare.com](https://cloudflare.com)
2. Go to **Pages** → **Create a project**
3. **Connect Git** (GitHub/GitLab)
4. **Configure:**
   - Build directory: `web`
   - Build command: (none)
   - Output: `/`
5. **Deploy**

### Pros & Cons

✅ **Pros:**
- Cloudflare's global CDN (fastest)
- Unlimited bandwidth
- Unlimited sites
- Web Analytics included
- Workers integration

❌ **Cons:**
- Steeper learning curve
- More complex interface

---

## Option 6: Your Own Server

### Requirements
- Web server (Apache, Nginx, Caddy)
- SSH access
- Domain name (optional)

### Apache Setup

1. **Upload files:**
   ```bash
   scp -r web/* user@yourserver.com:/var/www/html/abyss/
   ```

2. **Configure Apache:**
   ```apache
   <VirtualHost *:80>
       ServerName abyss-game.com
       DocumentRoot /var/www/html/abyss

       <Directory /var/www/html/abyss>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. **Enable site:**
   ```bash
   sudo a2ensite abyss
   sudo systemctl reload apache2
   ```

### Nginx Setup

1. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name abyss-game.com;
       root /var/www/html/abyss;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }

       # Gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript;
   }
   ```

2. **Reload Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Add HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d abyss-game.com
```

### Pros & Cons

✅ **Pros:**
- Full control
- No limits
- Custom configuration
- Can add backend features

❌ **Cons:**
- Requires technical knowledge
- Server costs ($5-20/month)
- Maintenance required
- Security management

---

## Testing Your Deployment

### Before Deploying

1. **Test locally:**
   ```bash
   cd web/
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

2. **Check all features:**
   - Movement (WASD)
   - Hope system
   - Safe zones
   - Enemies
   - Death spheres
   - Scoring
   - Game over/restart

3. **Test browsers:**
   - Chrome
   - Firefox
   - Safari
   - Edge
   - Mobile browsers

### After Deploying

1. **Open developer console** (F12)
2. **Check for errors**
3. **Test all game mechanics**
4. **Verify high score persistence**
5. **Test on mobile device**

---

## Optimization for Production

### Enable Compression

Most platforms auto-enable, but for custom servers:

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/javascript application/json;
gzip_min_length 1000;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript
</IfModule>
```

### Add Caching Headers

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Minify Files (Optional)

```bash
# Install terser for JS minification
npm install -g terser

# Minify game.js
terser game.js -o game.min.js -c -m

# Update index.html to use game.min.js
```

### CDN for Three.js

Already using CDN in index.html:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

---

## Analytics (Optional)

### Google Analytics

Add before `</head>` in index.html:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Privacy-Friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Troubleshooting Deployment

### Files Won't Load (404)

**Problem:** JavaScript/CSS not loading

**Solution:**
- Check file paths are relative
- Ensure files uploaded correctly
- Check web server directory structure

### Game Loads But Won't Start

**Problem:** Black screen or frozen

**Solution:**
- Check browser console (F12)
- Verify Three.js CDN is accessible
- Test on different browser
- Clear cache (Ctrl+Shift+R)

### CORS Errors

**Problem:** "Cross-origin request blocked"

**Solution:**
- Don't open via `file://` protocol
- Must serve via HTTP/HTTPS
- Use local server for testing

### Mobile Not Working

**Problem:** Game doesn't load on phone

**Solution:**
- Ensure HTTPS (required for mobile)
- Check viewport meta tag
- Test on different mobile browser
- Add touch controls (future update)

---

## Continuous Deployment

### GitHub Actions (Auto-deploy to GitHub Pages)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web
```

---

## Next Steps

1. ✅ **Deploy** using chosen platform
2. ✅ **Test** thoroughly
3. ✅ **Share** your game link!
4. ✅ **Gather** player feedback
5. ✅ **Iterate** and improve

## Need Help?

- GitHub Pages: [docs.github.com/pages](https://docs.github.com/pages)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- itch.io: [itch.io/docs](https://itch.io/docs)

Happy deploying! 🚀
