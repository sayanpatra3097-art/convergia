const fs = require('fs');
const css = fs.readFileSync('scratch/converted_theme.css', 'utf8');

const keyClasses = [
  'site-header-two-tier',
  'header-top-logo-bar',
  'hero',
  'hero-particle-canvas',
  'hero-title',
  'partners-strip',
  'floating-marquee-section',
  'committee-section-enhanced',
  'venue-map-iframe-container',
  'site-footer'
];

for (const k of keyClasses) {
  console.log(k, css.includes('.' + k));
}
