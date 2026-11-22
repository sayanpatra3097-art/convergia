const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

function extractFunc(name) {
  const start = js.indexOf('function ' + name + '(');
  if (start === -1) return null;
  // find matching closing brace or next top-level function
  let depth = 0;
  let inString = false;
  let quote = '';
  for (let i = js.indexOf('{', start); i < js.length; i++) {
    const char = js[i];
    if (inString) {
      if (char === quote && js[i-1] !== '\\\\') inString = false;
    } else {
      if (char === '"' || char === "'" || char === '\`') {
        inString = true;
        quote = char;
      } else if (char === '{') {
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth === 0) {
          return js.slice(start, i + 1);
        }
      }
    }
  }
  return null;
}

const funcs = ['Kn', 'XS', 'w2', 'u2', 'f2', 'p2', 'g2', 'v2', 'y2', 'x2', 'S2'];
for (const fn of funcs) {
  const code = extractFunc(fn);
  if (code) {
    fs.writeFileSync('scratch/fn_' + fn + '.js', code);
    console.log('Extracted ' + fn + ' length: ' + code.length);
  } else {
    console.log('Could not extract ' + fn);
  }
}
