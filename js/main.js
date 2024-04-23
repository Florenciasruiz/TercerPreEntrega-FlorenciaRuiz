document.addEventListener("DOMContentLoaded", function() {
    const cuerpo = document.querySelector('body');
    const botonModoColor = document.querySelector('#modo-color');
    const iconoModo = document.querySelector('#icono-modo');
    const botonIniciarJuego = document.querySelector('#iniciar-juego');
    const seleccionCategoria = document.querySelector('#categoria');
    const botonElegirCategoria = document.querySelector('#elegir-categoria');
    const seccionPregunta = document.querySelector('#seccion-pregunta');
    const textoPregunta = document.querySelector('#pregunta');
    const divOpciones = document.querySelector('#opciones');
    const botonResponder = document.querySelector('#responder');
    const seccionResultado = document.querySelector('#seccion-resultado');
    const textoResultado = document.querySelector('#resultado');
    const botonSiguiente = document.querySelector('#siguiente');

    botonModoColor.addEventListener("click", function() {
        cuerpo.classList.toggle('modo-oscuro');
        iconoModo.textContent = cuerpo.classList.contains('modo-oscuro') ? '🌜' : '🌞';
    });

    botonIniciarJuego.addEventListener("click", function() {
        const nombreJugador = document.querySelector('#nombre-jugador').value.trim();
        if (nombreJugador) {
            alternarMostrar('#seccion-bienvenida', '#seccion-categoria');
        } else {
            alert("Por favor, ingresa un nombre.");
        }
    });

    botonElegirCategoria.addEventListener("click", function() {
        iniciarJuego(seleccionCategoria.value);
    });

    botonResponder.addEventListener("click", function() {
        verificarRespuesta();
    });

    botonSiguiente.addEventListener("click", function() {
        alternarMostrar('#seccion-resultado', '#seccion-categoria');
    });

    function alternarMostrar(elementoActual, elementoSiguiente) {
        document.querySelector(elementoActual).style.display = 'none';
        document.querySelector(elementoSiguiente).style.display = 'flex';
    }

    function iniciarJuego(categoria) {
        // Aquí iría la lógica para cargar preguntas basadas en la categoría
        // Por ejemplo, cargar preguntas y mostrar la primera pregunta
        alert("Categoría seleccionada: " + categoria);
    }

    function verificarRespuesta() {
        // Aquí iría la lógica para verificar la respuesta seleccionada
        alert("Respuesta verificada.");
    }
});
