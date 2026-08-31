const fs = require('fs');

const footer = `
<footer style="margin-top: 40px; padding: 20px; text-align: center; border-top: 1px solid #334155; color: #94a3b8; font-size: 0.9rem;">
    <div style="margin-bottom: 10px;">
        <img src="logo-firma.png" alt="Firma J.A. Vidal Robles" style="max-height: 60px; object-fit: contain; filter: invert(1); opacity: 0.8;" onerror="this.style.display='none'">
    </div>
    <div style="font-weight: bold; color: #e2e8f0; font-size: 1.1rem;">J.A. Vidal Robles</div>
    <div style="margin-top: 5px;">Creador y Desarrollador</div>
    <div style="margin-top: 10px; font-size: 0.85rem;">
        Si tienes dudas o deseas contactarme sobre esta aplicación:<br>
        <a id="author-contact" href="mailto:CORREO@AQUI.COM" style="color: #60a5fa; text-decoration: none;">📨 Escríbeme aquí</a>
    </div>
</footer>`;

const files = ['index.html', 'rorschach.html', 'zulliger.html'];
files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('J.A. Vidal Robles')) {
            const target = '</body>';
            let lastBodyIndex = content.lastIndexOf(target);
            if (lastBodyIndex !== -1) {
                content = content.substring(0, lastBodyIndex) + footer + '\n' + target + content.substring(lastBodyIndex + target.length);
                fs.writeFileSync(file, content, 'utf8');
                console.log('Footer agregado a ' + file);
            }
        }
    }
});