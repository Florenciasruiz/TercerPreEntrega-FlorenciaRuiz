document.addEventListener("DOMContentLoaded", function() {
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
    const seccionBienvenida = document.querySelector('#seccion-bienvenida');
    const seccionCategoria = document.querySelector('#seccion-categoria');
    const seccionPregunta = document.querySelector('#seccion-pregunta');
    const botonSiguiente = document.querySelector('#siguiente');
    
    botonSiguiente.addEventListener("click", siguientePregunta);

    const botonCancelar = document.querySelector('#cancelar'); 

    botonCancelar.addEventListener("click", function() {
        if (confirm("¿Estás seguro de que quieres cancelar el juego?")) {
            alert("¡Has cancelado el juego!");
            resetearJuego();
        }
    });

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
    botonIniciarJuego.addEventListener("click", iniciarJuego);
    botonElegirCategoria.addEventListener("click", elegirCategoria);
    botonCancelar.addEventListener("click", function() {
        if (confirm("¿Estás seguro de que quieres cancelar el juego?")) {
            alert("¡Has cancelado el juego!");
            resetearJuego();
        }
    });
    botonSiguiente.addEventListener("click", siguientePregunta);

    function toggleDarkMode() {
        cuerpo.classList.toggle('modo-oscuro');
        iconoModo.textContent = cuerpo.classList.contains('modo-oscuro') ? '🌜' : '🌞';
    }

    function iniciarJuego() {
        let nombreJugador = inputNombreJugador.value.trim();
        if (nombreJugador) {
            toggleDisplay(seccionBienvenida, seccionCategoria);
        } else {
            alert("Por favor, ingresa un nombre.");
        }
    }

    function elegirCategoria() {
        let categoria = seleccionCategoria.value;
        if (categoria) {
            preguntasFiltradas = obtenerPreguntasPorCategoria(categoria);
            mostrarPregunta(preguntasFiltradas[indicePreguntaActual]);
            toggleDisplay(seccionCategoria, seccionPregunta);
        } else {
            alert("Por favor, selecciona una categoría.");
        }
    }

    function siguientePregunta() {
        indicePreguntaActual++;
        if (indicePreguntaActual < preguntasFiltradas.length) {
            mostrarPregunta(preguntasFiltradas[indicePreguntaActual]);
        } else {
            alert("Has completado todas las preguntas de esta categoría. ¡Buen trabajo!");
            indicePreguntaActual = 0;
            toggleDisplay(seccionResultado, seccionCategoria);
        }
    }

    function toggleDisplay(elementoParaOcultar, elementoParaMostrar) {
        elementoParaOcultar.style.display = 'none';
        elementoParaMostrar.style.display = 'block';
    }

    function obtenerPreguntasPorCategoria(categoria) {
        return preguntas.filter(pregunta => pregunta.categoria === categoria);
    }

    function resetearJuego() {
        seccionBienvenida.style.display = 'flex';
        seccionCategoria.style.display = 'none';
        seccionPregunta.style.display = 'none';
        seccionResultado.style.display = 'none';
        indicePreguntaActual = 0;
        preguntasFiltradas = [];
        window.scrollTo(0, 0); 
    }    

    function mostrarPregunta(preguntaObjeto) {
        textoPregunta.textContent = preguntaObjeto.pregunta;
        divOpciones.innerHTML = '';
        const opciones = preguntaObjeto.opciones.split('\n');
        opciones.forEach(opcion => {
            let botonOpcion = document.createElement('button');
            botonOpcion.textContent = opcion;
            botonOpcion.classList.add('opcion');
            botonOpcion.addEventListener('click', () => verificarRespuesta(opcion.charAt(0), preguntaObjeto.respuestaCorrecta));
            divOpciones.appendChild(botonOpcion);
        });
    }

    function verificarRespuesta(opcionSeleccionada, respuestaCorrecta) {
        if (opcionSeleccionada === respuestaCorrecta) {
            textoResultado.textContent = "¡Correcto!";
            textoResultado.style.color = "green";
        } else {
            textoResultado.textContent = `Incorrecto. La respuesta correcta es: ${respuestaCorrecta.toUpperCase()}.`;
            textoResultado.style.color = "red";
        }
        toggleDisplay(seccionPregunta, seccionResultado);
    }
});

