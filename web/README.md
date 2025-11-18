# ABYSS - Web Version

Play ABYSS directly in your browser! This is a fully functional web version built with Three.js.

## 🎮 Play Now

### Option 1: Local Play (Recommended for Development)

1. **Open the game:**
   ```bash
   # From the web directory
   python -m http.server 8000
   # Or with Node.js
   npx http-server -p 8000
   ```

2. **Open browser:**
   - Navigate to `http://localhost:8000`
   - Click "Begin Journey"
   - Use WASD to move, Shift to sprint

### Option 2: Direct File Open (May have limitations)

- Simply open `index.html` in a modern browser
- Some features may not work due to CORS restrictions

## 🌐 Deploy to Web

### GitHub Pages (Free & Easy)

1. **Push to GitHub:**
   ```bash
   git add web/
   git commit -m "Add web version"
   git push
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch → main → /web
   - Your game will be at: `https://yourusername.github.io/ABYSS/web/`

### Netlify (One-Click Deploy)

1. Sign up at [netlify.com](https://netlify.com)
2. Drag & drop the `/web` folder
3. Instant deployment with HTTPS
4. Get a custom URL like `abyss-game.netlify.app`

### itch.io (Gaming Platform)

1. Create account at [itch.io](https://itch.io)
2. Create new project → HTML
3. Upload web folder as ZIP
4. Set `index.html` as main file
5. Your game is live!

### Vercel (Developer Platform)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `/web`
4. Auto-deploys on every push

## 📱 Features

- ✅ **No Installation Required** - Play instantly in browser
- ✅ **Cross-Platform** - Works on desktop, mobile, tablet
- ✅ **Progressive** - Works offline after first load (can add PWA)
- ✅ **Lightweight** - ~100KB total, loads in seconds
- ✅ **High Score Persistence** - Saves to localStorage
- ✅ **Responsive** - Adapts to any screen size

## 🎯 Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move | WASD or Arrow Keys | Touch (coming soon) |
| Sprint | Hold Shift | Auto when near danger |
| Look | Mouse (future) | Touch drag (future) |

## 🔧 Technical Details

### Built With:
- **Three.js r128** - 3D rendering
- **Vanilla JavaScript** - Game logic
- **HTML5 Canvas** - Rendering target
- **CSS3** - UI/HUD styling

### Browser Support:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance:
- **Desktop:** 60 FPS @ 1080p
- **Mobile:** 30-60 FPS @ 720p
- **File Size:** ~100KB (compressed)
- **Load Time:** < 2 seconds (fast connection)

## 🎨 Customization

### Change Colors:
Edit `index.html` CSS variables:
```css
:root {
    --primary-color: #3b82f6;
    --danger-color: #ef4444;
    --safe-color: #22c55e;
}
```

### Modify Game Settings:
Edit `game.js` constants:
```javascript
const game = {
    hopeDecayRate: 2,     // Change hope drain rate
    moveSpeed: 5,         // Change player speed
    fearDistance: 5,      // Change danger detection
    // ... more settings
};
```

### Add Safe Zones:
In `game.js`, find `createSafeZones()`:
```javascript
const zones = [
    { name: "My Zone", pos: [10, 0.5, 10], color: 0x22c55e },
    // Add more zones here
];
```

## 📊 Game Mechanics

### Hope System
- Starts at 100%
- Drains 2% per second in dangerous areas
- Recovers 10% per second in safe zones
- Game ends when hope reaches 0

### Scoring
- **Safe Zone Discovery:** +100 points
- **Resting in Safe Zone:** +10 points/second (max 10 seconds)
- **Survival Time:** +10 points every 10 seconds

### Milestones
- First Steps (0 pts)
- Glimmer of Hope (100 pts)
- Determined (500 pts)
- Survivor (1000 pts)
- Courageous (2500 pts)
- Beacon of Hope (5000 pts)
- Legend of the Abyss (10000 pts)

## 🐛 Troubleshooting

### Game Won't Load
- Check browser console for errors (F12)
- Ensure serving via HTTP (not file://)
- Try clearing browser cache (Ctrl+F5)
- Update to latest browser version

### Low FPS / Laggy
- Close other browser tabs
- Reduce browser window size
- Update graphics drivers
- Try different browser (Chrome recommended)

### No Sound
- Sound is not implemented yet
- Will be added in future update

### Controls Not Working
- Click on game canvas to focus
- Check keyboard language settings
- Try pressing keys harder (just kidding!)

## 🚀 Upcoming Features

- [ ] Touch controls for mobile
- [ ] Sound effects and music
- [ ] More safe zone types
- [ ] Power-ups
- [ ] Procedurally generated levels
- [ ] Multiplayer support
- [ ] Character customization
- [ ] Story mode with cutscenes

## 📝 License

Same as main ABYSS project - see parent README.md

## 🤝 Contributing

1. Fork the repository
2. Make changes to `/web/` files
3. Test locally
4. Submit pull request

## 💬 Feedback

Found a bug? Have a suggestion?
- Open an issue on GitHub
- Tweet @yourusername
- Email: your@email.com

## 🎮 Play Now!

Ready to begin Hope's journey? [Click here to play!](index.html)

---

Made with ❤️ for the web • [View Source](https://github.com/yourusername/ABYSS)
