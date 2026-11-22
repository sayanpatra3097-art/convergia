const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

const homeIdx = js.indexOf('n==="home"');
if (homeIdx !== -1) {
  console.log('HOME snippet:');
  console.log(js.slice(homeIdx, homeIdx + 3000));
}
