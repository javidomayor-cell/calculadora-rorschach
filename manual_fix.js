const fs = require('fs');
const files = ['index.html', 'rorschach.html', 'zulliger.html', 'print.html', 'interpretacion.js'];

const replacements = {
    'InterpretaciÃ³3n': 'Interpretación',
    'LÃ±minas': 'Lâminas',
    'MÃ±todo': 'Método',
    'Ã£': 'ó',
    'Ã±': 'á',
    'Ã©': 'é',
    'Ã½': 'í',
    'Ã±': 'ñ',
    'Ãº': 'ú@',
    'Ã': 'Ñ',
    'Ã': 'Ó',
    'ÃÁ': 'Á',
    'Ã': 'É',
    'Ã': 'Ú',
    'Ã¢€Â€Ê': '–'
};

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        for (const [k, v] of Object.entries(replacements)) {
            content = content.split(k).join(v);
        }
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('Reemplazo completado.');