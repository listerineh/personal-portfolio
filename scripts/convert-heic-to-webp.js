const { execSync } = require('child_process');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

async function convertHeicToWebP(heicPath) {
  const ext = path.extname(heicPath).toLowerCase();
  
  if (ext !== '.heic') {
    return;
  }

  const fileName = path.basename(heicPath, ext);
  const dirName = path.dirname(heicPath);
  const jpgPath = path.join(dirName, `${fileName}.jpg`);
  const webpPath = path.join(dirName, `${fileName}.webp`);

  if (fs.existsSync(webpPath)) {
    console.log(`⏭️  Skipped: ${path.relative(publicDir, heicPath)} (WebP already exists)`);
    return;
  }

  try {
    const relativePath = path.relative(publicDir, heicPath);
    
    // Step 1: Convert HEIC to JPG using sips
    console.log(`🔄 Converting HEIC to JPG: ${relativePath}`);
    execSync(`sips -s format jpeg "${heicPath}" --out "${jpgPath}"`, { stdio: 'pipe' });
    console.log(`✅ HEIC → JPG: ${fileName}.jpg`);
    
    // Step 2: Convert JPG to WebP using Sharp
    console.log(`🔄 Converting JPG to WebP: ${fileName}.jpg`);
    await sharp(jpgPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    console.log(`✅ JPG → WebP: ${fileName}.webp`);
    
    // Step 3: Clean up intermediate JPG
    fs.unlinkSync(jpgPath);
    console.log(`🗑️  Deleted intermediate: ${fileName}.jpg`);
    
    // Step 4: Delete original HEIC
    fs.unlinkSync(heicPath);
    console.log(`🗑️  Deleted original: ${relativePath}`);
    
    console.log(`✨ Complete: ${relativePath} → ${fileName}.webp\n`);
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(heicPath)}:`, error.message);
    
    // Clean up partial files if error occurred
    const jpgPath = path.join(path.dirname(heicPath), `${fileName}.jpg`);
    if (fs.existsSync(jpgPath)) {
      fs.unlinkSync(jpgPath);
    }
  }
}

async function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile()) {
      await convertHeicToWebP(fullPath);
    }
  }
}

async function convertAllHeicImages() {
  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Directory not found: ${publicDir}`);
    return;
  }

  console.log(`🔍 Scanning ${publicDir} for HEIC files...\n`);
  await scanDirectory(publicDir);
  console.log('✨ All HEIC conversions complete!');
}

convertAllHeicImages();
