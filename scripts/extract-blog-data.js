#!/usr/bin/env node

/**
 * Script para extraer datos de un archivo de blog
 * Uso: node scripts/extract-blog-data.js <blog-file-path>
 */

const fs = require('fs');
const path = require('path');

let blogFilePath = process.argv[2];

if (!blogFilePath) {
  console.error('❌ Error: Blog file path is required');
  console.log('\nUsage:');
  console.log('  node scripts/extract-blog-data.js <blog-file-path>');
  console.log('\nExample:');
  console.log('  node scripts/extract-blog-data.js src/lib/data/blog/my-new-post.ts');
  process.exit(1);
}

// If the provided file is get-blog-posts.ts (index file), find the most recently modified blog post
if (blogFilePath.endsWith('get-blog-posts.ts') || blogFilePath.endsWith('get-blog-posts.js')) {
  const blogDir = path.dirname(blogFilePath);
  
  if (!fs.existsSync(blogDir)) {
    console.error(`❌ Error: Blog directory not found: ${blogDir}`);
    process.exit(1);
  }
  
  // Get all .ts files in the blog directory (excluding get-blog-posts.ts)
  const files = fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.ts') && file !== 'get-blog-posts.ts')
    .map(file => ({
      name: file,
      path: path.join(blogDir, file),
      mtime: fs.statSync(path.join(blogDir, file)).mtime.getTime()
    }))
    .sort((a, b) => b.mtime - a.mtime);
  
  if (files.length === 0) {
    console.error('❌ Error: No blog post files found in the blog directory');
    process.exit(1);
  }
  
  // Use the most recently modified file
  blogFilePath = files[0].path;
  console.error(`ℹ️  Using most recently modified blog post: ${files[0].name}`);
}

if (!fs.existsSync(blogFilePath)) {
  console.error(`❌ Error: File not found: ${blogFilePath}`);
  process.exit(1);
}

try {
  const fileContent = fs.readFileSync(blogFilePath, 'utf8');
  
  // Extract slug from filename (remove .ts extension)
  const fileName = path.basename(blogFilePath, '.ts');
  const slug = fileName;
  
  // Helper function to extract string value from TypeScript string literal
  function extractStringValue(content, fieldName) {
    // Match field: 'value' or field: "value", handling escaped quotes
    const singleQuoteRegex = new RegExp(`${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
    const doubleQuoteRegex = new RegExp(`${fieldName}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's');
    
    const singleMatch = content.match(singleQuoteRegex);
    const doubleMatch = content.match(doubleQuoteRegex);
    
    let value = singleMatch ? singleMatch[1] : (doubleMatch ? doubleMatch[1] : '');
    
    // Unescape common escape sequences
    value = value
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');
    
    return value;
  }
  
  let enSection = '';
  let title = '';
  let excerpt = '';
  let imageUrl = '';
  
  // Try new structure first: const enContent = `...`; export const blogName: Record<Locale, BlogPost> = { en: { ... } }
  const newStructureMatch = fileContent.match(/export\s+const\s+\w+:\s*Record<Locale,\s*BlogPost>\s*=\s*\{[\s\S]*?en:\s*\{([\s\S]*?)(?:\},\s*es:|$)/);
  
  if (newStructureMatch) {
    // New structure: extract from en object within export
    enSection = newStructureMatch[1];
    title = extractStringValue(enSection, 'title');
    excerpt = extractStringValue(enSection, 'excerpt');
    imageUrl = extractStringValue(enSection, 'imageUrl');
  } else {
    // Try old structure: direct en: { ... } object
    const oldStructureMatch = fileContent.match(/en:\s*\{([\s\S]*?)(?:\},\s*es:|$)/);
    if (oldStructureMatch) {
      enSection = oldStructureMatch[1];
      title = extractStringValue(enSection, 'title');
      excerpt = extractStringValue(enSection, 'excerpt');
      imageUrl = extractStringValue(enSection, 'imageUrl');
    } else {
      console.error('❌ Error: Could not find "en" section in blog file');
      console.error('   Tried both new structure (const enContent with export) and old structure (direct en object)');
      process.exit(1);
    }
  }
  
  if (!title || !slug) {
    console.error('❌ Error: Could not extract required blog data (title and slug)');
    console.error(`   Title: "${title}"`);
    console.error(`   Slug: "${slug}"`);
    process.exit(1);
  }
  
  // Output as JSON for GitHub Actions
  const blogData = {
    title,
    slug,
    excerpt,
    imageUrl: imageUrl ? `https://listerineh.dev${imageUrl}` : ''
  };
  
  console.log(JSON.stringify(blogData));
  
} catch (error) {
  console.error('❌ Error reading or parsing blog file:', error.message);
  process.exit(1);
}
