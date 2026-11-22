const fs = require('fs');

let css = fs.readFileSync('scratch/converted_theme.css', 'utf8');

// Add specific overrides to ensure perfect paper & evergreen theme across all components:
const overrides = `
/* Warm Paper & Evergreen Theme Enforcements */
body {
  background-color: #f4f1e9 !important;
  color: #202720 !important;
  font-family: 'DM Sans', -apple-system, sans-serif !important;
}

.site-header-two-tier {
  background: rgba(244, 241, 233, 0.95) !important;
  backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid #d8d4c9 !important;
}

.header-top-logo-bar {
  background: #244b3c !important;
  color: #f4f1e9 !important;
  border-bottom: 1px solid #1a382d !important;
}

.header-top-logo-bar a, .header-top-logo-bar span {
  color: #f4f1e9 !important;
}

.header-nav-bar {
  background: #f4f1e9 !important;
  border-bottom: 1px solid #d8d4c9 !important;
}

.nav-link-btn {
  color: #404840 !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
}

.nav-link-btn:hover {
  color: #c76d42 !important;
  background: rgba(199, 109, 66, 0.08) !important;
}

.nav-link-btn.active {
  color: #244b3c !important;
  background: rgba(36, 75, 60, 0.1) !important;
  font-weight: 600 !important;
}

.hero {
  background: #f4f1e9 !important;
  color: #202720 !important;
  border-bottom: 1px solid #d8d4c9 !important;
}

.hero-particle-canvas {
  opacity: 0.7 !important;
}

.hero-title-brand {
  color: #244b3c !important;
  font-family: 'Playfair Display', serif !important;
}

.hero-title-year {
  color: #c76d42 !important;
  font-family: 'Playfair Display', serif !important;
}

.hero-conf-lead {
  color: #74786f !important;
  font-weight: 600 !important;
  letter-spacing: 0.1em !important;
}

.hero-subtitle {
  color: #404840 !important;
  line-height: 1.6 !important;
}

.meta-icon-bubble {
  background: rgba(36, 75, 60, 0.08) !important;
  color: #244b3c !important;
  border: 1px solid #d8d4c9 !important;
}

.btn-primary, .btn-primary-gradient, .btn-brand {
  background: #244b3c !important;
  color: #ffffff !important;
  border: 1px solid #244b3c !important;
}

.btn-primary:hover, .btn-brand:hover {
  background: #173328 !important;
  border-color: #173328 !important;
}

.btn-amber {
  background: #c76d42 !important;
  color: #ffffff !important;
  border: 1px solid #c76d42 !important;
}

.btn-amber:hover {
  background: #ad5931 !important;
  border-color: #ad5931 !important;
}

.btn-outline, .btn-outline-white {
  background: transparent !important;
  color: #244b3c !important;
  border: 1px solid #244b3c !important;
}

.btn-outline:hover, .btn-outline-white:hover {
  background: rgba(36, 75, 60, 0.08) !important;
  color: #173328 !important;
}

.partners-strip {
  background: #ede9df !important;
  border-top: 1px solid #d8d4c9 !important;
  border-bottom: 1px solid #d8d4c9 !important;
}

.partner-cell {
  background: #faf8f3 !important;
  border: 1px solid #d8d4c9 !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03) !important;
}

.partner-cell strong {
  color: #244b3c !important;
}

.partner-role {
  color: #c76d42 !important;
  font-weight: 600 !important;
}

.floating-marquee-section {
  background: #f4f1e9 !important;
  border-top: 1px solid #d8d4c9 !important;
  border-bottom: 1px solid #d8d4c9 !important;
}

.floating-marquee-header-bar {
  background: #ede9df !important;
  border-bottom: 1px solid #d8d4c9 !important;
}

.floating-marquee-eyebrow {
  color: #c76d42 !important;
}

.floating-marquee-title {
  color: #244b3c !important;
  font-family: 'Playfair Display', serif !important;
}

.marquee-logo-card {
  background: #ffffff !important;
  border: 1px solid #d8d4c9 !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
}

.marquee-logo-card:hover {
  border-color: #c76d42 !important;
  transform: translateY(-2px);
}

.track-card {
  background: #ffffff !important;
  border: 1px solid #d8d4c9 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04) !important;
}

.track-badge {
  background: rgba(36, 75, 60, 0.08) !important;
  color: #244b3c !important;
  border: 1px solid #d8d4c9 !important;
}

.track-card h3 {
  color: #244b3c !important;
  font-family: 'Playfair Display', serif !important;
}

.track-topics li {
  color: #404840 !important;
}

.track-topics li::before {
  color: #c76d42 !important;
}

.committee-photo-card {
  background: #ffffff !important;
  border: 1px solid #d8d4c9 !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
}

.committee-member-name {
  color: #244b3c !important;
  font-family: 'Playfair Display', serif !important;
}

.committee-role-badge {
  background: rgba(199, 109, 66, 0.1) !important;
  color: #c76d42 !important;
  border: 1px solid rgba(199, 109, 66, 0.25) !important;
}

.committee-filter-pill.active {
  background: #244b3c !important;
  color: #ffffff !important;
  border-color: #244b3c !important;
}

.registration-card, .table-container, .reg-table {
  background: #ffffff !important;
  border: 1px solid #d8d4c9 !important;
}

.reg-table th {
  background: #ede9df !important;
  color: #244b3c !important;
  border-bottom: 2px solid #d8d4c9 !important;
}

.reg-table td {
  border-bottom: 1px solid #d8d4c9 !important;
  color: #202720 !important;
}

.reg-table tr:hover td {
  background: #faf8f3 !important;
}

.site-footer {
  background: #173328 !important;
  color: #d8dfd4 !important;
  border-top: 2px solid #244b3c !important;
}

.site-footer a {
  color: #a8b5a7 !important;
}

.site-footer a:hover {
  color: #ffffff !important;
}

.site-footer h4 {
  color: #f4f1e9 !important;
  font-family: 'Playfair Display', serif !important;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1) !important;
  color: #8c988b !important;
}
`;

css += '\n' + overrides;
fs.writeFileSync('src/styles.css', css);
console.log('src/styles.css successfully created!');
