const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../storybook-static');
const targetDir = path.join(__dirname, '../public/docs/components');

async function moveStorybook() {
  try {
    // Remove target directory if it exists
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir);
    }

    // Ensure target directory exists
    await fs.ensureDir(targetDir);

    // Copy all files from source to target
    await fs.copy(sourceDir, targetDir);

    // Remove source directory
    await fs.remove(sourceDir);

    console.log('✅ Storybook files moved to public/docs/components');
  } catch (error) {
    console.error('❌ Error moving Storybook files:', error);
    process.exit(1);
  }
}

moveStorybook();
