const fs = require('fs');
const css = fs.readFileSync('scratch/ai_universe.css', 'utf8');

// Find all color formats
const hexColors = [...new Set([...css.matchAll(/#([0-9a-fA-F]{3,8})\b/g)].map(m => '#' + m[1].toLowerCase()))];
console.log('Hex colors found in CSS:', hexColors);

const rgbColors = [...new Set([...css.matchAll(/rgba?\([^)]+\)/g)].map(m => m[0]))];
console.log('RGB colors found (sample 15):', rgbColors.slice(0, 15));
