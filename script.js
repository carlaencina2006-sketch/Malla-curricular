document.addEventListener('DOMContentLoaded', () => {

    // --- Definición de Datos de la Malla (Lógica de Requisitos Corregida) ---
    // Cada ramo tiene: id (único), nombre, semestre, requisitos (un array de ids) y un colorId por área.
    const ramosData = [
        // Semestre 1
        { id: 'prob-met-hist', nombre: 'Problemas y Métodos de la Historia', semestre: 1, requisitos: [], colorId: 1 },
        { id: 'teo-pens-hist', nombre: 'Teoría y Pensamiento de la Historia', semestre: 1, requisitos: [], colorId: 1 },
        { id: 'artes-conoc', nombre: 'Artes y Conocimientos en la Historia de la Cultura', semestre: 1, requisitos: [], colorId: 8 },
        { id: 'est-disc-acc', nombre: 'Estrategia discursivas para acceder al conocimiento disciplinar', semestre: 1, requisitos: [], colorId: 8 },
        { id: 'teo-pens-geo', nombre: 'Teoría y Pensamiento de la Geografía', semestre: 1, requisitos: [], colorId: 2 },
        { id: 'antro-crist', nombre: 'Antropología Cristiana', semestre: 1, requisitos: [], colorId: 6 },
        // Semestre 2
        { id: 'hist-antigua', nombre: 'Historia Antigua', semestre: 2, requisitos: [], colorId: 1 },
        { id: 'princ-fund-geo-fis', nombre: 'Principios y Fundamentos de Geografía Física', semestre: 2, requisitos: ['teo-pens-geo'], colorId: 2 },
        { id: 'corr-prob-hist', nombre: 'Corrientes y Problemas de la Historiografía', semestre: 2, requisitos: [], colorId: 1 },
        { id: 'prob-met-cs', nombre: 'Problemas y Métodos de las Ciencias Sociales', semestre: 2, requisitos: [], colorId: 3 },
        { id: 'prim-cult-am-cl', nombre: 'Primeras Culturas de América y Chile', semestre: 2, requisitos: [], colorId: 1 },
        { id: 'ingles-1', nombre: 'Inglés 1', semestre: 2, requisitos: [], colorId: 5 },
        // Semestre 3
        { id: 'hist-medieval', nombre: 'Historia Medieval', semestre: 3, requisitos: ['hist-antigua'], colorId: 1 },
        { id: 'hist-am-col', nombre: 'Historia de América Colonial', semestre: 3, requisitos: [], colorId: 1 },
        { id: 'hist-cl-col', nombre: 'Historia de Chile Colonial', semestre: 3, requisitos: ['prim-cult-am-cl'], colorId: 1 },
        { id: 'pract-doc-ini', nombre: 'Práctica Docente Inicial', semestre: 3, requisitos: [], colorId: 4 },
        { id: 'educar-div', nombre: 'Educar en y para la Diversidad', semestre: 3, requisitos: [], colorId: 4 },
        { id: 'taller-aprend', nombre: 'Taller de Aprendizaje y Desarrollo Adolescente', semestre: 3, requisitos: [], colorId: 4 },
        // Semestre 4
        { id: 'hist-moderna', nombre: 'Historia Moderna', semestre: 4, requisitos: ['hist-medieval'], colorId: 1 },
        { id: 'hist-am-lat-sXIX', nombre: 'Historia de América Latina Siglo XIX', semestre: 4, requisitos: ['hist-am-col'], colorId: 1 },
        { id: 'hist-cl-sXIX', nombre: 'Historia de Chile Siglo XIX', semestre: 4, requisitos: ['hist-cl-col'], colorId: 1 },
        { id: 'hist-arte-univ', nombre: 'Historia del Arte Universal', semestre: 4, requisitos: ['artes-conoc'], colorId: 8 },
        { id: 'princ-fund-geo-hum', nombre: 'Principios y Fundamentos de Geografía Humana', semestre: 4, requisitos: ['princ-fund-geo-fis'], colorId: 2 },
        { id: 'ingles-2', nombre: 'Inglés 2', semestre: 4, requisitos: ['ingles-1'], colorId: 5 },
        // Semestre 5
        { id: 'hist-cont-univ', nombre: 'Historia Contemporánea Universal', semestre: 5, requisitos: ['hist-moderna'], colorId: 1 },
        { id: 'hist-am-cont', nombre: 'Historia de América Contemporánea', semestre: 5, requisitos: ['hist-am-lat-sXIX'], colorId: 1 },
        { id: 'hist-cl-cont', nombre: 'Historia de Chile Contemporánea', semestre: 5, requisitos: ['hist-cl-sXIX'], colorId: 1 },
        { id: 'prob-met-econ', nombre: 'Problemas y Métodos de la Economía', semestre: 5, requisitos: ['prob-met-cs'], colorId: 3 },
        { id: 'met-herr-geo', nombre: 'Métodos y Herramientas Geográficas', semestre: 5, requisitos: ['princ-fund-geo-hum'], colorId: 2 },
        { id: 'ingles-3', nombre: 'Inglés 3', semestre: 5, requisitos: ['ingles-2'], colorId: 5 },
        // Semestre 6
        { id: 'analisis-geo', nombre: 'Análisis Geográfico', semestre: 6, requisitos: ['met-herr-geo'], colorId: 2 },
        { id: 'psico-soc-apl', nombre: 'Psicología Social Aplicada en la Escuela y su Comunidad', semestre: 6, requisitos: ['educar-div'], colorId: 4 },
        { id: 'fund-filos-soc', nombre: 'Fundamentos Filosóficos y Sociales de la Educación', semestre: 6, requisitos: ['taller-aprend'], colorId: 4 },
        { id: 'ingles-4', nombre: 'Inglés 4', semestre: 6, requisitos: ['ingles-3'], colorId: 5 },
        { id: 'sem-esp-1', nombre: 'Seminario de Especialización 1 (Optativo)', semestre: 6, requisitos: [], colorId: 7 },
        { id: 'sem-esp-2', nombre: 'Seminario de Especialización 2 (Optativo)', semestre: 6, requisitos: [], colorId: 7 },
        // Semestre 7
        { id: 'pol-pub-edu', nombre: 'Políticas Públicas Educativas y Gestión Escolar', semestre: 7, requisitos: ['psico-soc-apl'], colorId: 4 },
        { id: 'form-ciud-1', nombre: 'Formación Ciudadana 1', semestre: 7, requisitos: ['prob-met-econ'], colorId: 3 },
        { id: 'tec-dig-apren', nombre: 'Tecnologías Digitales para el Aprendizaje y el Desarrollo Profesional Docente', semestre: 7, requisitos: ['fund-filos-soc'], colorId: 4 },
        { id: 'teo-plan-curr', nombre: 'Teoría y Planificación Curricular', semestre: 7, requisitos: [], colorId: 4 },
        { id: 'etica-crist', nombre: 'Ética Cristiana', semestre: 7, requisitos: ['antro-crist'], colorId: 6 },
        { id: 'sem-esp-3', nombre: 'Seminario de Especialización 3 (Optativo)', semestre: 7, requisitos: ['sem-esp-2'], colorId: 7 },
        // Semestre 8
        { id: 'didac-geo', nombre: 'Didáctica de la Geografía', semestre: 8, requisitos: ['pract-doc-ini'], colorId: 4 },
        { id: 'didac-hist', nombre: 'Didáctica de la Historia', semestre: 8, requisitos: [], colorId: 4 },
        { id: 'pract-doc-int', nombre: 'Práctica Docente Intermedia', semestre: 8, requisitos: [], colorId: 4 },
        { id: 'eval-aprend', nombre: 'Evaluación del y para el Aprendizaje', semestre: 8, requisitos: ['pol-pub-edu'], colorId: 4 },
        { id: 'form-fund-1', nombre: 'Formación Fundamental 1', semestre: 8, requisitos: ['etica-crist'], colorId: 6 },
        { id: 'sem-geo', nombre: 'Seminario Geografía (Optativo)', semestre: 8, requisitos: ['analisis-geo'], colorId: 7 },
        // Semestre 9
        { id: 'form-ciud-2', nombre: 'Formación Ciudadana 2', semestre: 9, requisitos: ['form-ciud-1'], colorId: 3 },
        { id: 'invest-edu-ped', nombre: 'Investigación Educativa y Pedagógica', semestre: 9, requisitos: ['eval-aprend'], colorId: 4 },
        { id: 'est-disc-com', nombre: 'Estrategias Discursivas para Comunicar y Enseñar el Conocimiento Disciplinar', semestre: 9, requisitos: ['est-disc-acc'], colorId: 8 },
        { id: 'form-fund-2', nombre: 'Formación Fundamental 2', semestre: 9, requisitos: ['form-fund-1'], colorId: 6 },
        { id: 'form-fund-3', nombre: 'Formación Fundamental 3', semestre: 9, requisitos: [], colorId: 6 },
        { id: 'sem-hist', nombre: 'Seminario Historia (Optativo)', semestre: 9, requisitos: [], colorId: 7 },
        // Semestre 10
        { id: 'pract-doc-final', nombre: 'Práctica docente final', semestre: 10, requisitos: ['pract-doc-int'], colorId: 4 },
        { id: 'sem-titulacion', nombre: 'Seminario de titulación', semestre: 10, requisitos: ['sem-hist'], colorId: 7 },
    ];
    
    // El resto del código de lógica no necesita cambios
    
    const mallaContainer = document.getElementById('malla-curricular');
    const modal = document.getElementById('modal-requisitos');
    const modalMensaje = document.getElementById('modal-mensaje');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');
    
    const TOTAL_SEMESTRES = 10;
    let ramosAprobados = new Set();

    // --- Funciones ---

    /**
     * Genera el HTML de la malla, creando las columnas de semestres y los ramos.
     */
    function generarMallaHTML() {
        // Crear las columnas de los semestres
        for (let i = 1; i <= TOTAL_SEMESTRES; i++) {
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
            semestreDiv.id = `semestre-${i}`;
            semestreDiv.innerHTML = `<h2>Semestre ${i}</h2>`;
            mallaContainer.appendChild(semestreDiv);
        }

        // Añadir cada ramo a su semestre correspondiente
        ramosData.forEach(ramo => {
            const semestreDiv = document.getElementById(`semestre-${ramo.semestre}`);
            const ramoDiv = document.createElement('div');
            ramoDiv.id = ramo.id;
            ramoDiv.className = `ramo color-${ramo.colorId}`;
            ramoDiv.textContent = ramo.nombre;
            ramoDiv.dataset.requisitos = JSON.stringify(ramo.requisitos);
            semestreDiv.appendChild(ramoDiv);
        });
    }

    /**
     * Carga el estado de los ramos aprobados desde localStorage.
     */
    function cargarEstado() {
        const aprobadosGuardados = JSON.parse(localStorage.getItem('ramosAprobadosMalla'));
        if (aprobadosGuardados) {
            ramosAprobados = new Set(aprobadosGuardados);
            ramosAprobados.forEach(id => {
                const ramoDiv = document.getElementById(id);
                if (ramoDiv) {
                    ramoDiv.classList.add('aprobado');
                }
            });
        }
    }

    /**
     * Guarda el conjunto de ramos aprobados en localStorage.
     */
    function guardarEstado() {
        localStorage.setItem('ramosAprobadosMalla', JSON.stringify([...ramosAprobados]));
    }

    /**
     * Actualiza el estado visual (bloqueado/desbloqueado) de todos los ramos.
     */
    function actualizarEstadosVisuales() {
        ramosData.forEach(ramo => {
            const ramoDiv = document.getElementById(ramo.id);
            if (!ramoDiv || ramoDiv.classList.contains('aprobado')) {
                if(ramoDiv) ramoDiv.classList.remove('bloqueado');
                return; // Si ya está aprobado, no se bloquea
            }

            const requisitos = JSON.parse(ramoDiv.dataset.requisitos);
            const requisitosCumplidos = requisitos.every(reqId => ramosAprobados.has(reqId));

            if (requisitosCumplidos) {
                ramoDiv.classList.remove('bloqueado');
            } else {
                ramoDiv.classList.add('bloqueado');
            }
        });
    }
    
    /**
     * Maneja el evento de clic en un ramo.
     */
    function manejarClickRamo(e) {
        const ramoDiv = e.target.closest('.ramo');
        if (!ramoDiv) return; // No se hizo clic en un ramo

        const ramoId = ramoDiv.id;

        // Si ya está aprobado, permitir desaprobarlo
        if (ramoDiv.classList.contains('aprobado')) {
             // Verificamos si es requisito de otro ramo ya aprobado
            const esRequisito = ramosData.some(r => 
                r.requisitos.includes(ramoId) && ramosAprobados.has(r.id)
            );

            if (esRequisito) {
                const ramosDependientes = ramosData
                    .filter(r => r.requisitos.includes(ramoId) && ramosAprobados.has(r.id))
                    .map(r => r.nombre);
                mostrarModal(`No puedes desaprobar este ramo. Es requisito para:<br><strong>${ramosDependientes.join(', ')}</strong>`);
                return;
            }
            
            ramoDiv.classList.remove('aprobado');
            ramosAprobados.delete(ramoId);
        } else {
            // Si está bloqueado, mostrar mensaje
            if (ramoDiv.classList.contains('bloqueado')) {
                const requisitosIds = JSON.parse(ramoDiv.dataset.requisitos);
                const faltantesNombres = requisitosIds
                    .filter(reqId => !ramosAprobados.has(reqId))
                    .map(reqId => ramosData.find(r => r.id === reqId)?.nombre || reqId);
                
                mostrarModal(`Para tomar este ramo, primero debes aprobar: <br><strong>${faltantesNombres.join(', ')}</strong>`);
                return;
            }
            // Aprobar el ramo
            ramoDiv.classList.add('aprobado');
            ramosAprobados.add(ramoId);
        }
        
        // Actualizar todo después del cambio
        guardarEstado();
        actualizarEstadosVisuales();
    }
    
    /**
     * Muestra el modal con un mensaje personalizado.
     */
    function mostrarModal(mensaje) {
        modalMensaje.innerHTML = mensaje;
        modal.style.display = 'block';
    }

    // --- Inicialización y Event Listeners ---

    generarMallaHTML();
    cargarEstado();
    actualizarEstadosVisuales();

    mallaContainer.addEventListener('click', manejarClickRamo);
    
    // Listeners para cerrar el modal
    cerrarModalBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
