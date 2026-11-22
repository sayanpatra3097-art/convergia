const fs = require('fs');
const code = fs.readFileSync('scratch/app_snippet.js', 'utf8');

const functions = [...code.matchAll(/function\s+([A-Za-z0-9_]+)\s*\(/g)].map(m => m[1]);
console.log('Functions in app snippet:', functions);

// Let's print out the signature of each function
for (const fn of functions) {
  const idx = code.indexOf('function ' + fn);
  const body = code.slice(idx, idx + 400);
  console.log('--- ' + fn + ' ---');
  console.log(body);
}
