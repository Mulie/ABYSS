# Unity WebGL Build Guide

This guide explains how to export your ABYSS Unity game as a WebGL build for browsers.

## Prerequisites

- Unity 2018.4 or later (WebGL support)
- Your ABYSS Unity project
- Modern web browser (Chrome, Firefox, Edge recommended)

## Step 1: Configure Unity for WebGL

### 1.1 Switch to WebGL Platform

1. Open your ABYSS project in Unity
2. Go to **File → Build Settings**
3. Select **WebGL** from the platform list
4. Click **Switch Platform** (if not already on WebGL)
5. Wait for Unity to re-import assets

### 1.2 Configure Player Settings

1. In Build Settings, click **Player Settings**
2. Configure these important settings:

**Resolution and Presentation:**
- Default Canvas Width: 1280
- Default Canvas Height: 720
- Run In Background: ✓ (checked)

**Publishing Settings:**
- Compression Format: Gzip (or Brotli for better compression)
- Memory Size: 256 MB (adjust if needed)
- Enable Exceptions: None (for smaller build size)

**Other Settings:**
- Color Space: Linear (for better visuals)
- Auto Graphics API: ✓ (checked)

## Step 2: Optimize for Web

### 2.1 Code Compatibility Issues

**UnityScript (JavaScript) Limitation:**
- UnityScript is deprecated and NOT supported in WebGL builds
- You MUST convert all scripts to C# for WebGL

**Option A: Convert to C# (Recommended)**
See `CONVERT_TO_CSHARP.md` for conversion guide

**Option B: Use the Three.js Web Version**
Use the pure web version in `/web/` folder (already works in browsers)

### 2.2 Reduce Build Size

1. **Disable unused scripts in build:**
   - Remove TestHelper from build scenes (debug only)

2. **Optimize textures:**
   - Lower resolution for web (512x512 max for mobile)

3. **Audio compression:**
   - Convert audio to Vorbis format
   - Lower bitrate to 64-96 kbps

## Step 3: Build for WebGL

### 3.1 Create Build

1. Go to **File → Build Settings**
2. Ensure WebGL is selected
3. Click **Build** (or **Build and Run**)
4. Choose output folder: `Build/WebGL/`
5. Wait for build to complete (may take 5-30 minutes)

### 3.2 Build Output

Your build will create these files:
```
Build/WebGL/
├── index.html          # Main HTML file
├── Build/
│   ├── Build.data.gz   # Game data
│   ├── Build.wasm.gz   # WebAssembly
│   ├── Build.loader.js # Loader script
│   └── Build.framework.js # Unity framework
└── TemplateData/       # Unity template files
```

## Step 4: Test Locally

### 4.1 Run Local Server

**DO NOT** open index.html directly (won't work due to CORS)

**Option A: Unity's Built-in Server**
- Click **Build and Run** in Unity
- Unity automatically starts a local server

**Option B: Python Server**
```bash
cd Build/WebGL
python -m http.server 8000
# Open http://localhost:8000
```

**Option C: Node.js Server**
```bash
cd Build/WebGL
npx http-server -p 8000
# Open http://localhost:8000
```

### 4.2 Test in Browsers

Test in multiple browsers:
- ✓ Chrome/Edge (Chromium)
- ✓ Firefox
- ✓ Safari (Mac only)

## Step 5: Deploy to Web

### Option A: itch.io (Easiest)

1. Create account at https://itch.io
2. Go to "Upload New Project"
3. Set "Kind of project" to "HTML"
4. Upload **entire Build/WebGL folder as ZIP**
5. Check "This file will be played in the browser"
6. Set "index.html" as the main file
7. Publish!

### Option B: GitHub Pages

1. Create new repository: `ABYSS-Game`
2. Upload WebGL build files
3. Go to Settings → Pages
4. Source: Deploy from branch → main → /docs
5. Place build files in `/docs` folder
6. Access at: `https://yourusername.github.io/ABYSS-Game`

### Option C: Netlify (Free)

1. Sign up at https://netlify.com
2. Drag & drop your WebGL build folder
3. Auto-deployed with custom URL
4. Free SSL certificate included

### Option D: Your Own Server

Upload files via FTP to your web server
Ensure server supports:
- Gzip/Brotli compression
- CORS headers for WASM files

## Step 6: Known Issues & Solutions

### Issue: "UnityScript not supported in WebGL"

**Solution:**
You cannot build WebGL with UnityScript. Use the Three.js web version instead (`/web/index.html`)

### Issue: Black screen or won't load

**Solutions:**
- Check browser console for errors
- Ensure files served via HTTP/HTTPS (not file://)
- Check CORS headers on server
- Increase memory size in Player Settings

### Issue: Mobile performance issues

**Solutions:**
- Lower canvas resolution
- Reduce texture quality
- Simplify particle effects
- Use mobile-specific build settings

### Issue: Large download size

**Solutions:**
- Enable Brotli compression (smallest)
- Use Code Stripping (High)
- Disable exception support
- Remove unused assets

## Step 7: Optimize Performance

### 7.1 Loading Screen

Customize the loading screen:
1. Create custom loading HTML template
2. Add progress bar
3. Show game logo/art
4. Display loading tips

### 7.2 Streaming

For large games:
- Enable AssetBundle streaming
- Load levels progressively
- Use addressables system

## Alternative: Use Three.js Web Version

Since Unity WebGL doesn't support UnityScript, we've created a pure web version:

**Location:** `/web/index.html`

**Advantages:**
- No Unity required
- Smaller file size
- Works everywhere
- Easier to modify
- Better mobile performance

**To use:**
1. Open `/web/index.html` in browser
2. Or deploy entire `/web/` folder
3. Fully playable, no build needed!

## Mobile Considerations

### Touch Controls

Add touch controls for mobile:
```javascript
// Add to WebGL template
var canvas = document.querySelector("#unity-canvas");
canvas.addEventListener("touchstart", handleTouch);
canvas.addEventListener("touchmove", handleTouchMove);
```

### Responsive Design

Make canvas responsive:
```html
<style>
  #unity-container {
    width: 100%;
    height: 100vh;
  }
  #unity-canvas {
    width: 100%;
    height: 100%;
  }
</style>
```

## Performance Benchmarks

Expected performance:
- **Desktop (Chrome):** 60 FPS @ 1080p
- **Mobile (Android):** 30-60 FPS @ 720p
- **Tablet (iPad):** 60 FPS @ 1024x768

## Resources

- [Unity WebGL Documentation](https://docs.unity3d.com/Manual/webgl.html)
- [WebGL Build Size Optimization](https://docs.unity3d.com/Manual/webgl-building.html)
- [UnityScript Deprecation Notice](https://blogs.unity3d.com/2017/08/11/unityscript-deprecation/)

## Next Steps

Since UnityScript isn't supported in WebGL builds:

1. **Use the Three.js web version** (recommended, already done!)
2. **Or convert Unity scripts to C#** (see CONVERT_TO_CSHARP.md)

The Three.js version is in `/web/` and ready to deploy! 🎮
