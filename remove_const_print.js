const fs = require('fs');

const files = ['rorschach.html', 'zulliger.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        const startMarker = '<!-- PAGE 2: HOJA DE CONSTELACIONES -->';
        const endMarker = '</body>';
        
        const startIndex = content.indexOf(startMarker);
        if (startIndex !== -1) {
            const endIndex = content.indexOf(endMarker, startIndex);
            if (endIndex !== -1) {
                content = content.substring(0, startIndex) + content.substring(endIndex);
                fs.writeFileSync(file, content, 'utf8');
                console.log(`Removed page 2 from ${file}`);
            }
        }
    }
});