class Jugador {
    constructor(nombre, habilidades, atributos) {
        this.nombre = nombre;
        this.habilidades = habilidades || [];
        this.atributos = atributos || {};
        this.puntuacion = 0;
        this.estado = 'activo';

         // Añadimos un valor predeterminado para los atributos
        this.atributos.salud = this.atributos.salud || 100;
        this.atributos.energia = this.atributos.energia || 100;
        this.atributos.fuerza = this.atributos.fuerza || 10;
    }

    // Añadimos una función para personalizar las habilidades del jugador
    personalizarHabilidades(nuevasHabilidades) {
        this.habilidades = nuevasHabilidades;
    }

    // Añadimos una función para personalizar los atributos del jugador
    personalizarAtributos(nuevosAtributos) {
        this.atributos = nuevosAtributos;
    }

    // Añadimos una función para recuperar la salud del jugador
    recuperarSalud(cantidad) {
        this.atributos.salud += cantidad;
        if (this.atributos.salud > 100) {
        this.atributos.salud = 100;
        }
    }

    // Añadimos una función para recuperar la energía del jugador
    recuperarEnergia(cantidad) {
        this.atributos.energia += cantidad;
        if (this.atributos.energia > 100) {
        this.atributos.energia = 100;
        }
    }
}


class Tribu {
  constructor(nivelDificultad) {
    this.nivelDificultad = nivelDificultad;
    this.jugadores = [];
  }

  agregarJugador(jugador) {
    this.jugadores.push(jugador);
  }
}

class Tablero {
  constructor() {
    this.regiones = [];
  }

  agregarRegion(region) {
    this.regiones.push(region);
  }
}

class Region {
  constructor(nombre, recursos, peligros) {
    this.nombre = nombre;
    this.recursos = recursos;
    this.peligros = peligros;
  }
}

class Recurso {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

class Peligro {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

class Bestiario {
  constructor() {
    this.bestias = [];
  }

  agregarBestia(bestia) {
    this.bestias.push(bestia);
  }
}

class Bestia {
  constructor(nombre, fuerza, velocidad, resistencia, recompensa) {
    this.nombre = nombre;
    this.fuerza = fuerza;
    this.velocidad = velocidad;
    this.resistencia = resistencia;
    this.recompensa = recompensa;
  }
}

class Recompensa {
  constructor(descripcion) {
    this.descripcion = descripcion;
  }
}

class Carta {
  constructor(tipo, descripcion, bestia) {
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.bestia = bestia;
  }
}

const jugador1 = new Jugador('Juan');
const jugador2 = new Jugador('Maria');

const tribuFacil = new Tribu('Fácil');
tribuFacil.agregarJugador(jugador1);
tribuFacil.agregarJugador(jugador2);

const recurso1 = new Recurso('Agua');
const recurso2 = new Recurso('Comida');
const peligro1 = new Peligro('Tormenta');
const peligro2 = new Peligro('Inundación');

const region1 = new Region('Bosque', [recurso1], [peligro1]);
const region2 = new Region('Desierto', [recurso2], [peligro2]);

const tablero = new Tablero();
tablero.agregarRegion(region1);
tablero.agregarRegion(region2);

const recompensa1 = new Recompensa('10 puntos');
const recompensa2 = new Recompensa('20 puntos');

const bestia1 = new Bestia('León', 5, 3, 2, recompensa1);
const bestia2 = new Bestia('Tigre', 4, 4, 3, recompensa2);

const bestiario = new Bestiario();
bestiario.agregarBestia(bestia1);
bestiario.agregarBestia(bestia2);

const carta1 = new Carta('Caza', 'Caza un animal', bestia1);



// Crear un objeto de juego
const juego = {
  tribus: [],
  tablero: null,
  bestiario: null,
  cartaActual: null,
  turnoActual: 0,
  totalTurnos: 0,
  terminado: false,

  // Inicializar el juego con un nivel de dificultad
  iniciarJuego(nivelDificultad) {
    // Crear tribus y jugadores
    const tribuFacil = new Tribu(nivelDificultad);
    const jugador1 = new Jugador('Juan');
    const jugador2 = new Jugador('Maria');
    tribuFacil.agregarJugador(jugador1);
    tribuFacil.agregarJugador(jugador2);
    this.tribus.push(tribuFacil);

    // Crear tablero y regiones
    const recurso1 = new Recurso('Agua');
    const recurso2 = new Recurso('Comida');
    const peligro1 = new Peligro('Tormenta');
    const peligro2 = new Peligro('Inundación');
    const region1 = new Region('Bosque', [recurso1], [peligro1]);
    const region2 = new Region('Desierto', [recurso2], [peligro2]);
    const tablero = new Tablero();
    tablero.agregarRegion(region1);
    tablero.agregarRegion(region2);
    this.tablero = tablero;

    // Crear bestias y cartas
    const recompensa1 = new Recompensa('10 puntos');
    const recompensa2 = new Recompensa('20 puntos');
    const bestia1 = new Bestia('León', 5, 3, 2, recompensa1);
    const bestia2 = new Bestia('Tigre', 4, 4, 3, recompensa2);
    const bestiario = new Bestiario();
    bestiario.agregarBestia(bestia1);
    bestiario.agregarBestia(bestia2);
    this.bestiario = bestiario;
    const carta1 = new Carta('Caza', 'Caza un animal', bestia1);
    const carta2 = new Carta('Peligro', 'Enfrenta un peligro', null);
    const carta3 = new Carta('Bestia', 'Enfrenta a una bestia', bestia2);
    const cartas = [carta1, carta2, carta3];
    this.totalTurnos = cartas.length;

    // Barajar las cartas
    for (let i = cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }

    // Asignar la primera carta al juego
    this.cartaActual = cartas[0];
  },

  // Obtener la tribu actual
  obtenerTribuActual() {
    return this.tribus[this.turnoActual % this.tribus.length];
  },

  // Obtener el jugador actual
  obtenerJugadorActual() {
    const tribuActual = this.obtenerTribuActual();
    return tribuActual.jugadores[this.turnoActual % tribuActual.jugadores.length];
},

// Realizar la acción de caza en la región actual
cazar() {
    const jugadorActual = this.obtenerJugadorActual();
    const regionActual = this.tablero.obtenerRegionActual(jugadorActual);
    const resultadoCaza = jugadorActual.cazar(regionActual);
    if (resultadoCaza.bestiaEncontrada) {
    this.cartaActual.bestia = resultadoCaza.bestiaEncontrada;
}
this.avanzarTurno();
},

// Realizar la acción de enfrentar peligro en la región actual
enfrentarPeligro() {
const jugadorActual = this.obtenerJugadorActual();
const regionActual = this.tablero.obtenerRegionActual(jugadorActual);
const resultadoPeligro = jugadorActual.enfrentarPeligro(regionActual);
if (resultadoPeligro.peligroSuperado) {
this.avanzarTurno();
} else {
this.terminado = true;
}
},

// Realizar la acción de enfrentar bestia en la región actual
enfrentarBestia() {
const jugadorActual = this.obtenerJugadorActual();
const regionActual = this.tablero.obtenerRegionActual(jugadorActual);
const resultadoBestia = jugadorActual.enfrentarBestia(
regionActual,
this.cartaActual.bestia
);
if (resultadoBestia.bestiaVencida) {
jugadorActual.obtenerRecompensa(resultadoBestia.bestiaVencida.recompensa);
this.avanzarTurno();
} else {
this.terminado = true;
}
},

// Avanzar al siguiente turno y asignar la siguiente carta
avanzarTurno() {
this.turnoActual++;
if (this.turnoActual < this.totalTurnos) {
this.cartaActual = cartas[this.turnoActual];
} else {
this.terminado = true;
}
},
};

// Ejemplo de uso del juego 
juego.iniciarJuego('Fácil');
juego.cazar();
juego.enfrentarPeligro();
juego.enfrentarBestia();


