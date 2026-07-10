$file = Join-Path $PSScriptRoot 'index.html'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# --- 1. CSS: agregar clase .val-error ---
$cssOld = "            .row span.val {
                font-size: 8px !important;
                min-width: 16px !important;
            }"
$cssNew = "            .row span.val {
                font-size: 8px !important;
                min-width: 16px !important;
            }
            /* Validacion: porcentaje imposible > 1 */
            .val-error {
                color: #ff3b3b !important;
                font-weight: bold !important;
                background: rgba(255,59,59,0.12) !important;
                border-radius: 3px !important;
                padding: 0 3px !important;
                cursor: help;
            }"

if ($content.Contains($cssOld)) {
    $content = $content.Replace($cssOld, $cssNew)
    Write-Host "OK: CSS agregado"
} else {
    Write-Host "SKIP: bloque CSS no encontrado (puede que ya este aplicado)"
}

# --- 2. JS: reemplazar linea set('res_XA'...) por const xa_val + set ---
$jsXA_old = "set('res_XA', R > 0 ? ((FQx_plus + FQx_o + FQx_u)/R) : 0);"
$jsXA_new = "const xa_val  = R > 0 ? ((FQx_plus + FQx_o + FQx_u)/R) : 0; set('res_XA', xa_val);"
if ($content.Contains($jsXA_old)) {
    $content = $content.Replace($jsXA_old, $jsXA_new)
    Write-Host "OK: xa_val refactorizado"
} else {
    Write-Host "SKIP: linea XA no encontrada"
}

# --- 3. JS: reemplazar linea set('res_WDA'...) por const wda_val + set ---
$jsWDA_old = "set('res_WDA', (W+D) > 0 ? ((get('v_WD_plus') + get('v_WD_o') + get('v_WD_u'))/(W+D)) : 0);"
$jsWDA_new = "const wda_val = (W+D) > 0 ? ((get('v_WD_plus') + get('v_WD_o') + get('v_WD_u'))/(W+D)) : 0; set('res_WDA', wda_val);"
if ($content.Contains($jsWDA_old)) {
    $content = $content.Replace($jsWDA_old, $jsWDA_new)
    Write-Host "OK: wda_val refactorizado"
} else {
    Write-Host "SKIP: linea WDA no encontrada"
}

# --- 4. JS: agregar bloque de validacion despues de res_Sminus_perc ---
$jsEnd_old = "set('res_Sminus_perc', S > 0 ? (get('v_SQx_minus')/S) : 0);"
$jsEnd_new = "set('res_Sminus_perc', S > 0 ? (get('v_SQx_minus')/S) : 0);

        // Validacion visual: porcentajes deben ser <= 1
        const elXA  = document.getElementById('res_XA');
        const elWDA = document.getElementById('res_WDA');
        if (elXA)  {
            elXA.classList.toggle('val-error',  xa_val  > 1);
            elXA.title  = xa_val  > 1 ? 'Error: XA% > 100%. Verifica que FQx+ + FQxo + FQxu <= R.' : '';
        }
        if (elWDA) {
            elWDA.classList.toggle('val-error', wda_val > 1);
            elWDA.title = wda_val > 1 ? 'Error: WDA% > 100%. Verifica que WD+ + WDo + WDu <= W+D.' : '';
        }"

if ($content.Contains($jsEnd_old)) {
    $content = $content.Replace($jsEnd_old, $jsEnd_new)
    Write-Host "OK: bloque de validacion agregado"
} else {
    Write-Host "SKIP: linea Sminus_perc no encontrada"
}

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Archivo guardado OK"
