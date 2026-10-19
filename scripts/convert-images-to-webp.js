const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const supportedFormats = ['.jpg', '.jpeg', '.png', '.heic'];

async function convertToWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!supportedFormats.includes(ext)) {
    return;
  }

  const fileName = path.basename(filePath, ext);
  const outputPath = path.join(path.dirname(filePath), `${fileName}.webp`);

  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipped: ${path.relative(publicDir, filePath)} (WebP already exists)`);
    return;
  }

  try {
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    const relativePath = path.relative(publicDir, filePath);
    console.log(`✅ Converted: ${relativePath} -> ${fileName}.webp`);
    
    fs.unlinkSync(filePath);
    console.log(`🗑️  Deleted: ${relativePath}`);
  } catch (error) {
    const relativePath = path.relative(publicDir, filePath);
    
    if (error.message.includes('heif') || error.message.includes('HEIC')) {
      console.error(`❌ Error converting ${path.basename(filePath)}: HEIC format not supported`);
      console.log(`💡 Tip: Convert HEIC to JPG/PNG first, or install libheif support`);
      console.log(`   You can use: sips -s format jpeg "${filePath}" --out "${filePath.replace(/\.heic$/i, '.jpg')}"`);
    } else {
      console.error(`❌ Error converting ${relativePath}:`, error.message);
    }
  }
}

// Must stay PNG/JPG: share images (WebP previews are unreliable on LinkedIn, iMessage, Slack), app icons
// (manifest and apple-touch-icon), and the Storybook build.
const SKIP_DIRS = ['og', 'icons', 'docs'].map((dir) => path.join(publicDir, dir));

async function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && SKIP_DIRS.includes(fullPath)) {
      console.log(`⏭️  Skipped folder: ${path.relative(publicDir, fullPath)}/`);
    } else if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile()) {
      await convertToWebP(fullPath);
    }
  }
}

async function convertAllImages() {
  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Directory not found: ${publicDir}`);
    return;
  }

  console.log(`🔍 Scanning ${publicDir} recursively...\n`);
  await scanDirectory(publicDir);
  console.log('\n✨ Conversion complete!');
}

convertAllImages();
