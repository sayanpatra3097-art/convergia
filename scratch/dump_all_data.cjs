const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Let's search for the fee array in full
const feeIdx = js.indexOf('Academician / Research Scholar');
if (feeIdx !== -1) {
  const start = js.lastIndexOf('[', feeIdx);
  const end = js.indexOf(']', feeIdx) + 1;
  fs.writeFileSync('scratch/fees.json', js.slice(start, end));
  console.log('Saved fees');
}

// Search for committee in full
const commIdx = js.indexOf('biswajoy-chatterjee');
if (commIdx !== -1) {
  const start = js.lastIndexOf('[', commIdx);
  const end = js.indexOf(']', commIdx) + 1;
  fs.writeFileSync('scratch/committee.json', js.slice(start, end));
  console.log('Saved committee');
}

// Search for tracks in full
const tIdx = js.indexOf('Track 01:');
if (tIdx !== -1) {
  // Let's find full track objects
  const start = js.lastIndexOf('[', tIdx);
  const end = js.indexOf(']', tIdx) + 1;
  fs.writeFileSync('scratch/track_tabs.json', js.slice(start, end));
  console.log('Saved track tabs');
}

// Search for track detail objects
const tTopicIdx = js.indexOf('Frontier AI');
console.log('tTopicIdx:', tTopicIdx);
if (tTopicIdx !== -1) {
  const snippet = js.slice(tTopicIdx - 500, tTopicIdx + 3000);
  fs.writeFileSync('scratch/track_topics.txt', snippet);
  console.log('Saved track topics snippet');
}

// Search for important dates in full
const dIdx = js.indexOf('Paper Submission Opens on 16 April');
console.log('dIdx:', dIdx);

// Search for sponsors in full
const spIdx = js.indexOf('IEEE UEMJ Student Branch');
if (spIdx !== -1) {
  const start = js.lastIndexOf('[', spIdx);
  const end = js.indexOf(']', spIdx) + 1;
  fs.writeFileSync('scratch/sponsors.json', js.slice(start, end));
  console.log('Saved sponsors');
}
