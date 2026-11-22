const fs = require('fs');

for (const fn of ['w2', 'u2', 'f2', 'p2', 'g2', 'v2', 'x2']) {
  const code = fs.readFileSync('scratch/fn_' + fn + '.js', 'utf8');
  console.log('=== ' + fn + ' ===');
  console.log(code.slice(0, 500));
}
