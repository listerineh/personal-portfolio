#!/usr/bin/env node

/**
 * Script para enviar notificaciones de blog a suscriptores
 * Uso: npm run notify-blog -- --title "My Blog Title" --slug "my-blog-slug" --excerpt "Description" --image "https://..."
 */

const https = require('https');

const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(`--${name}`);
  return index !== -1 ? args[index + 1] : null;
};

const blogTitle = getArg('title');
const blogSlug = getArg('slug');
const blogExcerpt = getArg('excerpt') || '';
const blogImageUrl = getArg('image') || '';

if (!blogTitle || !blogSlug) {
  console.error('❌ Error: --title and --slug are required');
  console.log('\nUsage:');
  console.log('  npm run notify-blog -- --title "Blog Title" --slug "blog-slug" [--excerpt "Description"] [--image "URL"]');
  console.log('\nExample:');
  console.log('  npm run notify-blog -- --title "Building with Next.js" --slug "building-with-nextjs" --excerpt "Learn how to build modern apps"');
  process.exit(1);
}

const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const endpoint = `${apiUrl}/api/newsletter/send-blog-notification`;

console.log('📧 Sending blog notification...');
console.log(`   Title: ${blogTitle}`);
console.log(`   Slug: ${blogSlug}`);
if (blogExcerpt) console.log(`   Excerpt: ${blogExcerpt.substring(0, 50)}...`);
if (blogImageUrl) console.log(`   Image: ${blogImageUrl}`);
console.log('');

const data = JSON.stringify({
  blogTitle,
  blogSlug,
  blogExcerpt,
  blogImageUrl,
});

const url = new URL(endpoint);
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = (url.protocol === 'https:' ? https : require('http')).request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(responseData);
      
      if (res.statusCode === 200) {
        console.log('✅ Success!');
        console.log(`   ${response.message}`);
        if (response.stats) {
          console.log(`   Sent: ${response.stats.successful}/${response.stats.total} emails`);
        }
      } else {
        console.error('❌ Error:', response.error || response.message);
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Failed to parse response:', responseData);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  process.exit(1);
});

req.write(data);
req.end();
