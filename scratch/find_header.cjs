const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

const qsIdx = js.indexOf('function QS(');
if (qsIdx !== -1) {
  console.log('QS found:');
  console.log(js.slice(qsIdx, qsIdx + 3500));
} else {
  console.log('QS not found');
}
