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
    
    const [M, SumC] = obtenerEB();
    const WSumC = obtenerValorNum('res_WSumC') || SumC; 
    const D = obtenerValorNum('res_D');
    const AdjD = obtenerValorNum('res_AdjD') || obtenerValorNum('res_Adjes'); 
    const L = obtenerValorNum('res_L');
    const Afr = obtenerValorNum('res_Afr');
    const FC = obtenerValorNum('v_FC');
    const CF = obtenerValorNum('v_CF');
    const C = obtenerValorNum('v_C');
    const S = obtenerValorNum('v_S');
    const egocentrismo = obtenerValorNum('res_3r_R') || obtenerValorNum('res_3r2R'); 
    const Fr = obtenerValorNum('v_Fr');
    const rF = obtenerValorNum('v_rF');
    const MOR = obtenerValorNum('v_MOR');
    const COP = obtenerValorNum('v_COP');
    const AG = obtenerValorNum('v_AG');
    const PER = obtenerValorNum('v_PER');
    const Zf = obtenerValorNum('v_Zf');
    const XA = obtenerValorNum('res_XA');
    const WDA = obtenerValorNum('res_WDA');
    const Xmenos = obtenerValorNum('res_Xmenos') || obtenerValorNum('res_Xminus');
    const SumPon6 = obtenerValorNum('res_SumPon6') || obtenerValorNum('res_SumPon6_ide');
    const p = obtenerValorNum('v_p');
    const a = obtenerValorNum('v_a');
    const Mmenos = obtenerValorNum('v_Mmenos');
    const Mp = obtenerValorNum('v_Mp');
    const Ma = obtenerValorNum('v_Ma');
    const EA = obtenerValorNum('res_EA');

    const countChecked = (prefix, max) => {
        let count = 0;
        for (let i=0; i<=max; i++) {
            const el = document.getElementById(`c_${prefix}_${i}`);
            if (el && el.checked) count++;
        }
        return count;
    };

    const PTI = countChecked('pti', 4);
    const DEPI = countChecked('depi', 6);
    const CDI = countChecked('cdi', 4);
    const SCON = countChecked('scon', 11);
    const HVI = countChecked('hvi', 7);
    const OBS = countChecked('obs', 4);

    const pStyle = "text-align: justify; font-size: 14px; margin-bottom: 12px;";

    const clusters = {};

    let txtControles = "<h3><u>Controles y Tolerancia al Estrés</u></h3><p style='" + pStyle + "'>";
    if (L > 0.99) {
        txtControles += "Con respecto al valor de Lambda, se encuentra elevado, indicando una tendencia a la sobresimplificación de la percepción y resolución de situaciones, evitando involucrarse con la complejidad del entorno. ";
    } else if (L < 0.30 && L > 0) {
        txtControles += "Con respecto al valor de Lambda, se encuentra disminuido, indicando un sobreinvolucramiento con los estímulos y dificultad para simplificar las situaciones, lo que puede resultar en una pérdida de eficacia. ";
    } else {
        txtControles += "Con respecto al valor de Lambda, se encuentra dentro de los valores esperables, indicando una buena capacidad para la simplificación de la percepción y resolución de la situación. ";
    }

    if (M > (WSumC + 1.5)) {
        txtControles += "El estilo vivencial es definido de estilo introversivo, tendiendo a procesar la información internamente, utilizando la ideación y la reflexión antes de actuar, manteniendo las emociones en segundo plano al tomar decisiones. ";
    } else if (WSumC > (M + 1.5)) {
        txtControles += "El estilo vivencial es definido de estilo extratensivo, tendiendo a mezclar los sentimientos con sus procesos cognitivos, intercambiando con el medio y resolviendo mediante ensayo y error. ";
    } else {
        txtControles += "El estilo vivencial es ambigual, observándose que el sujeto no cuenta con un patrón consistente a la hora de la toma de decisiones, oscilando entre la reflexión ideativa y el ensayo y error emocional. ";
    }

    if (D < 0) {
        if (AdjD < 0) {
            txtControles += "En relación a sus recursos y tolerancia al estrés, se destaca que el sujeto presenta un estado de malestar crónico persistente frente a las demandas estimulares, dificultando el proceso de mantener y dirigir su conducta, indicando vulnerabilidad a la desorganización.";
        } else {
            txtControles += "En relación a sus recursos, se observa un estado de sobrecarga situacional (estrés agudo) debido a demandas del entorno actual, aunque en condiciones habituales el sujeto posee una capacidad base adecuada para dirigir sus conductas.";
        }
    } else {
        txtControles += "Se destaca que el sujeto cuenta con los recursos suficientes para hacerle frente a las ansiedades o demandas estimulares del medio, mostrando estabilidad y buen control de la conducta.";
    }
    txtControles += "</p>";
    clusters['Controles'] = txtControles;

    let txtAfectos = "<h3><u>Afectos</u></h3><p style='" + pStyle + "'>";

    // Paso 1: DEPI y CDI
    if (DEPI > 5) {
        txtAfectos += "El Índice de Depresión (DEPI) indica una perturbación seria del estado de ánimo o depresión abierta. ";
        if (CDI > 3) {
            txtAfectos += "Al presentarse conjuntamente con un Índice de Inhabilidad Social (CDI) positivo, sugiere que esta depresión puede ser secundaria a una dificultad crónica para establecer relaciones interpersonales gratificantes. ";
        }
    } else if (DEPI === 5) {
        txtAfectos += "El Índice de Depresión (DEPI) se encuentra en el límite, sugiriendo susceptibilidad a variaciones anímicas significativas. ";
    }

    // Paso 2: EB, Lambda y EBPer
    const EBPerText = document.getElementById('res_EBPer') ? document.getElementById('res_EBPer').innerText : "N/A";
    if (WSumC > (M + 1.5)) {
        txtAfectos += "El estilo vivencial extratensivo indica que el sujeto tiende a mezclar sus emociones con sus procesos cognitivos, utilizando el ensayo-error y viéndose más influido por la estimulación externa. ";
        if (L > 0.99) {
            txtAfectos += "Sin embargo, el alto valor de Lambda señala un estilo 'extratensivo-evitativo', propenso a simplificar situaciones complejas para ignorar o denegar emociones. ";
        }
        if (EBPerText !== "N/A" && EBPerText !== "Inf" && parseFloat(EBPerText) > 2.5) {
            txtAfectos += "Además, el indicador EBPer señala que este estilo de respuesta está rigidificado, lo que resta flexibilidad y eficacia adaptativa. ";
        }
    }

    // Paso 3: eb lado derecho (C', T, V, Y)
    const SumCprime = obtenerValorNum('res_SumCprime');
    const SumT = obtenerValorNum('res_SumT');
    const SumV = obtenerValorNum('res_SumV');
    const SumY = obtenerValorNum('res_SumY');
    
    if (SumCprime > 0 || SumT > 1 || SumV > 0 || SumY > 0) {
        txtAfectos += "Con respecto a los estímulos internos que actúan fuera del control voluntario (sufrimiento y dolor psíquico): ";
        if (SumCprime > 0) txtAfectos += "se observa constricción afectiva y freno a la expresión emocional (C'=" + SumCprime + "). ";
        if (SumT > 1) txtAfectos += "se evidencia una fuerte necesidad de cercanía o sentimientos de soledad (T=" + SumT + "). ";
        if (SumV > 0) txtAfectos += "se registra introspección con autocrítica negativa o desvalorización (V=" + SumV + "). ";
        if (SumY > 0) txtAfectos += "se manifiesta malestar emocional agudo o sentimientos de parálisis y desvalimiento frente a estrés situacional (Y=" + SumY + "). ";
    }

    // Paso 4: SumC' vs SumPonC (WSumC)
    if (SumCprime > 0 && SumCprime >= WSumC) {
        txtAfectos += "La proporción de constricción indica que el sujeto tiende a internalizar en exceso y reprimir la externalización de sus afectos, lo que incrementa la tensión interna y eleva la probabilidad de desarrollar trastornos psicosomáticos. ";
    }

    // Paso 5: Afr
    if (Afr > 0.89) {
        txtAfectos += "El Índice Afectivo (Afr) elevado indica fuerte atracción y mayor productividad ante situaciones emocionales. ";
    } else if (Afr < 0.46) {
        txtAfectos += "El Índice Afectivo (Afr) disminuido refleja incomodidad, tendencia a evitar la estimulación emocional, retraimiento y posible aislamiento social. ";
    }

    // Paso 6: Intelectualización
    const Sum2AB = obtenerValorNum('res_2AB');
    if (Sum2AB > 3) {
        txtAfectos += "El sujeto utiliza mecanismos pseudointelectuales (racionalizaciones) de forma excesiva para ocultar o reducir el impacto de las emociones disfóricas, haciéndolo vulnerable a la desorganización ante sobrecargas emocionales. ";
    }

    // Paso 7: CP
    const CP = obtenerValorNum('v_CP');
    if (CP > 0) {
        txtAfectos += "La proyección de color (CP) sugiere el uso de la negación, sustituyendo emociones displacenteras por emociones eufóricas falsas e irreales (rasgos de tipo histeroide). ";
    }

    // Paso 8: FC : CF+C y C Pura
    if (FC > (CF + C)) {
        txtAfectos += "En cuanto a la modulación de las descargas emocionales deliberadas, predominan los afectos controlados y modulados por el pensamiento (FC mayor a CF+C). ";
    } else if ((CF + C) > FC) {
        txtAfectos += "En la modulación emocional se observa que las emociones son más relajadas y con menor control cognitivo (CF+C predominante). ";
    }
    if (C > 0) {
        txtAfectos += "La presencia de Color Puro (C) advierte sobre descargas afectivas bruscas e impulsivas, sin intento de control cognitivo. ";
    }

    // Paso 9: S
    if (S > 3) {
        txtAfectos += "El elevado uso del Espacio Blanco (S) advierte sobre componentes fuertemente hostiles, negativistas o de oposición que pueden comprometer la adaptación social. ";
    }

    // Pasos 10-16: Complejas
    const ColSomb = obtenerValorNum('v_ColSomb');
    if (ColSomb > 0) {
        txtAfectos += "La presencia de respuestas complejas de Color-Sombreado indica vivencias donde se mezclan el placer y el dolor psíquico, reflejando gran ambivalencia o confusión afectiva. ";
    }

    txtAfectos += "</p>";
    clusters['Afectos'] = txtAfectos;

    let txtAuto = "<h3><u>Autopercepción</u></h3><p style='" + pStyle + "'>";
    if (egocentrismo < 0.33) {
        txtAuto += "El índice de egocentrismo se encuentra disminuido, indicando una valoración negativa de sí mismo en comparación con los demás, lo que sugiere baja autoestima o tendencia a desestimar su propio valor. ";
    } else if (egocentrismo > 0.44) {
        txtAuto += "El índice de egocentrismo se encuentra aumentado, significando autocentramiento, tomándose a él mismo como centro de sus preocupaciones. ";
    } else {
        txtAuto += "El índice de egocentrismo se encuentra dentro del rango esperable, indicando una estimación equilibrada de su propia valía. ";
    }

    if ((Fr + rF) > 0) {
        txtAuto += "Se nota además la existencia de componentes narcisistas y sobreestimación de la valía personal. ";
    }

    if (MOR >= 2) {
        txtAuto += "Su autoimagen está teñida por un pesimismo que genera una visión negativa, indicando fuertes sentimientos de desvitalización o daño (MOR elevado). ";
    }
    txtAuto += "</p>";
    clusters['Autopercepcion'] = txtAuto;

    let txtInter = "<h3><u>Percepción Interpersonal</u></h3><p style='" + pStyle + "'>";
    if (COP >= 2 && AG <= 2) {
        txtInter += "Se observa una actitud general positiva y colaborativa hacia las relaciones interpersonales, percibiendo los intercambios como instancias de cooperación recíproca. ";
    } else if (AG > 2) {
        txtInter += "Su percepción de los otros está teñida por actitudes de confrontación, percibiendo el entorno como hostil, lo que genera interacciones marcadas por la asertividad agresiva o actitud defensiva hacia los demás. ";
    }

    if (PER >= 2) {
        txtInter += "El sujeto asume una posición rígida en los vínculos interpersonales, desplegando un autoritarismo intelectual como mecanismo de defensa en el encuentro con el otro. ";
    }
    if (COP < 2 && AG < 2 && PER < 2) {
        txtInter += "En el área de relaciones interpersonales, no se registran posturas extremas de agresividad, colaboración desmedida ni rigidez vincular predominante.";
    }
    txtInter += "</p>";
    clusters['Interpersonal'] = txtInter;

    let txtProc = "<h3><u>Procesamiento</u></h3><p style='" + pStyle + "'>";
    if (Zf > 12) {
        txtProc += "El valor alto de Zf destaca que el sujeto presenta un alto monto de iniciativa o motivación durante el protocolo, indicando esfuerzo de procesamiento superior al esperado, propio de autoexigencia elevada. ";
    } else if (Zf < 9) {
        txtProc += "Se observa una baja motivación o déficit en el esfuerzo por integrar la información del entorno (Zf bajo). ";
    } else {
        txtProc += "El esfuerzo de procesamiento y la iniciativa para integrar la información del entorno se encuentran dentro de los parámetros esperables. ";
    }
    txtProc += "</p>";
    clusters['Procesamiento'] = txtProc;

    let txtMed = "<h3><u>Mediación</u></h3><p style='" + pStyle + "'>";
    if (XA < 0.70 || WDA < 0.75) {
        txtMed += "En relación con el ajuste perceptivo, se observa que es poco convencional y no acorde a lo socialmente esperado (XA% o WDA% disminuido). ";
        if (Xmenos > 0.20) {
            txtMed += "Esto se ve agravado por un elevado grado de distorsión perceptiva (X-% aumentado), indicando un alejamiento significativo de la realidad objetiva en su mediación cognitiva. ";
        }
    } else {
        txtMed += "En relación con el ajuste perceptivo, el sujeto presenta una adecuada traducción de los estímulos, mostrando un enfoque convencional y un buen contacto y adaptación a la realidad objetiva. ";
    }
    txtMed += "</p>";
    clusters['Mediacion'] = txtMed;

    let txtIde = "<h3><u>Ideación</u></h3><p style='" + pStyle + "'>";
    if (SumPon6 > 12) {
        txtIde += "El sujeto no presenta claridad del pensamiento, observándose fallas lógicas o deslices cognitivos severos que interfieren en la coherencia de su ideación (SumaPond6 elevada). ";
    } else if (SumPon6 > 0 && SumPon6 <= 12) {
        txtIde += "Se presentan algunos deslices cognitivos leves o inmadurez en la articulación del pensamiento, pero sin llegar a comprometer severamente el juicio de realidad. ";
    } else {
        txtIde += "El sujeto presenta claridad de pensamiento, con un proceso ideativo lógico, coherente y libre de interferencias formales. ";
    }
    txtIde += "</p>";
    clusters['Ideacion'] = txtIde;

    let ordenInterpretacion = [];
    let claveUsada = "";

    function agregarClusters(lista) {
        lista.forEach(c => {
            if (!ordenInterpretacion.includes(c)) {
                ordenInterpretacion.push(c);
            }
        });
    }

    if (PTI >= 3) {
        claveUsada += "PTI > 3 ";
        agregarClusters(['Ideacion', 'Mediacion', 'Procesamiento', 'Controles', 'Afectos', 'Autopercepcion', 'Interpersonal']);
    }
    else if (DEPI >= 5 && CDI >= 4) {
        claveUsada += "DEPI > 5 y CDI > 3 ";
        agregarClusters(['Interpersonal', 'Autopercepcion', 'Controles', 'Afectos', 'Procesamiento', 'Mediacion', 'Ideacion']);
    }
    else if (DEPI >= 5) {
        claveUsada += "DEPI > 5 ";
        agregarClusters(['Afectos', 'Controles', 'Autopercepcion', 'Interpersonal', 'Procesamiento', 'Mediacion', 'Ideacion']);
    }
    else {
        let encontroConcatenada = false;
        
        if (D < AdjD) {
            claveUsada += "D < Adj D ";
            agregarClusters(['Controles']);
        }
        
        if (!encontroConcatenada && CDI >= 4) {
            claveUsada += (claveUsada ? " / " : "") + "CDI > 3 ";
            agregarClusters(['Controles', 'Afectos', 'Autopercepcion', 'Interpersonal', 'Procesamiento', 'Mediacion', 'Ideacion']);
            encontroConcatenada = true;
        }
        
        if (!encontroConcatenada && AdjD < 0) {
            if (!claveUsada.includes("Adj D < 0")) claveUsada += (claveUsada ? " / " : "") + "Adj D < 0 ";
            agregarClusters(['Controles']);
        }
        
        if (!encontroConcatenada && L > 0.99) {
            claveUsada += (claveUsada ? " / " : "") + "Lambda > 0.99 ";
            agregarClusters(['Procesamiento', 'Mediacion', 'Ideacion', 'Controles', 'Afectos', 'Autopercepcion', 'Interpersonal']);
            encontroConcatenada = true;
        }
        
        if (!encontroConcatenada && (Fr + rF) > 0) {
            claveUsada += (claveUsada ? " / " : "") + "Fr+rF > 0 ";
            agregarClusters(['Autopercepcion', 'Interpersonal']);
        }
        
        if (!encontroConcatenada && M > WSumC) {
            claveUsada += (claveUsada ? " / " : "") + "Estilo Introversivo ";
            agregarClusters(['Ideacion', 'Procesamiento', 'Mediacion', 'Controles', 'Afectos', 'Autopercepcion', 'Interpersonal']);
            encontroConcatenada = true;
        }
        
        if (!encontroConcatenada && WSumC > M) {
            claveUsada += (claveUsada ? " / " : "") + "Estilo Extratensivo ";
            agregarClusters(['Afectos', 'Autopercepcion', 'Interpersonal', 'Controles', 'Procesamiento', 'Mediacion', 'Ideacion']);
            encontroConcatenada = true;
        }
        
        if (!encontroConcatenada && p > (a + 1)) {
            claveUsada += (claveUsada ? " / " : "") + "p > a+1 ";
            agregarClusters(['Ideacion', 'Procesamiento', 'Mediacion', 'Controles', 'Afectos', 'Autopercepcion', 'Interpersonal']);
            encontroConcatenada = true;
        }
        
        if (!encontroConcatenada && HVI >= 4) {
            claveUsada += (claveUsada ? " / " : "") + "HVI Positivo ";
            agregarClusters(['Ideacion', 'Procesamiento', 'Mediacion', 'Controles', 'Afectos', 'Autopercepcion', 'Interpersonal']);
            encontroConcatenada = true;
        }

        if (ordenInterpretacion.length < 7) {
            if (OBS >= 3) {
                claveUsada += (claveUsada ? " / " : "") + "Terciaria: OBS Positivo ";
                agregarClusters(['Procesamiento', 'Mediacion', 'Ideacion', 'Controles', 'Afectos', 'Autopercepcion', 'Interpersonal']);
            } else if (DEPI === 5) {
                claveUsada += (claveUsada ? " / " : "") + "Terciaria: DEPI = 5 ";
                agregarClusters(['Afectos', 'Controles', 'Autopercepcion', 'Interpersonal', 'Procesamiento', 'Mediacion', 'Ideacion']);
            } else if (EA > 12) {
                claveUsada += (claveUsada ? " / " : "") + "Terciaria: EA > 12 ";
                agregarClusters(['Controles', 'Ideacion', 'Procesamiento', 'Mediacion', 'Afectos', 'Autopercepcion', 'Interpersonal']);
            } else if (Mmenos > 0 || Mp > Ma || SumPon6 > 5) {
                claveUsada += (claveUsada ? " / " : "") + "Terciaria: Indicadores Ideativos ";
                agregarClusters(['Ideacion', 'Procesamiento', 'Mediacion', 'Controles', 'Afectos', 'Autopercepcion', 'Interpersonal']);
            } else {
                claveUsada += (claveUsada ? " / " : "") + "Protocolo Estándar (Sin claves críticas)";
                agregarClusters(['Controles', 'Afectos', 'Autopercepcion', 'Interpersonal', 'Procesamiento', 'Mediacion', 'Ideacion']);
            }
        }
    }

    reporte += `<div style="background-color:#fef3c7; padding: 10px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
        <strong>Clave de interpretación:</strong> ${claveUsada}
    </div>`;

    ordenInterpretacion.forEach(nombreCluster => {
        if (clusters[nombreCluster]) {
            reporte += clusters[nombreCluster];
        }
    });

    reporte += "<h3><u>Constelaciones (Alertas)</u></h3>";
    reporte += `<ul style="font-size: 14px; line-height: 1.6;">`;
    let constelacionesActivas = false;
    
    if (PTI >= 3) {
        reporte += "<li><b>Índice de Trastorno del Pensamiento (PTI):</b> Positivo. Indica distorsión perceptiva severa y problemas en el juicio de realidad.</li>";
        constelacionesActivas = true;
    }
    if (DEPI >= 5) {
        reporte += "<li><b>Índice de Depresión (DEPI):</b> Positivo. El sujeto está experimentando una seria perturbación del estado del ánimo, caracterizado por un abatimiento anímico.</li>";
        constelacionesActivas = true;
    }
    if (CDI >= 4) {
        reporte += "<li><b>Índice de Déficit de Afrontamiento (CDI):</b> Positivo. Dificultades crónicas para lidiar con las demandas y déficit en habilidades sociales.</li>";
        constelacionesActivas = true;
    }
    if (SCON >= 8) {
        reporte += "<li><b>Constelación de Suicidio (S-CON):</b> Positivo. Indica potencial riesgo autodestructivo inminente (ALERTA).</li>";
        constelacionesActivas = true;
    }
    if (HVI >= 4) {
        reporte += "<li><b>Índice de Hipervigilancia (HVI):</b> Positivo. Indicando estado de alerta continua y mantenimiento de una actitud de recelo y desconfianza hacia su entorno.</li>";
        constelacionesActivas = true;
    }
    if (OBS >= 3) {
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
