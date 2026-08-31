const fs = require('fs');

const files = ['index.html', 'rorschach.html', 'zulliger.html', 'print.html', 'sw.js', 'interpretacion.js'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // If we see "Ã", it's likely double-encoded.
        if (content.includes('Ã') || content.includes(' â‌“ ')) {
            try {
                const fixed = Buffer.from(content, 'latin1').toString('utf8');
                // Only save if it looks better
                if (fixed.includes('Interpretación') || fixed.includes('Láminas') || fixed.includes('Comprehensivo')) {
                    fs.writeFileSync(file, fixed, 'utf8');
                    console.log(`Fixed mojibake in ${file}`);
                }
            } catch (e) {
                console.error(`Could not fix ${file}:`, e);
            }
        }
    }
});
