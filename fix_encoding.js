const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements object
const replacements = {
    'LÃ MINA': 'LÁMINA',
    'TÃ TULO': 'TÍTULO',
    'Ã NDICES': 'ÍNDICES',
    'MEDIACIÃ“N': 'MEDIACIÓN',
    'SECCIÃ“N': 'SECCIÓN',
    'LOCALIZACIÃ“N': 'LOCALIZACIÓN',
    'IdeaciÃ³n': 'Ideación',
    'PercepciÃ³n': 'Percepción',
    'percepciÃ³n': 'percepción',
    'AutopercepciÃ³n': 'Autopercepción',
    'DepresiÃ³n': 'Depresión',
    'depresiÃ³n': 'depresión',
    'â”€â”€': '──',
    'Ã“': 'Ó',
    'Ã³': 'ó',
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã\xAD': 'í', // Handling possible escape sequence for Ã followed by non-printable or byte 0xAD
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Ã‘': 'Ñ',
    'Ã ': 'Á'
};

// First try decoding if it was double-encoded:
try {
    const doubleDecoded = Buffer.from(content, 'latin1').toString('utf8');
    if (doubleDecoded.includes('MEDIACIÓN')) {
        console.log('Successfully fixed using latin1 to utf8 conversion!');
        fs.writeFileSync(filePath, doubleDecoded, 'utf8');
        process.exit(0);
    }
} catch (e) {
    console.log('Double decode failed, trying manual replacements.');
}

// Do manual replacements
let modified = false;
for (const [key, value] of Object.entries(replacements)) {
    if (content.includes(key)) {
        console.log(`Replacing occurrences of ${key} with ${value}`);
        content = content.split(key).join(value);
        modified = true;
    }
}

// Try to catch the specific 'Ã' followed by invisible char if it exists
if (content.match(/Ã./g)) {
   const matches = new Set(content.match(/Ã./g));
   console.log('Found remaining mojibake sequences:', Array.from(matches).map(m => Array.from(m).map(c => c.charCodeAt(0).toString(16))));
   
   // Apply common byte patterns
   content = content.replace(/Ã\x81/g, 'Á');
   content = content.replace(/Ã\x8D/g, 'Í');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished manual replacements.');
