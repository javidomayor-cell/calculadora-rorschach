const fs = require('fs');

const files = ['rorschach.html', 'zulliger.html'];

const signatureHtml = `\n  <div style="margin-top: 50px; text-align: right; padding-right: 50px;">\n    <div style="border-bottom: 1px solid #000; display: inline-block; width: 200px; text-align: center; padding-bottom: 5px;">\n      <img src="firma.png" alt="Firma" style="max-height: 80px; max-width: 190px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">\n      <span style="display: none; font-family: 'Caveat', cursive, sans-serif; font-size: 24px;">J.A. Vidal Robles</span>\n    </div>\n    <div style="font-size: 10pt; color: #333; margin-top: 5px; padding-right: 20px;">Firma del Profesional</div>\n  </div>\n`;

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        if (content.includes('</body></html>')) {
            content = content.replace('</body></html>', signatureHtml + '</body></html>');
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Agregado a ${file}`);
        }
    }
});