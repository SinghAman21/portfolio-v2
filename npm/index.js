#!/usr/bin/env node

const baseUrl = 'https://useraman.me';

const colors = {
  reset: '\x1b[0m', bold: '\x1b[1m', underline: '\x1b[4m',
  brightCyan: '\x1b[96m', brightMagenta: '\x1b[95m', brightYellow: '\x1b[93m',
  brightGreen: '\x1b[92m', green: '\x1b[32m', brightWhite: '\x1b[97m'
};

function createHyperlink(text, url) {
  return `\x1b]8;;${url}\x1b\\${text}\x1b]8;;\x1b\\`;
}

console.log('\x1b[2J\x1b[H');

// Clean, tasteful header
console.log(`${colors.brightCyan}${colors.bold}`);
console.log(`
  
       d8888                                       .d8888b.  d8b                   888      
      d88888                                      d88P  Y88b Y8P                   888      
     d88P888                                      Y88b.                            888      
    d88P 888 88888b.d88b.   8888b.  88888b.        "Y888b.   888 88888b.   .d88b.  88888b.  
   d88P  888 888 "888 "88b     "88b 888 "88b          "Y88b. 888 888 "88b d88P"88b 888 "88b 
  d88P   888 888  888  888 .d888888 888  888            "888 888 888  888 888  888 888  888 
 d8888888888 888  888  888 888  888 888  888      Y88b  d88P 888 888  888 Y88b 888 888  888 
d88P     888 888  888  888 "Y888888 888  888       "Y8888P"  888 888  888  "Y88888 888  888 
                                                                               888          
                                                                          Y8b d88P          
                                                                           "Y88P"           
`);
console.log(`${colors.brightMagenta}${colors.bold}`);
console.log(``);
console.log(`${colors.reset}\n`);

// Profile
console.log(`${colors.brightYellow}${colors.bold}Full-Stack Developer | Mumbai, India${colors.reset}`);
// console.log(`${colors.green}${colors.italic}Graphex • Watchtower • SilentParcel${colors.reset}\n`);

const routes = [
  { label: '🏠 Home', path: '/' }, { label: '💼 Experience', path: '/experience' },
  { label: '🧪 Projects', path: '/projects' }, { label: '📝 Blog', path: '/blog' },
  { label: '👤 About', path: '/about' }, { label: '📄 Resume', path: '/resume' }
];

console.log(`${colors.brightCyan}${colors.bold}🗺️ → Navigation${colors.reset}`);
routes.forEach(r => {
  const link = createHyperlink(r.label, `${baseUrl}${r.path}`);
  console.log(`  ${colors.green}→ ${colors.brightWhite}${link}${colors.reset}`);
});

console.log(`\n${colors.brightGreen}${colors.bold}🌐 → Connect${colors.reset}`);
console.log(`  𝕏 ${createHyperlink('@SinghAman21_', 'https://x.com/SinghAman21_')}  💻 ${createHyperlink('SinghAman21', 'https://github.com/SinghAman21')}`);
console.log(`  ✉️  ${createHyperlink('singhaman21@proton.me', 'mailto:singhaman21@proton.me')}`);

console.log(`\n${colors.brightWhite}${colors.italic}"You shall work hard enough to become better than yesterday's you"${colors.reset}`);
