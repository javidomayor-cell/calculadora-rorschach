const fs = require('fs');
const files = ['index.html', 'rorschach.html', 'zulliger.html', 'print.html'];
const inject = `
  <link rel="manifest" href="./manifest.json">
  <meta name="theme-color" content="#4a90e2">
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('SW registrado!', reg))
          .catch(err => console.log('SW fallo', err);
      });
    }
  </script>
</head>`;

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace('</head>', inject);
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('Archivos inyectados con Node.js correctamente');