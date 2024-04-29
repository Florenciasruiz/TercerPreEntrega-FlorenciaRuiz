document.addEventListener("DOMContentLoaded", () => {
    const cuerpo = document.body;
    const botonModoColor = document.querySelector('#modo-color');
    const iconoModo = document.querySelector('#icono-modo');
    const inputNombreJugador = document.querySelector('#nombre-jugador');
    const botonIniciarJuego = document.querySelector('#iniciar-juego');
    const seleccionCategoria = document.querySelector('#categoria');
    const botonElegirCategoria = document.querySelector('#elegir-categoria');
    const textoPregunta = document.querySelector('#pregunta');
    const divOpciones = document.querySelector('#opciones');
    const seccionResultado = document.querySelector('#seccion-resultado');
    const textoResultado = document.querySelector('#resultado');
    const botonSiguiente = document.querySelector('#siguiente');

    let indicePreguntaActual = 0;
    let preguntasFiltradas = [];
    const preguntas = [
        {
            pregunta: "¿Quién es el líder de la banda británica Queen?",
            opciones: "a) Freddie Mercury\nb) John Lennon\nc) Mick Jagger\nd) Paul McCartney",
            respuestaCorrecta: "a",
            categoria: "historia"
        },
        {
            pregunta: "¿Quién es considerado el Rey del Rock and Roll?",
            opciones: "a) Bob Dylan\nb) Elvis Presley\nc) Chuck Berry\nd) Buddy Holly",
            respuestaCorrecta: "b",
            categoria: "cultura"
        },
        {
            pregunta: "¿Cuál es el festival de música más grande del mundo, que se celebra anualmente en California?",
            opciones: "a) Woodstock\nb) Lollapalooza\nc) Glastonbury\nd) Coachella",
            respuestaCorrecta: "d",
            categoria: "eventos"
        }
    ];

    botonModoColor.addEventListener("click", toggleDarkMode);

    botonIniciarJuego.addEventListener("click", () => {
        let nombreJugador = inputNombreJugador.value.trim();
        if (nombreJugador) {
            toggleDisplay('#seccion-bienvenida', '#seccion-categoria');
        } else {
            alert("Por favor, ingresa un nombre.");
        }
    });

    botonElegirCategoria.addEventListener("click", () => {
        let categoria = seleccionCategoria.value;
        if (categoria) {
            preguntasFiltradas = obtenerPreguntasPorCategoria(categoria);
            mostrarPregunta(preguntasFiltradas[indicePreguntaActual]);
            toggleDisplay('#seccion-categoria', '#seccion-pregunta');
        } else {
            alert("Por favor, selecciona una categoría.");
        }
    });

    botonSiguiente.addEventListener("click", () => {
        indicePreguntaActual++;
        if (indicePreguntaActual < preguntasFiltradas.length) {
            mostrarPregunta(preguntasFiltradas[indicePreguntaActual]);
        } else {
            alert("Has completado todas las preguntas de esta categoría. ¡Buen trabajo!");
            indicePreguntaActual = 0;
            toggleDisplay('#seccion-resultado', '#seccion-categoria');
        }
    });

    const toggleDarkMode = () => {
        cuerpo.classList.toggle('modo-oscuro');
        iconoModo.textContent = cuerpo.classList.contains('modo-oscuro') ? '🌜' : '🌞';
    };

    const toggleDisplay = (hideSelector, showSelector) => {
        document.querySelector(hideSelector).style.display = 'none';
        document.querySelector(showSelector).style.display = 'flex';
    };

    const obtenerPreguntasPorCategoria = (categoria) => preguntas.filter(pregunta => pregunta.categoria === categoria);

    const mostrarPregunta = (preguntaObjeto) => {
        textoPregunta.textContent = preguntaObjeto.pregunta;
        divOpciones.innerHTML = '';
        preguntaObjeto.opciones.split('\n').forEach(opcion => {
            let botonOpcion = document.createElement('button');
            botonOpcion.textContent = opcion;
            botonOpcion.classList.add('opcion');
            botonOpcion.addEventListener('click', () => verificarRespuesta(opcion.charAt(0), preguntaObjeto.respuestaCorrecta));
            divOpciones.appendChild(botonOpcion);
        });
    };

    const verificarRespuesta = (opcionSeleccionada, respuestaCorrecta) => {
        if (opcionSeleccionada === respuestaCorrecta) {
            textoResultado.textContent = "¡Correcto!";
            textoResultado.style.color = "green";
        } else {
            textoResultado.textContent = `Incorrecto. La respuesta correcta es: ${respuestaCorrecta.toUpperCase()}.`;
            textoResultado.style.color = "red";
        }
        toggleDisplay('#seccion-pregunta', '#seccion-resultado');
    };
});
