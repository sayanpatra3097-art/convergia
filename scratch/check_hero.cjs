const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Search for definition of XS
const xsIdx = js.indexOf('function XS(');
if (xsIdx !== -1) {
  console.log('XS function:');
  console.log(js.slice(xsIdx, xsIdx + 3000));
}
