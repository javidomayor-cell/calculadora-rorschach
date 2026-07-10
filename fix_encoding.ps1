$path = 'c:\Users\Javier\Documents\NotebookLMA\Calculadora de Rorscharch\index.html'

$utf8 = [System.Text.Encoding]::UTF8
$b2 = [System.IO.File]::ReadAllBytes($path)
$s = $utf8.GetString($b2)

# Manual replacements on the mojibake string
$s = $s -replace 'LÃ.MINA', 'LÁMINA'
$s = $s -replace 'TÃ.TULO', 'TÍTULO'
$s = $s -replace 'Ã.NDICES', 'ÍNDICES'
$s = $s -replace 'MEDIACIÃ“N', 'MEDIACIÓN'
$s = $s -replace 'SECCIÃ“N', 'SECCIÓN'
$s = $s -replace 'LOCALIZACIÃ“N', 'LOCALIZACIÓN'
$s = $s -replace 'IdeaciÃ³n', 'Ideación'
$s = $s -replace 'PercepciÃ³n', 'Percepción'
$s = $s -replace 'percepciÃ³n', 'percepción'
$s = $s -replace 'AutopercepciÃ³n', 'Autopercepción'
$s = $s -replace 'DepresiÃ³n', 'Depresión'
$s = $s -replace 'depresiÃ³n', 'depresión'
$s = $s -replace 'â”€â”€', '──'
$s = $s -replace 'Ã“', 'Ó'
$s = $s -replace 'Ã³', 'ó'
$s = $s -replace 'Ã¡', 'á'
$s = $s -replace 'Ã©', 'é'
$s = $s -replace 'Ã­', 'í'
$s = $s -replace 'Ãº', 'ú'
$s = $s -replace 'Ã±', 'ñ'
$s = $s -replace 'Ã‘', 'Ñ'
$s = $s -replace 'Ã ', 'Á'

[System.IO.File]::WriteAllText($path, $s, $utf8)
Write-Host "Replaced encodings and updated index.html"
