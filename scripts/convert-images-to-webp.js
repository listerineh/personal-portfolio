const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const supportedFormats = ['.jpg', '.jpeg', '.png'];

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
    console.error(`❌ Error converting ${path.basename(filePath)}:`, error.message);
  }
}

async function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
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
