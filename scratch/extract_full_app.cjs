const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Let's find all component definitions in ai_universe.js
// Look for Header, Hero, Tracks, Dates, Committee, Venue, Footer
console.log('Total JS length:', js.length);

// Let's find the main app component
// In Vite/React apps, App is usually near the end
const endSnippet = js.slice(-25000);
fs.writeFileSync('scratch/app_snippet.js', endSnippet);
console.log('Saved app_snippet.js');
