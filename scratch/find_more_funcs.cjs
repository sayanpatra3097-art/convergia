const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

for (const fn of ['u2', 'f2', 'p2', 'XS', 'Kn']) {
  const idx = js.indexOf('function ' + fn);
  console.log('--- ' + fn + ' ---');
  if (idx !== -1) {
    console.log(js.slice(idx, idx + 400));
  } else {
    console.log('not found');
  }
}
