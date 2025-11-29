# CNC Shark HD4 Profile for SharkByte

This document explains how to use the CNC Shark HD4 device profile in your SharkByte fork of Kiri:Moto.

## What Was Added

A complete CNC machine profile for the **CNC Shark HD4** router has been added to SharkByte. This profile includes:

### Machine Specifications
- **Work Area**: 635mm x 635mm x 178mm (25" x 25" x 7")
- **Controller**: GRBL-based with LCD pendant
- **Output Format**: `.tap` files (standard G-code with .tap extension)
- **Spindle Speed**: Up to 27,000 RPM
- **Origin**: Lower-left corner (not centered)

### G-Code Features
- **Arc Support**: Enabled (G2/G3 commands for smooth curves)
- **Units**: Inches (G20 mode - Shark HD4 default)
- **Spindle Control**: M3/M5 commands
- **Manual Tool Changes**: No automatic M6 tool changer - uses M0 pause for manual changes
- **Safe Z Height**: 0.5 inches (12.7mm) above material

## File Locations

The device profile consists of:

1. **Device Definition**: `src/kiri/dev/cam/CNC.Shark.HD4.json`
   - Contains all machine specifications and G-code settings
   
2. **Compiled Devices**: `src/pack/kiri-devs.js`
   - Auto-generated file containing all devices (including Shark HD4)
   - **Important**: This file is regenerated when you rebuild the project

## How to Use

### 1. Start the Development Server

From your SharkByte directory, run:

```powershell
npm run dev
```

Wait for the server to start (it will open on port 8080).

### 2. Open SharkByte in Your Browser

Navigate to: `http://localhost:8080/kiri`

### 3. Select CAM Mode

1. Click on the **mode selector** (top left - probably says "FDM" by default)
2. Select **CAM** mode

### 4. Select Your Device

1. Click **Setup** (top toolbar)
2. In the device dropdown, look for **"CNC.Shark.HD4"**
3. Select it

You should now see:
- Bed dimensions: 635mm x 635mm
- Z-height: 178mm
- The bed visualization should update to show your work area

### 5. Configure Your Job

1. Import your 3D model or SVG
2. Set up your tool paths in CAM mode
3. Configure feed rates, depths, etc.

### 6. Export G-Code

1. Click **Export** or **Slice & Export**
2. The file will be saved with a `.tap` extension
3. Transfer this file to your Shark HD4 (USB drive, SD card, etc.)

## G-Code Output Example

Here's what the beginning of your `.tap` file will look like:

```gcode
G20 ; set units to INCHES (Shark HD4 default)
G90 ; absolute position mode (required)
G17 ; XY plane selection for arcs
M3 S18000 ; start spindle at 18000 RPM
...your tool paths...
G0 Z0.5 ; raise Z to safe height
M5 ; spindle off
G0 X0 Y0 ; return to origin
M30 ; program end
```

## Understanding the Settings

### Post-Processor Settings

The device profile in `src/kiri/dev/cam/CNC.Shark.HD4.json` uses this structure:

```json
{
  "file-ext": "tap",           // Output file extension
  "token-space": " ",          // Space between G-code tokens
  "strip-comments": false,     // Keep comments in output
  "pre": [...],                // Commands at start of file
  "post": [...],               // Commands at end of file
  "tool-change": [...],        // Manual tool change sequence
  "dwell": [...],              // Pause/dwell commands
  "spindle": [...],            // Spindle on/speed commands
  "settings": {
    "origin_center": false,    // Origin at corner (not center)
    "bed_width": 635,          // X-axis travel (mm)
    "bed_depth": 635,          // Y-axis travel (mm)
    "build_height": 178,       // Z-axis travel (mm)
    "spindle_max": 27000,      // Maximum spindle RPM
    "arc_enabled": true,       // Enable arc commands (G2/G3)
    "arc_tolerance": 0.005     // Arc interpolation accuracy
  }
}
```

## Customizing the Profile

If you need to modify the profile (e.g., change feed rates, add custom commands):

### Option 1: Edit the JSON File

1. Open `src/kiri/dev/cam/CNC.Shark.HD4.json`
2. Make your changes
3. Regenerate the device file:

```powershell
node -e "const fs=require('fs'),PATH=require('path');let root=PATH.join('.','src','kiri','dev'),devs={};fs.readdirSync(root).forEach(type=>{let map=devs[type]=devs[type]||{};fs.readdirSync(PATH.join(root,type)).forEach(device=>{let deviceName=device.endsWith('.json')?device.substring(0,device.length-5):device;map[deviceName]=JSON.parse(fs.readFileSync(PATH.join(root,type,device)));});});fs.writeFileSync(PATH.join('.','src','pack','kiri-devs.js'),\`export const devices = \${JSON.stringify(devs)};\`);console.log('Regenerated');"
```

4. Restart the dev server

### Option 2: Clone and Modify in the UI

1. Select the CNC.Shark.HD4 device
2. Click **Setup**
3. Click **Clone** to create a custom version
4. Name it (e.g., "My Shark HD4")
5. Modify settings in the UI
6. Your custom profile is saved locally in browser storage

## Testing Checklist

Before running your first job:

- [ ] **Verify bed dimensions**: Check that the work area matches your machine
- [ ] **Test export**: Generate a simple rectangle and verify the .tap file
- [ ] **Check G-code header**: Ensure it starts with G20 (inches) and G90 (absolute)
- [ ] **Verify arc commands**: If your design has curves, confirm G2/G3 commands appear
- [ ] **Test spindle commands**: Look for M3 S##### (spindle on) and M5 (spindle off)
- [ ] **Check tool changes**: Verify M0 pause appears for tool changes
- [ ] **Validate safe Z**: Confirm Z moves to 0.5" between operations

## Important Notes

### Units (Inches vs Millimeters)

The Shark HD4 typically operates in **INCHES** (G20 mode), which is reflected in the post-processor. However, Kiri:Moto works internally in millimeters. The bed dimensions are set in millimeters (635mm = 25 inches), and the software will handle conversions.

If you prefer working in millimeters:
1. Change `G20` to `G21` in the `"pre"` section of the JSON file
2. Regenerate the device file
3. Be aware that feed rates and coordinates will now be in mm

### Arc Support

The profile enables arc commands (G2/G3) which create smoother curves with fewer G-code lines. This is more efficient than line segments. The `arc_tolerance` setting (0.005mm) controls accuracy.

If you experience issues with arcs:
- Set `"arc_enabled": false` in the settings
- Or increase `arc_tolerance` to a larger value (less accuracy, faster processing)

### Tool Changes

The Shark HD4 doesn't have an automatic tool changer. When a tool change is needed:
1. The machine will pause (M0 command)
2. The spindle will stop
3. Z-axis moves to safe height (0.5")
4. You manually change the tool
5. Re-zero the tool height if needed
6. Resume the program on your controller

### Spindle Speed

Maximum spindle speed is set to 27,000 RPM. The actual speed will be controlled by your CAM settings in Kiri:Moto. Common speeds:
- **Softwood**: 12,000-18,000 RPM
- **Hardwood**: 18,000-24,000 RPM  
- **Plastics**: 12,000-16,000 RPM
- **Aluminum**: 24,000-27,000 RPM (with proper feeds and cooling)

## Troubleshooting

### Device Doesn't Appear in Dropdown

1. Check that `CNC.Shark.HD4.json` exists in `src/kiri/dev/cam/`
2. Verify the file is valid JSON (no syntax errors)
3. Regenerate `src/pack/kiri-devs.js` (see Customizing section)
4. Hard refresh your browser (Ctrl+F5)
5. Check browser console for errors (F12)

### Wrong File Extension

If files are exporting as `.nc` or `.gcode` instead of `.tap`:
- Verify `"file-ext": "tap"` in the JSON file
- Regenerate the device file
- Restart the server

### Origin Position Wrong

The Shark HD4 uses **corner origin** (lower-left), not center. If your work is offset:
- Ensure `"origin_center": false` in settings
- Check your CAM zero point settings in Kiri:Moto

### Arc Errors on Machine

Some older GRBL versions have arc bugs:
1. Update your GRBL firmware (if possible)
2. Or disable arcs: `"arc_enabled": false`

## Advanced: Creating Tool Libraries

You can create custom tool libraries for common router bits:

### Common Router Bits for Shark HD4

| Tool | Diameter | Flutes | Use Case |
|------|----------|--------|----------|
| End Mill | 1/4" (6.35mm) | 2 | General purpose, slots |
| End Mill | 1/2" (12.7mm) | 2 | Fast material removal |
| Ball Nose | 1/4" (6.35mm) | 2 | 3D carving, contours |
| V-Bit | 60° | 1 | V-carving, engraving |
| V-Bit | 90° | 1 | Sign making, text |

To add tools in Kiri:Moto:
1. Go to **Tools** tab
2. Click **Add Tool**
3. Enter specifications (diameter, flutes, speeds, feeds)
4. Save with descriptive name
5. Select when creating tool paths

## Support and Issues

If you encounter issues specific to the Shark HD4 profile:

1. Check this documentation first
2. Verify your JSON file syntax
3. Review the G-code output manually
4. Test with a simple shape first
5. Consult the Kiri:Moto documentation: https://grid.space/docs

For SharkByte-specific modifications, document your changes and consider:
- Creating additional profiles for different materials
- Adding custom pre/post scripts
- Building material-specific tool libraries

## Version History

- **v1.0** - Initial CNC Shark HD4 profile
  - 635mm x 635mm x 178mm work area
  - GRBL-based post-processor
  - Inch mode (G20) default
  - Arc support enabled
  - Manual tool changes (M0 pause)
  - .tap file extension

---

**Happy CNCing with SharkByte!** 🦈


