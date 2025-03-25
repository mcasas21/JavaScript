// Lista de 10 equipos de baloncesto
const equipos = [
    "Lakers", "Warriors", "Celtics", "Bulls", "Heat", 
    "Spurs", "Nuggets", "Knicks", "Mavericks", "76ers"
];

// Objeto que almacenará la clasificación
let clasificacion = equipos.map(equipo => ({
    nombre: equipo,
    puntos: 0, 
    Favor: 0,
    Contra: 0
}));

// Función para mostrar la clasificación
function mostrarClasificacion() {
    const tabla = document.getElementById("tabla-clasificacion");
    tabla.innerHTML = "";

    clasificacion.sort((a, b) => b.puntos - a.puntos);

    clasificacion.forEach(equipo => {
        const fila = `
            <tr>
                <td>${equipo.nombre}</td>
                <td>${equipo.puntos}</td>
                <td>${equipo.Favor}</td>
                <td>${equipo.Contra}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Función para generar partidos aleatorios
function generarPartidos() {
    const tabla = document.getElementById("tabla-resultados");
    tabla.innerHTML = "";

    let partidos = [];
    let equiposDisponibles = [...equipos];

    while (equiposDisponibles.length >= 2) {
        let equipo1 = equiposDisponibles.splice(Math.floor(Math.random() * equiposDisponibles.length), 1)[0];
        let equipo2 = equiposDisponibles.splice(Math.floor(Math.random() * equiposDisponibles.length), 1)[0];

        partidos.push({ equipo1, equipo2 });
    }

    partidos.forEach(partido => {
        const fila = `
            <tr>
                <td>${partido.equipo1}</td>
                <td><input type="number" id="puntos-${partido.equipo1}" min="0"></td>
                <td><input type="number" id="puntos-${partido.equipo2}" min="0"></td>
                <td>${partido.equipo2}</td>
                <td><button onclick="guardarResultado('${partido.equipo1}', '${partido.equipo2}')">Guardar</button></td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Función para guardar los resultados de los partidos
function guardarResultado(equipo1, equipo2) {
    let puntosEquipo1 = parseInt(document.getElementById(`puntos-${equipo1}`).value) || 0;
    let puntosEquipo2 = parseInt(document.getElementById(`puntos-${equipo2}`).value) || 0;

    let equipo1Obj = clasificacion.find(e => e.nombre === equipo1);
    let equipo2Obj = clasificacion.find(e => e.nombre === equipo2);

    equipo1Obj.puntosFavor += puntosEquipo1;
    equipo1Obj.puntosContra += puntosEquipo2;
    equipo2Obj.puntosFavor += puntosEquipo2;
    equipo2Obj.puntosContra += puntosEquipo1;

    if (puntosEquipo1 > puntosEquipo2) {
        equipo1Obj.puntos += 2; // Victoria = 2 puntos
    } else if (puntosEquipo2 > puntosEquipo1) {
        equipo2Obj.puntos += 2; // Victoria = 2 puntos
    }

    // Actualizar la clasificación
    mostrarClasificacion();
}

// Mostrar la clasificación inicial
mostrarClasificacion();
