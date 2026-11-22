const fs = require('fs');

// 1. Add animations to src/styles.css
let css = fs.readFileSync('src/styles.css', 'utf8');

const marqueeCss = `
/* Infinite Smooth Marquee Animations */
@keyframes marqueeFloat {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

@keyframes marqueeContinuous {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

@keyframes ticker-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.floating-marquee-track {
  display: flex !important;
  align-items: center !important;
  gap: 28px !important;
  width: max-content !important;
  animation: marqueeFloat 24s linear infinite !important;
  will-change: transform !important;
}

.floating-marquee-track:hover {
  animation-play-state: paused !important;
}

.ticker-track {
  display: inline-flex !important;
  width: max-content !important;
  gap: 48px !important;
  animation: ticker-scroll 35s linear infinite !important;
  will-change: transform !important;
}

.ticker-track:hover {
  animation-play-state: paused !important;
}
`;

css += '\n' + marqueeCss;
fs.writeFileSync('src/styles.css', css);
console.log('Appended marquee animations to styles.css');

// 2. Update src/main.jsx to keep logos only and remove names/text
let main = fs.readFileSync('src/main.jsx', 'utf8');

// Replace the ticker track tag
main = main.replace(
  '<div className="ticker-track" style={{ display: \'inline-flex\', gap: \'48px\', animation: \'marqueeContinuous 35s linear infinite\' }}>',
  '<div className="ticker-track">'
);

// Replace the publication marquee
const oldMarquee = `<div style={{ overflow: 'hidden', display: 'flex', width: '100%', padding: '24px 0' }}>
                  <div className="floating-marquee-track" style={{ display: 'flex', gap: '20px', animation: 'marqueeContinuous 25s linear infinite' }}>
                    {[...publicationPartners, ...publicationPartners, ...publicationPartners].map((p, idx) => (
                      <div
                        key={idx}
                        className="marquee-logo-card"
                        style={{
                          flexShrink: 0, width: '260px', padding: '16px 20px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', gap: '16px'
                        }}
                      >
                        <img src={p.img} alt={p.name} style={{ width: '56px', height: '42px', objectFit: 'contain' }} />
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px', color: '#244b3c', lineHeight: 1.3 }}>{p.name}</strong>
                          <span style={{ fontSize: '11px', color: '#c76d42', fontWeight: 500 }}>{p.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>`;

const newMarquee = `<div style={{ overflow: 'hidden', display: 'flex', width: '100%', padding: '24px 0' }}>
                  <div className="floating-marquee-track">
                    {[...publicationPartners, ...publicationPartners, ...publicationPartners, ...publicationPartners].map((p, idx) => (
                      <div
                        key={idx}
                        className="marquee-logo-card"
                        style={{
                          flexShrink: 0,
                          width: '180px',
                          height: '76px',
                          padding: '12px 20px',
                          borderRadius: '8px',
                          display: 'grid',
                          placeItems: 'center',
                          background: '#ffffff',
                          border: '1px solid #d8d4c9',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}
                      >
                        <img
                          src={p.img}
                          alt={p.name}
                          style={{
                            maxHeight: '44px',
                            maxWidth: '136px',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>`;

if (main.includes(oldMarquee)) {
  main = main.replace(oldMarquee, newMarquee);
  console.log('Replaced publication marquee with logos only');
} else {
  console.log('Could not find exact oldMarquee, finding substring');
  const startIdx = main.indexOf('<div className="floating-marquee-track"');
  if (startIdx !== -1) {
    const endIdx = main.indexOf('</div>', main.indexOf('</section>', startIdx) - 50) + 6;
    console.log('Replacing from', startIdx, 'to', endIdx);
  }
}

fs.writeFileSync('src/main.jsx', main);
console.log('Updated src/main.jsx');
