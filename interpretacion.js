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

    let txtControles = "<h3><u>Controles y Tolerancia al Estrés (Sector Principal)</u></h3><p style='" + pStyle + "'>";

    // Extraer variables adicionales necesarias
    const FM = obtenerValorNum('res_FM_princ') || obtenerValorNum('res_FM');
    const m = obtenerValorNum('res_m_princ') || obtenerValorNum('res_m');
    const eb_right = (obtenerValorNum('res_SumCprime') || 0) + (obtenerValorNum('res_SumT') || 0) + (obtenerValorNum('res_SumV') || 0) + (obtenerValorNum('res_SumY') || 0);
    const eb_left = FM + m;
    const SumT_C = obtenerValorNum('res_SumT');
    const SumV_C = obtenerValorNum('res_SumV');
    const SumY_C = obtenerValorNum('res_SumY');
    const EBPerText_C = document.getElementById('res_EBPer') ? document.getElementById('res_EBPer').innerText : "N/A";

    txtControles += "<strong>Sector Central I: Funcionamiento Habitual</strong><br>";

    // Paso 1: Adj D y CDI
    if (AdjD > 0) {
        txtControles += "El valor de Adj D (" + AdjD + ") indica una capacidad de control y tolerancia al estrés superior a lo común en condiciones habituales. ";
        if (EA < 6) txtControles += "No obstante, al presentar una Experiencia Accesible (EA) baja, esta solidez podría ser engañosa frente a demandas complejas. ";
    } else if (AdjD < 0) {
        txtControles += "El valor negativo de Adj D (" + AdjD + ") señala una capacidad de control habitual disminuida, recursos crónicos insuficientes y vulnerabilidad a la desorganización frente a las demandas del entorno. ";
    } else {
        txtControles += "El valor de Adj D se encuentra dentro de lo esperado (0), indicando una capacidad de control adecuada para mantener la dirección de sus conductas en condiciones habituales. ";
    }
    
    if (CDI >= 4) {
        txtControles += "Asimismo, el Índice de Inhabilidad Social (CDI) positivo revela inmadurez en el manejo de situaciones socioafectivas, incrementando el riesgo de desorganización si el entorno se complejiza. ";
    }

    // Paso 2: EA
    if (EA < 6) {
        txtControles += "El nivel de recursos disponibles organizados (EA=" + EA + ") es limitado, advirtiendo sobre una vulnerabilidad crónica ante las tensiones cotidianas. ";
    } else {
        txtControles += "El sujeto cuenta con un nivel adecuado de recursos disponibles y organizados (EA=" + EA + ") para tomar decisiones de forma deliberada. ";
    }

    // Paso 3: EB, Lambda, EBPer
    if (M > (WSumC + 1.5)) {
        txtControles += "El estilo vivencial (EB) introversivo señala que el sujeto procesa la información internamente, utilizando la ideación y demorando la decisión para reflexionar. ";
    } else if (WSumC > (M + 1.5)) {
        txtControles += "El estilo vivencial (EB) extratensivo muestra que el sujeto tiende a mezclar sus emociones con sus procesos cognitivos, resolviendo mediante ensayo y error, influido por lo externo. ";
    } else {
        txtControles += "El estilo vivencial (EB) es ambigual, careciendo de un patrón de afrontamiento consistente, oscilando entre la ideación y el ensayo-error emocional. ";
    }
    if (L > 0.99) {
        txtControles += "Al acompañarse de un valor de Lambda alto, advierte sobre una actitud defensiva situacional o estilo evitativo para no lidiar con la complejidad emocional. ";
    }
    if (EBPerText_C !== "N/A" && EBPerText_C !== "Inf" && parseFloat(EBPerText_C) > 2.5) {
        txtControles += "El indicador EBPer elevado señala una rigidificación patológica de este estilo de respuesta, restando eficacia adaptativa. ";
    }

    // Paso 4 y 5: eb vs EA
    if ((eb_left + eb_right) > EA) {
        txtControles += "Se observa además que las tensiones involuntarias (eb) superan los recursos deliberados (EA), lo que interfiere severamente con la eficacia cognitiva y predispone a la pérdida de control. ";
    }

    txtControles += "<br><br><strong>Sector Central II: Estrés de Origen Situacional</strong><br>";

    // Paso 1 y 2: D vs Adj D
    if (D < 0 && AdjD < 0) {
        txtControles += "Se detecta un estado de sobrecarga crónica exacerbado fuertemente por tensiones situacionales recientes, aumentando drásticamente la tendencia a la desorganización y la impulsividad (D y Adj D negativos). ";
    } else if (D < AdjD) {
        txtControles += "La capacidad actual de tolerancia al estrés (D=" + D + ") es inferior a la que posee habitualmente, producto de una fuerte tensión situacional que afecta su control. ";
    } else {
        txtControles += "No se registran tensiones situacionales agudas que mermen significativamente su capacidad de control base. ";
    }

    // Paso 3: m e Y
    if (m > 0 || SumY_C > 0) {
        if (m >= (3 * SumY_C)) {
            txtControles += "El estrés situacional golpea fuertemente el área del pensamiento (predominio de m), generando tensión ideacional y una sensación de pérdida de control mental. ";
        } else if (SumY_C >= (3 * m)) {
            txtControles += "El estrés situacional abruma en el plano emocional (predominio de Y), provocando intensa parálisis, desamparo e indefensión afectiva. ";
        } else {
            txtControles += "El estrés situacional impacta tanto a nivel ideacional (pérdida de control mental) como emocional (desvalimiento). ";
        }
    }

    // Paso 4: T, V, Egocentrismo
    if (SumT_C > 1 || SumV_C > 0) {
        txtControles += "Altera los equilibrios afectivos la presencia de fuertes necesidades de contacto (T>1) o autocrítica destructiva (V>0), sugiriendo indagar sobre pérdidas recientes, fracasos o sentimientos de soledad profunda. ";
    }

    // Paso 5: C Pura y D negativo (Impulsividad)
    if (C > 0 && D < 0) {
        txtControles += "¡ALERTA CRÍTICA!: La coexistencia de descargas emocionales sin control (Color Puro) junto a una merma en los recursos de contención (D<0) hace altísimamente probable que el sujeto derive en conductas de impulsividad real no modulada. ";
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

    // Variables adicionales
    const sumFrrF = Fr + rF;
    const SumV_AP = obtenerValorNum('res_SumV');
    const FD_AP = obtenerValorNum('v_FD');
    const AnXy = obtenerValorNum('res_AnXy') || (obtenerValorNum('v_An') + obtenerValorNum('v_Xy'));
    const Xy = obtenerValorNum('v_Xy');
    const H_puro = obtenerValorNum('v_H');
    const H_paren = obtenerValorNum('v_Hparen');
    const Hd = obtenerValorNum('v_Hd');
    const Hd_paren = obtenerValorNum('v_Hdparen');
    const GHR = obtenerValorNum('v_GHR');
    const PHR = obtenerValorNum('v_PHR');

    // Paso 1: OBS e HVI
    if (OBS > 0) {
        txtAuto += "Se observa un Índice Obsesivo (OBS) positivo, indicando una marcada tendencia a la meticulosidad, cautela y perfeccionismo, lo que genera una autoevaluación sumamente rígida y exigente. ";
    }
    if (HVI > 0) {
        txtAuto += "La presencia de un Índice de Hipervigilancia (HVI) positivo señala un estado continuo de alerta y desconfianza, afectando su autopercepción al mantenerlo excesivamente a la defensiva para proteger su integridad. ";
    }

    // Paso 2: Narcisismo (Fr+rF)
    if (sumFrrF > 0) {
        txtAuto += "La presencia de respuestas de Reflejo (Fr+rF=" + sumFrrF + ") revela una acusada tendencia a sobreestimar su propia valía (autoglorificación), apoyándose en una modalidad de autopercepción primitiva y narcisista que utiliza la externalización para no reconocer limitaciones. ";
    }

    // Paso 3: Egocentrismo
    if (egocentrismo > 0.44) {
        txtAuto += "El índice de egocentrismo se encuentra elevado, reflejando que el sujeto tiende a centrarse en sí mismo más de lo habitual, tomándose como el foco principal de su atención. ";
        if (SumV_AP > 0 || MOR > 2) {
            txtAuto += "Sin embargo, dada la presencia de indicadores de dolor psíquico (V) o daño (MOR), este autocentramiento no equivale a una alta autoestima, sino a una focalización en sus propios padecimientos y desvalorización. ";
        }
    } else if (egocentrismo < 0.33) {
        txtAuto += "El índice de egocentrismo se encuentra disminuido, indicando una tendencia a compararse negativamente con los demás, sugiriendo baja autoestima y desestimación de su propia valía (frecuente en perfiles depresivos). ";
    } else {
        txtAuto += "El índice de egocentrismo se ubica dentro del rango esperable, sugiriendo una estimación equilibrada de su preocupación por sí mismo en relación con los demás. ";
    }

    // Paso 4: Introspección (FD y V)
    if (SumV_AP > 0) {
        txtAuto += "En cuanto a su capacidad de autoexamen, el uso de introspección se encuentra teñido de autocrítica negativa (V=" + SumV_AP + "), señalando fuertes sentimientos crónicos de culpa, vergüenza, desvalorización y baja autoestima. ";
    } else if (FD_AP > 2) {
        txtAuto += "Se observa una capacidad de tomar distancia para el autoexamen (FD=" + FD_AP + "), pero su exceso indica que el sujeto dedica un esfuerzo desmedido a la autoinspección, con el riesgo de aislarse de su entorno. ";
    } else if (FD_AP > 0) {
        txtAuto += "El sujeto posee una adecuada capacidad para tomar distancia y adquirir perspectiva para el autoexamen sin tintes dolorosos (presencia de FD). ";
    }

    // Paso 5: Preocupación Corporal (An+Xy)
    if (AnXy > 3) {
        txtAuto += "El elevado número de contenidos anatómicos y radiografías (An+Xy=" + AnXy + ") refleja una preocupante distorsión de la autoimagen, marcada por una extrema vulnerabilidad corporal y posible ideación hipocondríaca o psicosomática. ";
        if (Xy > 0) txtAuto += "La presencia específica de radiografías (Xy) añade un matiz de dolor y exposición descarnada a esta preocupación corporal. ";
    }

    // Paso 6: Autoimagen Dañada (MOR)
    if (MOR >= 2) {
        txtAuto += "Su autoimagen está severamente teñida por atribuciones displacenteras (MOR=" + MOR + "), indicando una orientación pesimista y desvalorizada donde el sujeto se percibe a sí mismo con rasgos rotos, arruinados o dañados. ";
    }

    // Paso 7: H:(H)+Hd+(Hd) y GHR:PHR
    const H_derecha = H_paren + Hd + Hd_paren;
    if (H_derecha > H_puro) {
        txtAuto += "Al comparar las percepciones humanas, predomina la imagen construida sobre figuras irreales, parciales o fantasiosas (H pura < (H)+Hd+(Hd)), lo que indica que su autoimagen se basa en sesgos inmaduros, apartándose de los datos de la realidad. ";
    } else if (H_puro > 0) {
        txtAuto += "La predominancia de representaciones humanas enteras y reales (H pura) sugiere que su autoimagen está construida principalmente sobre la base de la realidad objetiva y la identificación madura. ";
    }

    if (PHR > GHR) {
        txtAuto += "Por último, el predominio de Pobres Representaciones Humanas (PHR > GHR) confirma que las conceptualizaciones del sujeto acerca de sí mismo son ineficaces, poco realistas y contienen fuertes sesgos distorsionadores. ";
    }

    txtAuto += "</p>";
    clusters['Autopercepcion'] = txtAuto;

    let txtInter = "<h3><u>Percepción Interpersonal</u></h3><p style='" + pStyle + "'>";

    // Variables adicionales
    const SumT_Inter = obtenerValorNum('res_SumT');
    const Fd_Inter = obtenerValorNum('v_Fd');
    const Isol = obtenerValorNum('res_Isol');
    const H_puro_I = obtenerValorNum('v_H');
    const H_paren_I = obtenerValorNum('v_Hparen');
    const Hd_I = obtenerValorNum('v_Hd');
    const Hd_paren_I = obtenerValorNum('v_Hdparen');
    const GHR_I = obtenerValorNum('v_GHR');
    const PHR_I = obtenerValorNum('v_PHR');

    // Paso 1: CDI e HVI
    if (CDI > 3) {
        txtInter += "El Índice de Inhabilidad Social (CDI > 3) advierte sobre una estructura inmadura y una marcada ineptitud en la esfera relacional, presentando dificultades para enfrentar demandas sociales cotidianas y tendiendo a vínculos superficiales. ";
    }
    if (HVI > 0) {
        if (SumT_Inter === 0) {
            txtInter += "Presenta un Índice de Hipervigilancia (HVI) positivo acompañado de ausencia de Textura (T=0), lo que refleja un estilo hipervigilante crónico, estable y suspicaz hacia el entorno, manteniendo siempre distancia de seguridad. ";
        } else {
            txtInter += "Presenta un Índice de Hipervigilancia (HVI) positivo, pero con presencia de Textura (T>0), indicando que esta actitud de alerta y desconfianza es una reacción circunstancial ante lo que percibe como una amenaza actual del entorno. ";
        }
    }

    // Paso 2: Proporción a:p
    if (p > (a + 1)) {
        txtInter += "En cuanto al rol asumido en los vínculos (a:p), la predominancia pasiva sugiere una tendencia a la sumisión, eludiendo responsabilidades y esperando que el entorno tome las decisiones y resuelva sus necesidades. ";
    } else if (a > (p * 3) || p > (a * 3)) {
        txtInter += "La gran desproporción en su rol vincular (a:p) advierte sobre una rigidez cognitiva que le resta flexibilidad para buscar pautas de conducta alternativas en sus relaciones interpersonales. ";
    }

    // Paso 3: Fd y SumT
    if (Fd_Inter > 0) {
        txtInter += "La presencia de respuestas de Comida (Fd) es infrecuente en adultos y señala fuertes conductas de dependencia, reflejando una concepción ingenua de las relaciones donde espera que los demás atiendan constantemente sus demandas. ";
    }
    
    if (SumT_Inter === 0) {
        txtInter += "La ausencia de respuestas de Textura (T=0) señala cautela, distancia y la necesidad de mantener un 'espacio de seguridad', interpretando los acercamientos ajenos como invasiones. ";
    } else if (SumT_Inter > 1) {
        txtInter += "El exceso de respuestas de Textura (T>1) indica intensos sentimientos de soledad, privación afectiva y una búsqueda ansiosa o dependiente de contacto emocional con los demás. ";
    } else {
        txtInter += "La presencia normativa de respuestas de Textura (T=1) refleja una necesidad y capacidad adecuada para establecer contacto y cercanía emocional. ";
    }

    // Paso 4: Contenidos Humanos
    const H_derecha_I = H_paren_I + Hd_I + Hd_paren_I;
    if (H_derecha_I > H_puro_I) {
        txtInter += "El predominio de detalles humanos o figuras de ficción ((H)+Hd+(Hd) > H pura) señala una percepción de los demás que es distante, parcializada, teñida de suspicacia o excesivamente deformada por la fantasía. ";
    } else if (H_puro_I > H_derecha_I) {
        txtInter += "El predominio de respuestas humanas enteras reales (H pura) indica que su visión de los otros es completa, realista y basada en la experiencia. ";
    }

    // Paso 5: GHR vs PHR
    if (PHR_I >= GHR_I) {
        txtInter += "El predominio de Pobres Representaciones Humanas (PHR >= GHR) señala que sus conceptualizaciones sobre las relaciones son ineficaces y sesgadas, lo que genera menor adaptabilidad y vínculos inadaptados, siendo percibido desfavorablemente por los demás. ";
    }

    // Paso 6: Interacción Pura (COP, AG y PER)
    if (PER > 2) {
        txtInter += "La elevada Personalización (PER > 2) refleja un autoritarismo infantil y posturas dogmáticas utilizadas para protegerse del cuestionamiento de los demás en el vínculo. ";
    }

    if (COP === 0 && AG <= 1) {
        txtInter += "En su interacción directa, se muestra como un sujeto distante y despegado, sin interés genuino por implicarse interpersonalmente. ";
    } else if (COP <= 1 && AG === 2) {
        txtInter += "En sus vínculos, la agresividad es percibida como un componente natural y esperable de las relaciones (AG=2 sin cooperación significativa). ";
    } else if (COP <= 2 && AG > 2) {
        txtInter += "Su actividad interpersonal es coactiva y está marcada por la agresión (AG>2), vivenciando el ambiente social como sumamente hostil. ";
    } else if (COP === 2 && AG <= 1) {
        txtInter += "El sujeto busca activamente interacciones armoniosas, positivas y de cooperación recíproca (COP=2, baja agresión). ";
    } else if (COP === 3 && AG === 2) {
        txtInter += "Sus interacciones revelan que percibe tanto la amabilidad como la agresividad como componentes naturales y mezclados en el contacto con el otro. ";
    } else if (COP > 4) {
        txtInter += "El exceso de respuestas colaborativas (COP > 4) puede asociarse a una búsqueda constante de nuevas relaciones para suplir carencias, aumentando el riesgo de superficialidad vincular o abandono de tratamientos. ";
    }

    // Paso 7: Aislamiento (Aisl/R)
    if (Isol > 0.33) {
        txtInter += "El altísimo Índice de Aislamiento (Aisl/R > 0.33) indica que la persona se encuentra patológicamente aislada a nivel social, sin apenas intercambios significativos con sus semejantes. ";
    } else if (Isol > 0.25) {
        txtInter += "El Índice de Aislamiento (Aisl/R > 0.25) muestra que el individuo se involucra menos de lo habitual en la interacción social, evidenciando un claro retraimiento. ";
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
