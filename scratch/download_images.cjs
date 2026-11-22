const fs = require('fs');
const { execSync } = require('child_process');
const js = fs.readFileSync('scratch/ai_universe.js', 'utf8');

const imgMatches = [...new Set([...js.matchAll(/\"(\/images\/[^\"]+\.(?:png|jpg|jpeg|gif|svg|webp))\"/g)].map(m => m[1]))];
console.log('Found ' + imgMatches.length + ' image paths:');

for (const p of imgMatches) {
  const localPath = 'public' + p;
  const dir = localPath.substring(0, localPath.lastIndexOf('/'));
  fs.mkdirSync(dir, { recursive: true });
  const url = 'https://ai-universe-2028.vercel.app' + p;
  console.log('Downloading:', p);
  try {
    execSync(`curl.exe -sL "${url}" -o "${localPath}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error('Failed:', p, err.message);
  }
}
console.log('Done downloading assets');
