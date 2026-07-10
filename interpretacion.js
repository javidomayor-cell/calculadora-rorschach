/**
 * Módulo de Interpretación Automática (Sistema Experto Zulliger/Rorschach)
 * Basado en las agrupaciones clínicas del Sistema Comprehensivo de Exner
 * Referencia: Reporte de Evaluación Psicolaboral CHESSSS.
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
    let reporte = "<h2 style='text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px;'>INFORME DE INTERPRETACIÓN</h2>";
    
    // Extracción de variables
    const [M, SumC] = obtenerEB();
    const D = obtenerValorNum('res_D');
    const AdjD = obtenerValorNum('res_AdjD') || obtenerValorNum('res_Adjes'); // Fallback to id used in summary
    const L = obtenerValorNum('res_L');
    const Afr = obtenerValorNum('res_Afr');
    const FC = obtenerValorNum('v_FC');
    const CF = obtenerValorNum('v_CF');
    const C = obtenerValorNum('v_C');
    const S = obtenerValorNum('v_S');
    const egocentrismo = obtenerValorNum('res_3r_R');
    const Fr = obtenerValorNum('v_Fr');
    const rF = obtenerValorNum('v_rF');
    const MOR = obtenerValorNum('v_MOR');
    const COP = obtenerValorNum('v_COP');
    const AG = obtenerValorNum('v_AG');
    const PER = obtenerValorNum('v_PER');
    const Zf = obtenerValorNum('v_Zf');
    const XA = obtenerValorNum('res_XA');
    const WDA = obtenerValorNum('res_WDA');
    const Xmenos = obtenerValorNum('res_Xmenos');
    const SumPon6 = obtenerValorNum('res_SumPon6');

    // Estilos CSS para el texto
    const pStyle = "text-align: justify; font-size: 14px; margin-bottom: 12px;";

    // ----------------------------------------------------
    // 1. SECTOR PRINCIPAL (Estilo Vivencial y Controles)
    // ----------------------------------------------------
    reporte += "<h3><u>Sector Principal</u></h3>";
    reporte += `<p style="${pStyle}">`;
    if (L > 0.99) {
        reporte += "Con respecto al valor de Lambda, se encuentra elevado, indicando una tendencia a la sobresimplificación de la percepción y resolución de situaciones, evitando involucrarse con la complejidad del entorno. ";
    } else if (L < 0.30 && L > 0) {
        reporte += "Con respecto al valor de Lambda, se encuentra disminuido, indicando un sobreinvolucramiento con los estímulos y dificultad para simplificar las situaciones, lo que puede resultar en una pérdida de eficacia. ";
    } else {
        reporte += "Con respecto al valor de Lambda, se encuentra dentro de los valores esperables, indicando una buena capacidad para la simplificación de la percepción y resolución de la situación. ";
    }

    if (M > (SumC + 1.5)) {
        reporte += "El estilo vivencial es definido de estilo introversivo, tendiendo a procesar la información internamente, utilizando la ideación y la reflexión antes de actuar, manteniendo las emociones en segundo plano al tomar decisiones. ";
    } else if (SumC > (M + 1.5)) {
        reporte += "El estilo vivencial es definido de estilo extratensivo, tendiendo a mezclar los sentimientos con sus procesos cognitivos, intercambiando con el medio y resolviendo mediante ensayo y error. ";
    } else {
        reporte += "El estilo vivencial es ambigual, observándose que el sujeto no cuenta con un patrón consistente a la hora de la toma de decisiones, oscilando entre la reflexión ideativa y el ensayo y error emocional. ";
    }

    if (D < 0) {
        if (AdjD < 0) {
            reporte += "En relación a sus recursos y tolerancia al estrés, se destaca que el sujeto presenta un estado de malestar crónico persistente frente a las demandas estimulares, dificultando el proceso de mantener y dirigir su conducta, indicando vulnerabilidad a la desorganización.";
        } else {
            reporte += "En relación a sus recursos, se observa un estado de sobrecarga situacional (estrés agudo) debido a demandas del entorno actual, aunque en condiciones habituales el sujeto posee una capacidad base adecuada para dirigir sus conductas.";
        }
    } else {
        reporte += "Se destaca que el sujeto cuenta con los recursos suficientes para hacerle frente a las ansiedades o demandas estimulares del medio, mostrando estabilidad y buen control de la conducta.";
    }
    reporte += "</p>";

    // ----------------------------------------------------
    // 2. AFECTOS
    // ----------------------------------------------------
    reporte += "<h3><u>Afectos</u></h3>";
    reporte += `<p style="${pStyle}">`;
    if (FC > (CF + C)) {
        reporte += "En la relación que existe entre sus intercambios emocionales se puede observar cómo están regidos por el control cognitivo (FC elevado), siendo cuidadoso en su expresión; utilizando la ideación como soporte para los mismos. ";
    } else if ((CF + C) > FC) {
        reporte += "En sus intercambios emocionales se observa un predominio de la espontaneidad y descarga directa de los afectos (CF+C predominante), con menor modulación cognitiva, lo que puede derivar en reacciones impulsivas. ";
    }

    if (Afr < 0.46) {
        reporte += "El Índice Afectivo (Afr) se encuentra disminuido, por lo que el sujeto presenta poco interés por procesar estímulos afectivos, o una marcada tendencia a evitar la estimulación emocional o situaciones de alta carga afectiva. ";
    } else if (Afr > 0.89) {
        reporte += "El Índice Afectivo (Afr) se encuentra elevado, indicando una fuerte atracción y receptividad a los estímulos emocionales, pudiendo verse fácilmente desbordado por ellos. ";
    }

    if (S > 3) {
        reporte += "Cabe destacar además que el valor de S se encuentra aumentado, indicando un fuerte patrón de oposición, clara hostilidad hacia el entorno, y baja tolerancia a la frustración.";
    }
    reporte += "</p>";

    // ----------------------------------------------------
    // 3. AUTOPERCEPCIÓN
    // ----------------------------------------------------
    reporte += "<h3><u>Autopercepción</u></h3>";
    reporte += `<p style="${pStyle}">`;
    if (egocentrismo < 0.33) {
        reporte += "El índice de egocentrismo se encuentra disminuido, indicando una valoración negativa de sí mismo en comparación con los demás, lo que sugiere baja autoestima o tendencia a desestimar su propio valor. ";
    } else if (egocentrismo > 0.44) {
        reporte += "El índice de egocentrismo se encuentra aumentado, significando autocentramiento, tomándose a él mismo como centro de sus preocupaciones. ";
    } else {
        reporte += "El índice de egocentrismo se encuentra dentro del rango esperable, indicando una estimación equilibrada de su propia valía. ";
    }

    if ((Fr + rF) > 0) {
        reporte += "Se nota además la existencia de componentes narcisistas y sobreestimación de la valía personal. ";
    }

    if (MOR >= 2) {
        reporte += "Su autoimagen está teñida por un pesimismo que genera una visión negativa, indicando fuertes sentimientos de desvitalización o daño (MOR elevado). ";
    }
    reporte += "</p>";

    // ----------------------------------------------------
    // 4. INTERPERSONAL
    // ----------------------------------------------------
    reporte += "<h3><u>Interpersonal</u></h3>";
    reporte += `<p style="${pStyle}">`;
    if (COP >= 2 && AG <= 2) {
        reporte += "Se observa una actitud general positiva y colaborativa hacia las relaciones interpersonales, percibiendo los intercambios como instancias de cooperación recíproca. ";
    } else if (AG > 2) {
        reporte += "Su percepción de los otros está teñida por actitudes de confrontación, percibiendo el entorno como hostil, lo que genera interacciones marcadas por la asertividad agresiva o actitud defensiva hacia los demás. ";
    }

    if (PER >= 2) {
        reporte += "El sujeto asume una posición rígida en los vínculos interpersonales, desplegando un autoritarismo intelectual como mecanismo de defensa en el encuentro con el otro. ";
    }
    
    if (COP < 2 && AG < 2 && PER < 2) {
        reporte += "En el área de relaciones interpersonales, no se registran posturas extremas de agresividad, colaboración desmedida ni rigidez vincular predominante.";
    }
    reporte += "</p>";

    // ----------------------------------------------------
    // 5. PROCESADO
    // ----------------------------------------------------
    reporte += "<h3><u>Procesado</u></h3>";
    reporte += `<p style="${pStyle}">`;
    if (Zf > 12) {
        reporte += "El valor alto de Zf destaca que el sujeto presenta un alto monto de iniciativa o motivación durante el protocolo, indicando esfuerzo de procesamiento superior al esperado, propio de autoexigencia elevada. ";
    } else if (Zf < 9) {
        reporte += "Se observa una baja motivación o déficit en el esfuerzo por integrar la información del entorno (Zf bajo). ";
    } else {
        reporte += "El esfuerzo de procesamiento y la iniciativa para integrar la información del entorno se encuentran dentro de los parámetros esperables. ";
    }
    reporte += "</p>";

    // ----------------------------------------------------
    // 6. MEDIACIÓN
    // ----------------------------------------------------
    reporte += "<h3><u>Mediación</u></h3>";
    reporte += `<p style="${pStyle}">`;
    if (XA < 0.70 || WDA < 0.75) {
        reporte += "En relación con el ajuste perceptivo, se observa que es poco convencional y no acorde a lo socialmente esperado (XA% o WDA% disminuido). ";
        if (Xmenos > 0.20) {
            reporte += "Esto se ve agravado por un elevado grado de distorsión perceptiva (X-% aumentado), indicando un alejamiento significativo de la realidad objetiva en su mediación cognitiva. ";
        }
    } else {
        reporte += "En relación con el ajuste perceptivo, el sujeto presenta una adecuada traducción de los estímulos, mostrando un enfoque convencional y un buen contacto y adaptación a la realidad objetiva. ";
    }
    reporte += "</p>";

    // ----------------------------------------------------
    // 6. IDEACIÓN
    // ----------------------------------------------------
    reporte += "<h3><u>Ideación</u></h3>";
    reporte += `<p style="${pStyle}">`;
    if (SumPon6 > 12) {
        reporte += "El sujeto no presenta claridad del pensamiento, observándose fallas lógicas o deslices cognitivos severos que interfieren en la coherencia de su ideación (SumaPond6 elevada). ";
    } else if (SumPon6 > 0 && SumPon6 <= 12) {
        reporte += "Se presentan algunos deslices cognitivos leves o inmadurez en la articulación del pensamiento, pero sin llegar a comprometer severamente el juicio de realidad. ";
    } else {
        reporte += "El sujeto presenta claridad de pensamiento, con un proceso ideativo lógico, coherente y libre de interferencias formales. ";
    }
    reporte += "</p>";

    // ----------------------------------------------------
    // 7. CONSTELACIONES (Alertas)
    // ----------------------------------------------------
    reporte += "<h3><u>Constelaciones</u></h3>";
    reporte += `<ul style="font-size: 14px; line-height: 1.6;">`;
    
    const countChecked = (prefix, max) => {
        let count = 0;
        for (let i=0; i<=max; i++) {
            const el = document.getElementById(`c_${prefix}_${i}`);
            if (el && el.checked) count++;
        }
        return count;
    };

    let constelacionesActivas = false;
    
    if (countChecked('pti', 4) >= 3) {
        reporte += "<li><b>Índice de Trastorno del Pensamiento (PTI):</b> Positivo. Indica distorsión perceptiva severa y problemas en el juicio de realidad.</li>";
        constelacionesActivas = true;
    }
    if (countChecked('depi', 6) >= 5) {
        reporte += "<li><b>Índice de Depresión (DEPI):</b> Positivo. El sujeto está experimentando una seria perturbación del estado del ánimo, caracterizado por un abatimiento anímico.</li>";
        constelacionesActivas = true;
    }
    if (countChecked('cdi', 4) >= 4) {
        reporte += "<li><b>Índice de Déficit de Afrontamiento (CDI):</b> Positivo. Dificultades crónicas para lidiar con las demandas y déficit en habilidades sociales.</li>";
        constelacionesActivas = true;
    }
    if (countChecked('scon', 11) >= 8) {
        reporte += "<li><b>Constelación de Suicidio (S-CON):</b> Positivo. Indica potencial riesgo autodestructivo inminente (ALERTA).</li>";
        constelacionesActivas = true;
    }
    if (countChecked('hvi', 7) >= 4) {
        reporte += "<li><b>Índice de Hipervigilancia (HVI):</b> Positivo. Indicando estado de alerta continua y mantenimiento de una actitud de recelo y desconfianza hacia su entorno.</li>";
        constelacionesActivas = true;
    }
    if (countChecked('obs', 4) >= 3) {
        reporte += "<li><b>Índice de Estilo Obsesivo (OBS):</b> Positivo. Marcado perfeccionismo y necesidad de control.</li>";
        constelacionesActivas = true;
    }

    if (!constelacionesActivas) {
        reporte += "<li><i>El protocolo no presenta puntuaciones positivas críticas en las constelaciones evaluadas.</i></li>";
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
        alert("Primero cargue datos y genere el sumario estructural.");
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
    
    // Clonar contenido para limpiar estilos no deseados antes de copiar
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contenido.innerHTML;
    
    navigator.clipboard.writeText(tempDiv.innerText).then(() => {
        alert("¡Informe copiado al portapapeles! Ya podés pegarlo en tu Word.");
    }).catch(err => {
        alert("Error al copiar: " + err);
    });
}
