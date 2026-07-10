/**
 * Módulo de Interpretación Automática (Sistema Experto Zulliger/Rorschach)
 * Basado en las reglas matemáticas del Sistema Comprehensivo de Exner.
 */

function obtenerValorNum(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const txt = el.innerText || el.value;
    if (txt === "Inf") return 999;
    return parseFloat(txt.replace(',', '.')) || 0;
}

function obtenerEB() {
    const el = document.getElementById('res_EB');
    if (!el) return [0, 0];
    const partes = el.innerText.split(':');
    if (partes.length !== 2) return [0, 0];
    return [parseFloat(partes[0]) || 0, parseFloat(partes[1]) || 0];
}

function generarInterpretacion() {
    let reporte = "<h3>INFORME DE INTERPRETACIÓN ESTRUCTURAL</h3>";
    
    // 1. ESTILO VIVENCIAL Y CONTROLES (EB, EA, eb, es, D, AdjD)
    reporte += "<h4>1. Estilo Vivencial y Tolerancia al Estrés</h4><ul>";
    
    const [M, SumC] = obtenerEB();
    const EA = obtenerValorNum('res_EA');
    const D = obtenerValorNum('res_D');
    const AdjD = obtenerValorNum('res_AdjEs'); // In the HTML, AdjD is actually res_AdjEs according to the previous run, wait let's check it.
    
    // Determinar estilo
    if (M > (SumC + 1.5)) {
        reporte += "<li><b>Estilo Introversivo:</b> El paciente prefiere procesar la información internamente, utilizando la ideación y la reflexión antes de actuar. Tiende a mantener sus emociones en segundo plano al tomar decisiones.</li>";
    } else if (SumC > (M + 1.5)) {
        reporte += "<li><b>Estilo Extratensivo:</b> El paciente es más propenso a descargar sus emociones en el entorno. Sus decisiones están fuertemente influenciadas por los afectos y el ensayo y error.</li>";
    } else if (M > 0 || SumC > 0) {
        reporte += "<li><b>Estilo Ambigual:</b> El paciente no tiene un estilo de afrontamiento consistente. Alterna entre la ideación y la expresión emocional, lo que puede volverlo impredecible en la toma de decisiones y propenso a la duda.</li>";
    } else {
        reporte += "<li><b>Estilo Coartado:</b> Hay una marcada restricción de los recursos psicológicos (ideativos y afectivos), lo que dificulta el afrontamiento de las exigencias del entorno.</li>";
    }

    // Tolerancia al estrés (D)
    const D_val = obtenerValorNum('res_D') || 0;
    const AdjD_val = obtenerValorNum('res_AdjEs') || 0; 
    
    if (D_val < 0) {
        if (AdjD_val < 0) {
            reporte += "<li><b>Sobrecarga Crónica (D<0, AdjD<0):</b> El sujeto padece una sobrecarga de estímulos perturbadores de larga data. Es vulnerable a la desorganización, ansiedad y tiene controles frágiles ante el estrés.</li>";
        } else {
            reporte += "<li><b>Estrés Situacional (D<0, AdjD=0):</b> El paciente está atravesando un estado de estrés agudo debido a situaciones recientes, pero sus capacidades base de control son adecuadas.</li>";
        }
    } else if (D_val > 0) {
        reporte += "<li><b>Capacidad de Control (D>0):</b> Excelente tolerancia al estrés. El paciente tiene recursos de sobra para lidiar con situaciones complejas sin desorganizarse.</li>";
    } else {
        reporte += "<li><b>Equilibrio Precario (D=0):</b> Los recursos empatan con las demandas. Funciona bien en lo cotidiano, pero situaciones nuevas o estresantes podrían desestabilizarlo.</li>";
    }
    reporte += "</ul>";

    // 2. AFECTOS
    reporte += "<h4>2. Área Afectiva</h4><ul>";
    const Afr = obtenerValorNum('res_Afr');
    if (Afr < 0.46) {
        reporte += "<li><b>Evitación Afectiva (Afr bajo):</b> Tendencia a evitar o retirarse de situaciones con alta carga emocional. Le incomodan los estímulos afectivos directos.</li>";
    } else if (Afr > 0.89) {
        reporte += "<li><b>Atracción Afectiva (Afr alto):</b> Fuerte atracción hacia estímulos emocionales. Puede verse fácilmente desbordado o sobre-estimulado por situaciones afectivas.</li>";
    } else {
        reporte += "<li><b>Interés Afectivo Esperable:</b> Muestra una receptividad normal y adaptativa frente a los estímulos emocionales del entorno.</li>";
    }
    reporte += "</ul>";

    // 3. PROCESAMIENTO Y MEDIACIÓN
    reporte += "<h4>3. Procesamiento y Mediación Cognitiva</h4><ul>";
    const L = obtenerValorNum('res_L');
    if (L > 0.99) {
        reporte += "<li><b>Rigidez (L alto):</b> Enfoque excesivamente simplificador y rígido. Evita la complejidad, lo que le impide percibir matices sutiles en su entorno.</li>";
    } else if (L > 0 && L < 0.30) {
        reporte += "<li><b>Complejidad (L bajo):</b> Involucramiento excesivo con la complejidad. Puede que le cueste filtrar información innecesaria, perdiéndose en los detalles.</li>";
    } else {
        reporte += "<li><b>Procesamiento Adaptativo (L normal):</b> Equilibrio adecuado entre simplificación y atención a la complejidad.</li>";
    }
    reporte += "</ul>";

    // 4. ÍNDICES ESPECIALES
    reporte += "<h4>4. Alertas Clínicas (Índices Especiales)</h4><ul>";
    
    const countChecked = (prefix, max) => {
        let count = 0;
        for (let i=0; i<=max; i++) {
            const el = document.getElementById(`c_${prefix}_${i}`);
            if (el && el.checked) count++;
        }
        return count;
    };

    const pti_count = countChecked('pti', 4);
    if (pti_count >= 3) reporte += "<li>⚠️ <b>Índice de Trastorno del Pensamiento (PTI):</b> Positivo. Indica fallas severas en la mediación cognitiva, distorsión perceptiva y problemas en el juicio de realidad.</li>";
    
    const depi_count = countChecked('depi', 6);
    if (depi_count >= 5) reporte += "<li>⚠️ <b>Índice de Depresión (DEPI):</b> Positivo. Indica intensa aflicción emocional, desesperanza o rasgos depresivos significativos.</li>";
    
    const cdi_count = countChecked('cdi', 4);
    if (cdi_count >= 4) reporte += "<li>⚠️ <b>Índice de Déficit de Afrontamiento (CDI):</b> Positivo. Dificultades crónicas para lidiar con las demandas cotidianas, inmadurez en las relaciones interpersonales.</li>";
    
    const scon_count = countChecked('scon', 11);
    if (scon_count >= 8) reporte += "<li>⚠️ <b>Constelación de Suicidio (S-CON):</b> Positivo. ALERTA CLÍNICA grave. Riesgo elevado de conductas autoagresivas.</li>";
    
    const hvi_count = countChecked('hvi', 7);
    if (hvi_count >= 4) reporte += "<li>⚠️ <b>Índice de Hipervigilancia (HVI):</b> Positivo. Actitud de desconfianza, escrutinio constante del entorno y paranoia defensiva.</li>";
    
    const obs_count = countChecked('obs', 4);
    if (obs_count >= 3) reporte += "<li>⚠️ <b>Índice de Estilo Obsesivo (OBS):</b> Positivo. Marcado perfeccionismo, rumiación excesiva y necesidad patológica de control y exactitud.</li>";

    if (pti_count < 3 && depi_count < 5 && cdi_count < 4 && scon_count < 8 && hvi_count < 4 && obs_count < 3) {
        reporte += "<li><i>No se han activado alertas críticas en los índices patológicos.</i></li>";
    }
    reporte += "</ul>";

    return reporte;
}

function mostrarModalInterpretacion() {
    const modal = document.getElementById('modal-interpretacion');
    const contenido = document.getElementById('contenido-interpretacion');
    
    if (modal && contenido) {
        contenido.innerHTML = generarInterpretacion();
        modal.style.display = 'flex';
    } else {
        alert("Primero cargue datos y luego abra la interpretación.");
    }
}

function cerrarModalInterpretacion() {
    const modal = document.getElementById('modal-interpretacion');
    if (modal) {
        modal.style.display = 'none';
    }
}

function copiarInterpretacion() {
    const contenido = document.getElementById('contenido-interpretacion');
    if (!contenido) return;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contenido.innerHTML;
    const textToCopy = tempDiv.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("¡Informe copiado al portapapeles! Ya podés pegarlo en tu Word.");
    }).catch(err => {
        alert("Error al copiar: " + err);
    });
}
