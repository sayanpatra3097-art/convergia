const fs = require('fs');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

// Find all object declarations and data structures
// Let's write out chunks of the JS to inspect the components
// Look for App or sections
fs.writeFileSync('scratch/beautified_snippets.txt', '');

function append(title, text) {
  fs.appendFileSync('scratch/beautified_snippets.txt', '\n\n=== ' + title + ' ===\n' + text);
}

// Find conference metadata
const confMatch = js.match(/\{[^}]*venueName:[^}]*\}/);
if (confMatch) append('CONF METADATA', confMatch[0]);

// Find tracks array
const trackMatch = js.match(/\[\{[^\]]*Track 01[^\]]*\}\]/);
if (trackMatch) append('TRACKS', trackMatch[0]);

// Find important dates
const datesMatch = js.match(/\[\{[^\]]*Paper Submission Opens[^\]]*\}\]/);
if (datesMatch) append('IMPORTANT DATES', datesMatch[0]);

// Find committee array
const commMatch = js.match(/\[\{[^\]]*Banani[^\]]*\}\]/) || js.match(/committee[^=]*=\s*\[[^\]]+\]/);
if (commMatch) append('COMMITTEE', commMatch[0]);

// Find nav links
const navMatch = js.match(/\[\{[^\]]*href:\"#about\"[^\]]*\}\]/) || js.match(/nav[^=]*=\s*\[\{[^\]]*about[^\]]*\}\]/);
if (navMatch) append('NAV', navMatch[0]);

console.log('Done searching snippets');
