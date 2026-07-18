$ErrorActionPreference = 'Stop'
Write-Host "Iniciando empaquetado seguro..." -ForegroundColor Cyan

$projDir = "C:\Users\Javier\Documents\NotebookLMA\Calculadora de Rorscharch"
$electronDir = "$projDir\electron-app"
$appDir = "$electronDir\app"
$distDir = "C:\Users\Javier\Desktop\Distribucion_Calculadora"

if (-not (Test-Path "$distDir")) { New-Item -ItemType Directory -Path "$distDir" | Out-Null }
if (-not (Test-Path "$appDir")) { New-Item -ItemType Directory -Path "$appDir" | Out-Null }

Write-Host "Limpiando archivos viejos..."
Remove-Item -Path "$appDir\*" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copiando archivos..."
Copy-Item "$projDir\*.html" -Destination "$appDir"
Copy-Item "$projDir\*.css" -Destination "$appDir"
Copy-Item "$projDir\*.js" -Destination "$appDir"

Write-Host "Inyectando Boton de Apagado (Kill Switch)..."
$killSwitchCode = @"
// --- KILL SWITCH ---
(async function() {
    try {
        const res = await fetch('https://javidomayor-cell.github.io/calculadora-rorschach/licencia.json?nocache=' + new Date().getTime());
        if (!res.ok) throw new Error('No internet');
        const data = await res.json();
        if (data.acceso !== 'permitido') {
            document.body.innerHTML = '<div style=\"display:flex;height:100vh;justify-content:center;align-items:center;font-family:sans-serif;background:#f8d7da;color:#721c24;flex-direction:column;\"><h1>ACCESO DENEGADO</h1><p>' + (data.mensaje || 'Licencia expirada.') + '</p></div>';
        }
    } catch (e) {
        document.body.innerHTML = '<div style=\"display:flex;height:100vh;justify-content:center;align-items:center;font-family:sans-serif;background:#fff3cd;color:#856404;flex-direction:column;\"><h1>ERROR DE CONEXION</h1><p>Esta aplicacion requiere conexion a internet para verificar la licencia al inicio. Por favor, conectese a WiFi y vuelva a abrirla.</p></div>';
    }
})();
"@
Add-Content -Path "$appDir\scripts.js" -Value $killSwitchCode
Add-Content -Path "$appDir\zulliger_scripts.js" -Value $killSwitchCode

Write-Host "Ofuscando codigo JavaScript (Encriptacion)..." -ForegroundColor Yellow
Set-Location "$electronDir"
.\node_modules\.bin\javascript-obfuscator "$appDir\scripts.js" --output "$appDir\scripts.js" --compact true --control-flow-flattening true --dead-code-injection true --string-array true --string-array-encoding 'base64' --disable-console-output true
.\node_modules\.bin\javascript-obfuscator "$appDir\zulliger_scripts.js" --output "$appDir\zulliger_scripts.js" --compact true --control-flow-flattening true --dead-code-injection true --string-array true --string-array-encoding 'base64' --disable-console-output true
.\node_modules\.bin\javascript-obfuscator "$appDir\interpretacion.js" --output "$appDir\interpretacion.js" --compact true --control-flow-flattening true --dead-code-injection true --string-array true --string-array-encoding 'base64' --disable-console-output true

Write-Host "Compilando Ejecutable (.exe)... Esto tomara unos minutos..." -ForegroundColor Cyan
npm run build-win

Write-Host "Moviendo .exe a la carpeta de Distribucion..."
Copy-Item "$electronDir\dist\Calculadora Rorschach.exe" -Destination "$distDir\Calculadora Rorschach.exe" -Force

Write-Host "¡PROCESO TERMINADO! El archivo encriptado esta en tu Escritorio dentro de la carpeta 'Distribucion_Calculadora'" -ForegroundColor Green
