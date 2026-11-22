const fs = require('fs');

// 1. Update src/styles.css with comprehensive typography scale up
let css = fs.readFileSync('src/styles.css', 'utf8');

const typographyScale = `
/* Global Typography Upscale */
html {
  font-size: 17px !important;
}

body {
  font-size: 1rem !important;
  line-height: 1.68 !important;
}

h1 {
  font-size: clamp(42px, 5.5vw, 68px) !important;
  line-height: 1.15 !important;
}

h2 {
  font-size: clamp(28px, 3.8vw, 42px) !important;
  line-height: 1.25 !important;
}

h3 {
  font-size: clamp(22px, 2.8vw, 28px) !important;
  line-height: 1.35 !important;
}

h4 {
  font-size: clamp(17px, 2vw, 22px) !important;
}

p, li {
  font-size: 1rem !important;
  line-height: 1.68 !important;
}

.hero-subtitle {
  font-size: 1.15rem !important;
  line-height: 1.65 !important;
}

.hero-conf-lead {
  font-size: 0.95rem !important;
  letter-spacing: 0.12em !important;
}

.nav-link-btn {
  font-size: 0.92rem !important;
  padding: 9px 16px !important;
}

.btn-primary, .btn-amber, .btn-outline {
  font-size: 0.95rem !important;
  padding: 12px 24px !important;
}

.partner-role {
  font-size: 0.82rem !important;
}

.partner-cell strong {
  font-size: 1.35rem !important;
}

.partner-cell small {
  font-size: 0.9rem !important;
}

.track-badge {
  font-size: 0.8rem !important;
  padding: 5px 12px !important;
}

.track-card h3 {
  font-size: 1.3rem !important;
}

.track-topics li {
  font-size: 0.92rem !important;
  line-height: 1.5 !important;
}

.committee-photo-card {
  padding: 26px 22px !important;
}

.committee-member-name {
  font-size: 1.15rem !important;
}

.committee-role-badge {
  font-size: 0.8rem !important;
  padding: 4px 14px !important;
}

.reg-table th {
  font-size: 0.95rem !important;
  padding: 18px 22px !important;
}

.reg-table td {
  font-size: 1rem !important;
  padding: 18px 22px !important;
}

.ticker-track span {
  font-size: 0.92rem !important;
}

.site-footer p, .site-footer li button, .site-footer a {
  font-size: 0.92rem !important;
}

.site-footer h4 {
  font-size: 1.1rem !important;
}

.footer-bottom {
  font-size: 0.85rem !important;
}
`;

css += '\n' + typographyScale;
fs.writeFileSync('src/styles.css', css);
console.log('Appended typographyScale to src/styles.css');
