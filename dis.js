// Título de la página
let Titulo = document.title;

// Evento para ocultar el botón y mostrar el texto, y comenzar el dibujo de las flores
document.getElementById('mibotn').addEventListener('click', function() {
    const boton = document.getElementById('mibotn');
    boton.style.display = 'none'; // Oculta el botón
    document.querySelector('.Texto').style.display = 'block'; // Muestra el texto
    CrearVarias(); // Inicia el dibujo de las flores
});

// Obtener el contexto del canvas
const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

// Función para dibujar un pétalo
function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
    const AnguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Rotacion);
    ctx.scale(1, scala);
    ctx.beginPath();
    for (let i = 0; i <= pasos; i++) {
        const AnguloActual = i * AnguloIncrement;
        const currentRadius = Math.sin(AnguloActual) * RadioX;
        const PuntoY = Math.sin(AnguloActual) * currentRadius;
        const PuntoX = Math.cos(AnguloActual) * currentRadius;
        if (i === 0) {
            ctx.moveTo(PuntoX, PuntoY);
        } else {
            ctx.lineTo(PuntoX, PuntoY);
        }
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

// Función para dibujar una flor sin tallo
function DibujarFlorSinTallo(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo) {
    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
  
    // Dibuja los pétalos
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos < NumeroPetalos) {
            const Angulo = contadorPetalos * AnguloIncrement;
            DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 50);
            contadorPetalos++;
            setTimeout(dibujarSiguientePetalo, 100); // Retraso entre pétalos
        } else {
            // Dibuja el centro de la flor
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }
    dibujarSiguientePetalo();
}

// Función para crear varias flores
function CrearVarias() {
    const numFlores = 8;
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;

    for (let i = 0; i < numFlores; i++) {
        const fila = Math.floor(i / 4);
        const columna = i % 4;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * fila + espacioY / 2;
        DibujarFlorSinTallo(x, y, 8, 30, 80);
    }
}