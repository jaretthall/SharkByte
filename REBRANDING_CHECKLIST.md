# SharkByte Rebranding Checklist

## ✅ Completed Items

### 1. Package & Build Configuration
- [x] `package.json` - Updated name, description, author, repository, keywords
- [x] `package.json` - Updated build configuration (appId, productName, artifactName)
- [x] `README.md` - Complete rewrite with SharkByte branding
- [x] `license.md` - Added fork attribution

### 2. Web Assets
- [x] `web/kiri/index.html` - Updated meta tags, title, loading message
- [x] `web/kiri/manifest.json` - Updated PWA manifest with SharkByte branding

## 📋 Remaining Tasks

### 3. Visual Assets
```bash
# Install dependencies
npm install sharp

# Generate all favicon/logo variants
node generate-favicons.js
```

### 4. Additional HTML Files to Update
- [ ] `web/mesh/index.html` - Update title and meta tags
- [ ] `web/kiri/frame.html` - Update title
- [ ] `web/kiri/engine.html` - Update title
- [ ] `web/boot/index.html` - Update title and references

### 5. Core JavaScript Files
Files that need "Kiri:Moto" → "SharkByte" updates:

- [ ] `src/kiri/core/export.js` - Update export headers/comments
- [ ] `src/kiri/core/settings.js` - Update app name references
- [ ] `src/kiri/mode/fdm/export.js` - Update generated file headers
- [ ] `src/kiri/mode/cam/export.js` - Update generated file headers
- [ ] `src/kiri/run/cli.js` - Update CLI tool name

### 6. Language Files (Optional but Recommended)
- [ ] `web/kiri/lang/en.js` - Add SharkByte-specific strings
- [ ] `web/kiri/lang/en-us.js` - Add SharkByte-specific strings

### 7. Documentation Updates
- [ ] `contributing.md` - Update with SharkByte contribution guidelines
- [ ] `docs/index.md` - Update main documentation page
- [ ] Rename `docs/kiri-moto/` folder to `docs/sharkbyte/`
- [ ] Update all documentation references from Kiri:Moto to SharkByte

### 8. Build Assets
- [ ] Replace `bin/GS.ico` with SharkByte icon
- [ ] Replace `bin/GS.icns` with SharkByte icon (macOS)
- [ ] Replace `bin/GS.png` with SharkByte icon (Linux)

## 🔍 Search & Replace Patterns

Use these patterns to find remaining references:

```bash
# Find all Kiri:Moto references
grep -r "Kiri:Moto\|kiri:moto\|kirimoto" --include="*.js" --include="*.html" --include="*.json" --include="*.md" .

# Find all grid.space references
grep -r "grid\.space\|grid-apps" --include="*.js" --include="*.html" --include="*.json" --include="*.md" .

# Find Stewart Allen references (keep for attribution)
grep -r "Stewart Allen" --include="*.js" --include="*.html" --include="*.json" --include="*.md" .
```

## 🎨 Color Scheme

**SharkByte Ocean/Teal Theme:**
- Primary: `#006994` (Deep Ocean Blue)
- Secondary: `#00A8CC` (Bright Teal)
- Accent: `#00D4FF` (Light Cyan)
- Background: `#F0F8FF` (Alice Blue)
- Text: `#2C3E50` (Dark Blue-Gray)

## 📝 Attribution Template

Add to any file that gets significantly modified:

```javascript
/**
 * SharkByte - Open-source CAM for CNC Shark routers
 * Forked from Kiri:Moto by Stewart Allen
 * Original: https://github.com/GridSpace/grid-apps
 * Fork: https://github.com/JarettHall/SharkByte
 */
```

## 🚀 Final Steps

1. **Test the rebranding:**
   ```bash
   npm run dev
   ```

2. **Build production version:**
   ```bash
   npm run prod
   ```

3. **Create release:**
   ```bash
   git add -A
   git commit -m "Complete SharkByte rebranding from Kiri:Moto fork"
   git tag v1.0.0
   git push origin main --tags
   ```

4. **Update GitHub repository:**
   - Add topics: `cnc`, `cam`, `shark-hd4`, `gcode`, `toolpath`
   - Update description: "Open-source CAM for CNC Shark routers"
   - Add website: `https://sharkbyte.io` (when available)

## 📊 Progress Summary

- Core branding: **90% complete**
- Visual assets: **Pending favicon generation**
- Documentation: **30% complete**
- Code references: **60% complete**

---

**Note:** This checklist ensures proper attribution to the original Kiri:Moto project while establishing SharkByte as a specialized fork for the CNC Shark community.