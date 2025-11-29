# SharkByte User Guide 🦈

**Open-source CAM for CNC Shark HD4 routers**

SharkByte is a specialized fork of Kiri:Moto, optimized specifically for CNC Shark HD4 router users who need a powerful, free alternative to VCarve Pro.

## Table of Contents

- [Quick Start](#quick-start)
- [SharkByte Workflow](#sharkbyte-workflow)
- [CNC Shark HD4 Setup](#cnc-shark-hd4-setup)
- [CAM Operations](#cam-operations)
- [Tool Library](#tool-library)
- [Troubleshooting](#troubleshooting)

## Quick Start

1. **Start SharkByte**: `npm run dev` then open `http://localhost:8080/kiri/`
2. **Select Device**: Setup → Device → "CNC Shark HD4"
3. **Import Model**: File → Import → Select your STL/OBJ file
4. **Configure Operations**: Set up roughing, finishing, or outline operations
5. **Generate Toolpaths**: Click "Slice" to generate G-code paths
6. **Preview & Export**: Review in "Preview" mode, then "Export" as .tap file

## SharkByte Workflow

### 1. **Arrange** - Model Setup
- **Import 3D Models**: STL, OBJ, or 3MF files
- **Position Parts**: Drag to position on virtual bed
- **Scale/Rotate**: Right-click for transformation options
- **Layout**: Auto-arrange multiple parts with proper spacing

### 2. **Slice** - Toolpath Generation
- **Operation Setup**: Configure roughing, finishing, drilling operations
- **Tool Selection**: Choose appropriate end mills and bits
- **Parameter Tuning**: Set feeds, speeds, and cut depths
- **Background Processing**: Uses web workers for complex calculations

### 3. **Preview** - Toolpath Visualization
- **Speed Visualization**: Color-coded paths show cutting speeds
- **Movement Types**: Distinguish between rapid moves and cuts
- **Collision Detection**: Identify potential gouges or tool crashes
- **Layer Toggle**: Show/hide specific toolpath layers

### 4. **Animate** - Virtual Machining
- **Tool Simulation**: Watch virtual cutting without material removal
- **Stock Interference**: Detect tool collisions with workpiece
- **Cut Validation**: Verify toolpaths before actual machining
- **Time Estimation**: Get realistic machining time estimates

### 5. **Export** - G-code Generation
- **TAP File Format**: Native Shark HD4 .tap file export
- **GRBL Compatible**: Standard G-code with arc support (G2/G3)
- **Manual Tool Changes**: M0 pause commands for tool swaps
- **Job Information**: Time estimates and material requirements

## CNC Shark HD4 Setup

### Machine Configuration
```
Work Area: 25" × 25" × 7" (635mm × 635mm × 178mm)
Controller: GRBL-based with LCD pendant
Spindle: Variable speed up to 27,000 RPM
File Format: .tap (G-code with .tap extension)
Units: Inches (G20 mode) - Shark HD4 default
```

### Default G-code Settings
- **Units**: G20 (inches per minute)
- **Positioning**: G90 (absolute coordinates)
- **Arc Support**: G17 XY plane, G2/G3 enabled
- **Feed Rate**: G94 mode, 100 IPM rapid default
- **Safe Z**: 0.5" clearance height
- **Tool Changes**: M0 pause with manual instructions

### Recommended Workflow
1. **Material Setup**: Secure stock to Shark HD4 bed
2. **Zero Machine**: Use touch plate or manual zeroing
3. **Load Tool**: Install first cutting tool
4. **Load Program**: Transfer .tap file to Shark controller
5. **Run Job**: Execute with manual tool changes as prompted

## CAM Operations

### Roughing Operations
- **Purpose**: Remove bulk material quickly
- **Tools**: Larger end mills (1/2", 3/8")
- **Strategy**: Adaptive clearing, aggressive feeds
- **Leave Stock**: 0.010"-0.020" for finishing pass

### Finishing Operations
- **Purpose**: Achieve final surface quality
- **Tools**: Smaller end mills (1/4", 1/8")
- **Strategy**: Contour following, fine stepover
- **Speeds**: Slower feeds for quality finish

### Outline/Cutout Operations
- **Purpose**: Part separation and profiling
- **Tools**: Appropriate to material thickness
- **Strategy**: Outside/inside cutting paths
- **Tabs**: Add holding tabs for part retention

### Drilling Operations
- **Purpose**: Holes and mounting points
- **Tools**: Twist drills, center drills
- **Strategy**: Peck drilling for deep holes
- **Precision**: Use drill library for accurate sizing

## Tool Library

### Standard Router Bits for Shark HD4

#### End Mills (1/4" Shank)
```
1/8" 2-Flute Carbide: Detail work, small features
1/4" 2-Flute Carbide: General purpose cutting
1/4" 4-Flute Carbide: Harder materials, aluminum
```

#### End Mills (1/2" Shank)
```
1/2" 2-Flute Carbide: Heavy roughing operations
3/8" 2-Flute Carbide: Medium roughing, profiling
```

#### Specialty Bits
```
45° V-Bit (1/4" shank): Engraving, chamfers
Ball Nose (1/4"): 3D contouring, radius cuts
Straight Flute: Plastics and soft materials
```

### Feeds & Speeds Guidelines

#### Softwood (Pine, Poplar)
- **1/4" End Mill**: 18,000 RPM, 40 IPM, 0.040" depth
- **1/2" End Mill**: 16,000 RPM, 60 IPM, 0.060" depth

#### Hardwood (Oak, Maple)
- **1/4" End Mill**: 20,000 RPM, 30 IPM, 0.030" depth
- **1/2" End Mill**: 18,000 RPM, 45 IPM, 0.045" depth

#### Aluminum
- **1/4" End Mill**: 15,000 RPM, 25 IPM, 0.020" depth
- **Use flood coolant or air blast**

#### Plastics (HDPE, Acrylic)
- **Higher speeds, lower feeds**
- **Sharp tools essential**
- **Climb milling preferred**

## SharkByte vs VCarve Pro

### Advantages of SharkByte
- ✅ **Free & Open Source**: No licensing costs
- ✅ **Browser-Based**: Run on any OS, no installation
- ✅ **Shark-Optimized**: Pre-configured for HD4 specifications
- ✅ **Modern Interface**: Clean, intuitive workflow
- ✅ **Active Development**: Community-driven improvements

### VCarve Pro Features Not in SharkByte
- ❌ **V-Carving Operations**: Complex text and decorative carving
- ❌ **Nesting**: Automatic part optimization
- ❌ **Advanced Textures**: Built-in decorative patterns
- ❌ **Commercial Support**: Phone/email technical support

### Migration Tips
- **Import VCarve Models**: Use STL export from VCarve to SharkByte
- **Tool Library**: Manually recreate your VCarve tool definitions
- **Templates**: Create SharkByte profiles for common jobs
- **Workflows**: Document successful operation sequences

## Troubleshooting

### Common Issues

#### "White Screen" on Startup
- **Solution**: Clear browser cache, hard refresh (Ctrl+F5)
- **Cause**: Old cached JavaScript files

#### Large Files Won't Load
- **Solution**: Decimate mesh in CAD software before import
- **Alternative**: Use STL instead of high-resolution formats

#### Toolpaths Look Wrong
- **Check**: Tool diameter matches actual cutter
- **Verify**: Stock setup matches actual material
- **Confirm**: Operation parameters are appropriate

#### Export File Won't Open on Shark
- **Ensure**: File has .tap extension
- **Check**: USB drive is FAT32 formatted
- **Verify**: File size is reasonable (<10MB typically)

### Performance Optimization

#### For Large Models
- **Reduce Detail**: Lower mesh resolution in CAD
- **Simplify Operations**: Fewer, larger toolpaths
- **Browser**: Use Chrome/Firefox with sufficient RAM

#### For Complex Parts
- **Split Operations**: Separate roughing and finishing
- **Use Stock Model**: Define material boundaries accurately
- **Preview Before Export**: Catch issues early

## Tips & Best Practices

### Safety First
- **Always wear safety glasses**
- **Secure workpiece properly**
- **Check tool tightness before each job**
- **Keep hands clear of cutting area**

### Machining Quality
- **Sharp tools**: Replace dull cutters immediately
- **Proper speeds**: Don't exceed manufacturer recommendations
- **Chip evacuation**: Use dust collection or air blast
- **Material support**: Prevent vibration with proper clamping

### File Management
- **Descriptive names**: Use project-tool-operation naming
- **Version control**: Keep original models separate from G-code
- **Backup important**: Save successful programs
- **Document settings**: Note feeds/speeds that work well

### Workflow Efficiency
- **Standard operations**: Create templates for common jobs
- **Tool changes**: Group operations by tool when possible
- **Preview always**: Catch mistakes before cutting
- **Test on scrap**: Verify new operations on waste material

---

## Additional Resources

- **Original Kiri:Moto Documentation**: https://docs.grid.space/kiri-moto/
- **CNC Shark Community**: Various forums and user groups
- **SharkByte GitHub**: https://github.com/JarettHall/SharkByte
- **Issues & Support**: https://github.com/JarettHall/SharkByte/issues

---

*SharkByte - Making professional CAM accessible to everyone* 🦈✨