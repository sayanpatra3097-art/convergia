const fs = require('fs');
let css = fs.readFileSync('scratch/ai_universe.css', 'utf8');

// Replace the root variables in ai_universe.css with our current color palette:
const ourRoot = `:root {
  --navy-deep: #173328;
  --navy: #244b3c;
  --ieee-blue: #244b3c;
  --ieee-blue-dark: #1a382d;
  --amber: #c76d42;
  --amber-hover: #ad5931;
  --ink: #202720;
  --ink-secondary: #3c443c;
  --muted: #74786f;
  --bg-white: #ffffff;
  --bg-alt: #f4f1e9;
  --bg-tint: #eae5d9;
  --border: #d8d4c9;
  --border-strong: #bfb9ac;
  --paper: #f4f1e9;
  --green: #244b3c;
  --orange: #c76d42;
  --line: #d8d4c9;
  --radius: 8px;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
  color: var(--ink);
  background: var(--bg-alt);
  scroll-behavior: smooth;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}`;

// Replace root
css = css.replace(/:root\s*\{[^}]+\}/, ourRoot);

// Replace hardcoded blues and navy with our green or paper
css = css.replaceAll('#0b2545', '#244b3c');
css = css.replaceAll('#071b33', '#173328');
css = css.replaceAll('#00629b', '#244b3c');
css = css.replaceAll('#004b78', '#1a382d');
css = css.replaceAll('#d97706', '#c76d42');
css = css.replaceAll('#b45309', '#ad5931');
css = css.replaceAll('#0f172a', '#202720');
css = css.replaceAll('#f8fafc', '#faf8f3');
css = css.replaceAll('#f1f5f9', '#f4f1e9');
css = css.replaceAll('#e2e8f0', '#d8d4c9');
css = css.replaceAll('#cbd5e1', '#bfb9ac');
css = css.replaceAll('#00d4ff', '#c76d42');
css = css.replaceAll('#38bdf8', '#c76d42');

// Also update font family references to DM Sans / Playfair Display
css = css.replaceAll('font-family:Inter', 'font-family:"DM Sans"');
css = css.replaceAll('font-family:Outfit', 'font-family:"Playfair Display"');
css = css.replaceAll('font-family:"Space Grotesk"', 'font-family:"Playfair Display"');

fs.writeFileSync('scratch/converted_theme.css', css);
console.log('Converted CSS written to scratch/converted_theme.css');
