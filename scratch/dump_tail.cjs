const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Find the end of bundle where the App component is exported/mounted
const last10k = js.slice(-15000);
fs.writeFileSync('scratch/tail.js', last10k);
console.log('Wrote tail.js');
