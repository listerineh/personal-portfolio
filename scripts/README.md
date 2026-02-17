# Image Conversion Script

## Convert Images to WebP

This script converts JPEG, JPG, and PNG images to WebP format for better performance.

### Prerequisites

Install the required dependency:

```bash
npm install sharp --save-dev
```

### Usage

Run the conversion script:

```bash
node scripts/convert-images-to-webp.js
```

### Features

- Converts `.jpg`, `.jpeg`, and `.png` files to `.webp`
- Quality set to 85% (good balance between quality and file size)
- Preserves original files (uncomment lines in script to delete originals)
- Shows progress with emoji indicators

### After Conversion

1. Update image references in your code from `.jpeg`/`.jpg`/`.png` to `.webp`
2. Test that all images load correctly
3. Optionally delete original files if everything works
