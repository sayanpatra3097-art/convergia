const fs = require('fs');

let main = fs.readFileSync('src/main.jsx', 'utf8');

// Topbar
main = main.replaceAll("fontSize: '11px'", "fontSize: '13px'");
main = main.replaceAll("fontSize: '10px'", "fontSize: '12px'");
main = main.replaceAll("fontSize: '12px'", "fontSize: '14px'");
main = main.replaceAll("fontSize: '13px'", "fontSize: '15px'");
main = main.replaceAll("fontSize: '14px'", "fontSize: '16px'");
main = main.replaceAll("fontSize: '15px'", "fontSize: '17px'");
main = main.replaceAll("fontSize: '16px'", "fontSize: '18px'");
main = main.replaceAll("fontSize: '17px'", "fontSize: '19px'");
main = main.replaceAll("fontSize: '18px'", "fontSize: '20px'");
main = main.replaceAll("fontSize: '19px'", "fontSize: '22px'");
main = main.replaceAll("fontSize: '20px'", "fontSize: '24px'");
main = main.replaceAll("fontSize: '24px'", "fontSize: '28px'");
main = main.replaceAll("fontSize: '32px'", "fontSize: '38px'");
main = main.replaceAll("fontSize: '36px'", "fontSize: '42px'");
main = main.replaceAll("fontSize: '38px'", "fontSize: '44px'");
main = main.replaceAll("clamp(38px, 5vw, 62px)", "clamp(46px, 6vw, 72px)");

fs.writeFileSync('src/main.jsx', main);
console.log('Scaled font sizes in src/main.jsx');
