const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Let's find all string literals
const strRegex = /"([^"\\]{3,120})"/g;
const strings = new Set();
let m;
while ((m = strRegex.exec(js)) !== null) {
  const s = m[1];
  if (/about|speaker|track|schedule|committee|sponsor|venue|register|call for paper|submission|contact|faq|keynote|theme|dates|jaipur|rajasthan|universe|convergia/i.test(s)) {
    strings.add(s);
  }
}
console.log('Relevant strings (' + strings.size + '):');
for (const s of Array.from(strings).slice(0, 60)) {
  console.log('-', s);
}
