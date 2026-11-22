const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Let's find all the major arrays and objects defined in the bundle:
// 1. Tracks details
// 2. Dates details
// 3. Committee members
// 4. Registration fees
// 5. Sponsors / Marquee logos
// 6. Venue info

// Search for fee table or registration data
const feeMatch = js.match(/\[\{[^\]]*category:[^\]]*ieee:[^\]]*\}\]/) || js.match(/fees\s*=\s*\[[^\]]+\]/);
console.log('Fee match:', feeMatch ? feeMatch[0].slice(0, 300) : 'none');

// Let's find all objects with title, topics
const allTracksMatch = js.match(/tracks\s*=\s*\[[^\]]+\]/) || js.match(/\[\{id:\"track-1\"[^\]]+\}\]/);
console.log('Tracks match:', allTracksMatch ? allTracksMatch[0].slice(0, 300) : 'none');

// Let's inspect where registration component is defined
const regIdx = js.indexOf('registration-table');
if (regIdx !== -1) {
  console.log('Reg snippet:', js.slice(regIdx - 200, regIdx + 800));
}
