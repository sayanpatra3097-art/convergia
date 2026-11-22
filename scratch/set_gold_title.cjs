const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

const target1 = '.hero-title-brand{font-family:"DM Serif Display",serif;background:linear-gradient(135deg,#173328,#004d7a 42%,#244b3c 72%,#0284c7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block;filter:drop-shadow(0 2px 10px rgba(0,98,155,.12))}';
const target2 = '.hero-title-year{display:inline-block;margin-left:8px;font-family:"DM Serif Display",serif;font-weight:400;background:linear-gradient(135deg,#0284c7,#0ea5e9,#c76d42);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.5px;filter:drop-shadow(0 2px 10px rgba(14,165,233,.2))}';

const repl1 = '.hero-title-brand{font-family:"DM Serif Display",serif;background:linear-gradient(135deg,#996515 0%,#c59b27 25%,#e5c158 48%,#d4a017 72%,#8c5810 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block;filter:drop-shadow(0 2px 10px rgba(184,134,11,.28))}';
const repl2 = '.hero-title-year{display:inline-block;margin-left:8px;font-family:"DM Serif Display",serif;font-weight:400;background:linear-gradient(135deg,#b8860b 0%,#d4af37 28%,#f7df8b 50%,#c89520 75%,#8c5810 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.5px;filter:drop-shadow(0 2px 10px rgba(184,134,11,.28))}';

if (css.includes(target1) && css.includes(target2)) {
  css = css.replace(target1, repl1).replace(target2, repl2);
  fs.writeFileSync('src/styles.css', css, 'utf8');
  console.log('Successfully updated hero-title-brand and hero-title-year to golden in styles.css');
} else {
  console.log('Targets not found: target1=', css.includes(target1), 'target2=', css.includes(target2));
}
