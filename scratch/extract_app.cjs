const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Let's find the main App function or sections
// Look for where header, hero, etc. are used together
const appMatch = js.match(/function\s+([A-Za-z0-9_]+)\s*\(\)\s*\{[^}]*return[^{}]*jsx\([A-Za-z0-9_]+,\{[^}]*id:\"home\"/);
console.log('App search match:', appMatch ? appMatch[0].slice(0, 300) : 'none');

// Let's find all section ids
const sectionIds = [...new Set([...js.matchAll(/id:\"([a-zA-Z0-9_-]+)\"/g)].map(m => m[1]))];
console.log('Section/element IDs found:', sectionIds);

// Let's find all className values from the CSS file
const css = fs.readFileSync('scratch/ai_universe.css', 'utf8');
const classNames = [...new Set([...css.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map(m => m[1]))];
console.log('Top classes in CSS (' + classNames.length + '):', classNames.slice(0, 50));
