const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
let idx = content.indexOf('IDEACI');
if (idx !== -1) {
    console.log("Substring at IDEACI: ", content.substring(idx, idx + 20));
    console.log("Bytes of this substring: ");
    const buf = Buffer.from(content.substring(idx, idx + 20), 'utf8');
    console.log(buf.toString('hex'));
} else {
    console.log("IDEACI not found in utf8 text");
}

let c2 = fs.readFileSync('index.html', 'latin1');
idx = c2.indexOf('IDEACI');
if (idx !== -1) {
    console.log("Latin1 substring at IDEACI: ", c2.substring(idx, idx + 20));
    const buf = Buffer.from(c2.substring(idx, idx + 20), 'latin1');
    console.log(buf.toString('hex'));
} else {
    console.log("IDEACI not found in latin1 text");
}
