# CNC Shark HD4 - Quick Start Guide

## 🚀 Getting Started (3 Steps)

### 1. Start the Server
```powershell
npm run dev
```

### 2. Open in Browser
Navigate to: `http://localhost:8080/kiri`

### 3. Select Your Device
1. Switch to **CAM** mode (top-left dropdown)
2. Click **Setup**
3. Select **"CNC.Shark.HD4"** from device dropdown

## 📋 Machine Specs at a Glance

| Setting | Value |
|---------|-------|
| Work Area | 25" × 25" × 7" (635 × 635 × 178mm) |
| Output File | `.tap` extension |
| Units | Inches (G20) |
| Controller | GRBL-based |
| Max RPM | 27,000 |
| Arc Support | ✅ Enabled |
| Tool Changes | ⚠️ Manual (M0 pause) |
| Origin | Lower-left corner |

## 🔧 Modified Files

1. **NEW**: `src/kiri/dev/cam/CNC.Shark.HD4.json` - Your device profile
2. **UPDATED**: `src/pack/kiri-devs.js` - Compiled device database (auto-generated)
3. **DOCS**: `SHARK_HD4_SETUP.md` - Complete documentation

## ⚡ Quick Commands

### Regenerate Devices After Editing JSON
```powershell
node -e "const fs=require('fs'),PATH=require('path');let root=PATH.join('.','src','kiri','dev'),devs={};fs.readdirSync(root).forEach(type=>{let map=devs[type]=devs[type]||{};fs.readdirSync(PATH.join(root,type)).forEach(device=>{let deviceName=device.endsWith('.json')?device.substring(0,device.length-5):device;map[deviceName]=JSON.parse(fs.readFileSync(PATH.join(root,type,device)));});});fs.writeFileSync(PATH.join('.','src','pack','kiri-devs.js'),\`export const devices = \${JSON.stringify(devs)};\`);console.log('✓ Devices regenerated');"
```

### Verify Device is Loaded
```powershell
node -e "console.log(require('./src/pack/kiri-devs.js').devices.cam['CNC.Shark.HD4'] ? '✓ Shark HD4 found!' : '✗ Not found');"
```

## 📝 Sample G-Code Output

```gcode
G20 ; set units to INCHES
G90 ; absolute position mode
G17 ; XY plane selection for arcs
M3 S18000 ; start spindle at 18000 RPM
; ...your tool paths here...
G0 Z0.5 ; raise Z to safe height
M5 ; spindle off
G0 X0 Y0 ; return to origin
M30 ; program end
```

## 🎯 Common Feed Rates & Speeds

### Softwood (Pine, Spruce)
- **Spindle**: 12,000-16,000 RPM
- **Feed Rate**: 60-100 IPM
- **Plunge Rate**: 30-50 IPM

### Hardwood (Oak, Maple)
- **Spindle**: 18,000-22,000 RPM
- **Feed Rate**: 40-80 IPM
- **Plunge Rate**: 20-40 IPM

### MDF / Plywood
- **Spindle**: 16,000-20,000 RPM
- **Feed Rate**: 80-120 IPM
- **Plunge Rate**: 40-60 IPM

### Acrylic / HDPE
- **Spindle**: 12,000-16,000 RPM
- **Feed Rate**: 40-60 IPM
- **Plunge Rate**: 20-30 IPM

## ⚠️ Safety Checklist

- [ ] Work is securely clamped
- [ ] Z-axis zeroed with touch plate
- [ ] Spindle direction correct (clockwise when facing spindle)
- [ ] Emergency stop tested
- [ ] Safety glasses on
- [ ] Keep hands away from bit
- [ ] Dust collection running

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Device not in list | Regenerate devices, restart server |
| Wrong file extension | Check `"file-ext": "tap"` in JSON |
| Arc errors | Set `"arc_enabled": false` |
| Units wrong | Check G20 (inches) vs G21 (mm) |
| Tool change fails | Machine pauses at M0, resume on pendant |

## 📚 Full Documentation

See **SHARK_HD4_SETUP.md** for complete details, customization options, and advanced configuration.

---

**Ready to carve!** 🦈⚡

