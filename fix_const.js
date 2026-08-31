const fs = require('fs');

const files = ['rorschach.html', 'zulliger.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Force-fix the mojibake by finding Sistema Comprehensivo and replacing the messed up dash
        content = content.replace(/Sistema Comprehensivo.+?M&eacute;todo/g, 'Sistema Comprehensivo - M&eacute;todo');
        
        // Remove the HOJA DE CONSTELACIONES block from the printTemplate if it's there
        if (content.includes('HOJA DE CONSTELACIONES')) {
            const startIndex = content.indexOf('<div class="page" style="page-break-before: always;">');
            if (startIndex !== -1 && content.indexOf('HOJA DE CONSTELACIONES') > startIndex) {
                const endIndex = content.indexOf('</body>', startIndex);
                if (endIndex !== -1) {
                    // We remove from startIndex to endIndex (skipping the whole page div)
                    content = content.substring(0, startIndex) + content.substring(endIndex);
                }
            }
        }
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('Reemplazo y remoción completados.');