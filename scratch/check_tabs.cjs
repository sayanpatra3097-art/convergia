const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Find all functions that return jsx
// Search for section tags
const sections = [...js.matchAll(/className:\"([^\"]*section[^\"]*)\"/g)].map(m => m[1]);
console.log('Sections:', [...new Set(sections)]);

// Find all major components rendered in the main render
const tabs = ['home', 'about', 'tracks', 'dates', 'papers', 'publication', 'registration', 'committee', 'venue'];
for (const t of tabs) {
  const idx = js.indexOf('n==="' + t + '"');
  console.log('Tab "' + t + '" found:', idx !== -1);
}
