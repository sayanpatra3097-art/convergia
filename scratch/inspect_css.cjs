const fs = require('fs');
const css = fs.readFileSync('scratch/ai_universe.css', 'utf8');

// Look for :root variables in ai_universe.css
const rootMatch = css.match(/:root\s*\{[^}]+\}/);
if (rootMatch) {
  console.log('ROOT in ai_universe.css:');
  console.log(rootMatch[0]);
} else {
  // Find variables
  const vars = [...css.matchAll(/--[a-zA-Z0-9_-]+:[^;]+/g)].map(m => m[0]);
  console.log('Sample variables in ai_universe.css (total ' + vars.length + '):');
  console.log(vars.slice(0, 30));
}
