const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
let m = content.match(/Interpretaci.+?n/g);
if (m) {
    m.forEach(item => {
        console.log(item, Array.from(item).map(c => c.charCodeAt(0).toString(16)));
    });
}