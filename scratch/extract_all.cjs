const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Find all 4 tracks
const tIdx = js.indexOf('number:"01"');
const tStart = js.lastIndexOf('[', tIdx);
const tEnd = js.indexOf(']', js.indexOf('number:"04"')) + 1;
const tracksRaw = js.slice(tStart, tEnd);
fs.writeFileSync('scratch/all_tracks.json', tracksRaw);

// Find important dates
const datesIdx = js.indexOf('Paper Submission Opens');
const dStart = js.lastIndexOf('[', js.lastIndexOf('role:', datesIdx));
const dEnd = js.indexOf(']', datesIdx) + 1;
fs.writeFileSync('scratch/all_dates.json', js.slice(dStart, dEnd));

console.log('Tracks saved length:', tracksRaw.length);
console.log('Dates saved length:', js.slice(dStart, dEnd).length);
