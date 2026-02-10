const fs = require('fs');
const path = require('path');

const buildId = new Date().getTime().toString();
const buildIdPath = path.join(process.cwd(), 'public', 'build-id.txt');

fs.writeFileSync(buildIdPath, buildId, 'utf-8');
console.log(`✅ Build ID generated: ${buildId}`);
