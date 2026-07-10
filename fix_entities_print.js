const fs = require('fs');

let content = fs.readFileSync('print.html', 'utf8');

const entityMap = {
    'Á': '&Aacute;',
    'É': '&Eacute;',
    'Í': '&Iacute;',
    'Ó': '&Oacute;',
    'Ú': '&Uacute;',
    'á': '&aacute;',
    'é': '&eacute;',
    'í': '&iacute;',
    'ó': '&oacute;',
    'ú': '&uacute;',
    'Ñ': '&Ntilde;',
    'ñ': '&ntilde;',
    '¿': '&iquest;',
    '¡': '&iexcl;'
};

for (const [char, entity] of Object.entries(entityMap)) {
    // Escape character for RegExp just in case, though they are safe.
    const regex = new RegExp(char, 'g');
    content = content.replace(regex, entity);
}

// We might want to fix double encodings if the file ALREADY has "Ã“" literal characters.
// From my previous check, it doesn't, but let's check and replace just in case.
const mojibakeMap = {
    'Ã¡': '&aacute;',
    'Ã©': '&eacute;',
    'Ã\xAD': '&iacute;', // with typical byte
    'Ã³': '&oacute;',
    'Ãº': '&uacute;',
    'Ã±': '&ntilde;',
    'Ã‘': '&Ntilde;',
    'Ã ': '&Aacute;',
    'Ã“': '&Oacute;'
};

for (const [char, entity] of Object.entries(mojibakeMap)) {
    content = content.split(char).join(entity);
}

fs.writeFileSync('print.html', content, 'utf8');
console.log('Fixed entities in index.html');
