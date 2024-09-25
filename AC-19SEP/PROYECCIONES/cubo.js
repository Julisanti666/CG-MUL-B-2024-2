  // Clase Línea que encapsula los puntos de inicio y fin de una línea
  class Linea {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    // Método para dibujar la línea en un contexto de canvas
    dibujar(context) {
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
    }
}

// Clase Cuadrado que encapsula los cuatro lados de un cuadrado
class Cuadrado {
    constructor(x, y, tam) {
        this.x = x;
        this.y = y;
        this.tam = tam;
        this.lineas = [
            new Linea(x, y, x + tam, y),
            new Linea(x + tam, y, x + tam, y + tam),
            new Linea(x + tam, y + tam, x, y + tam),
            new Linea(x, y + tam, x, y)
        ];
    }

    // Método para dibujar el cuadrado
    dibujar(context) {
        this.lineas.forEach(linea => linea.dibujar(context));
    }
}

// Clase Cubo que contiene los métodos para dibujar el cubo en distintas proyecciones
class Cubo {
    constructor(x, y, tam) {
        this.x = x;
        this.y = y;
        this.tam = tam;
        this.frente = new Cuadrado(x, y, tam);
        this.trasera = new Cuadrado(x + tam / 2, y - tam / 2, tam);
    }

    // Método para dibujar la proyección ortográfica
    dibujar_ortografica(context) {
        this.frente.dibujar(context);
        this.trasera.dibujar(context);

        const lineasConexion = [
            new Linea(this.frente.lineas[0].x1, this.frente.lineas[0].y1, this.trasera.lineas[0].x1, this.trasera.lineas[0].y1),
            new Linea(this.frente.lineas[1].x1, this.frente.lineas[1].y1, this.trasera.lineas[1].x1, this.trasera.lineas[1].y1),
            new Linea(this.frente.lineas[2].x1, this.frente.lineas[2].y1, this.trasera.lineas[2].x1, this.trasera.lineas[2].y1),
            new Linea(this.frente.lineas[3].x1, this.frente.lineas[3].y1, this.trasera.lineas[3].x1, this.trasera.lineas[3].y1)
        ];

        lineasConexion.forEach(linea => linea.dibujar(context));
    }

    // Método para dibujar la proyección isométrica
    dibujar_isometrica(context) {
        const tam = this.tam;

        const puntos = [
            this.transformar_isometrico(0, 0, 0),
            this.transformar_isometrico(tam, 0, 0),
            this.transformar_isometrico(tam, tam, 0),
            this.transformar_isometrico(0, tam, 0),
            this.transformar_isometrico(0, 0, tam),
            this.transformar_isometrico(tam, 0, tam),
            this.transformar_isometrico(tam, tam, tam),
            this.transformar_isometrico(0, tam, tam)
        ];

        const lineas = [
            new Linea(puntos[0].x, puntos[0].y, puntos[1].x, puntos[1].y),
            new Linea(puntos[1].x, puntos[1].y, puntos[2].x, puntos[2].y),
            new Linea(puntos[2].x, puntos[2].y, puntos[3].x, puntos[3].y),
            new Linea(puntos[3].x, puntos[3].y, puntos[0].x, puntos[0].y),
            new Linea(puntos[4].x, puntos[4].y, puntos[5].x, puntos[5].y),
            new Linea(puntos[5].x, puntos[5].y, puntos[6].x, puntos[6].y),
            new Linea(puntos[6].x, puntos[6].y, puntos[7].x, puntos[7].y),
            new Linea(puntos[7].x, puntos[7].y, puntos[4].x, puntos[4].y),
            new Linea(puntos[0].x, puntos[0].y, puntos[4].x, puntos[4].y),
            new Linea(puntos[1].x, puntos[1].y, puntos[5].x, puntos[5].y),
            new Linea(puntos[2].x, puntos[2].y, puntos[6].x, puntos[6].y),
            new Linea(puntos[3].x, puntos[3].y, puntos[7].x, puntos[7].y)
        ];

        lineas.forEach(linea => linea.dibujar(context));
    }

    // Método para dibujar la proyección en perspectiva
    dibujar_perspectiva(context) {
        const tam = this.tam;
        const d = 200; // Distancia de la cámara ajustada

        const puntos = [
            this.transformar_perspectiva(0, 0, 0, d),
            this.transformar_perspectiva(tam, 0, 0, d),
            this.transformar_perspectiva(tam, tam, 0, d),
            this.transformar_perspectiva(0, tam, 0, d),
            this.transformar_perspectiva(0, 0, tam, d),
            this.transformar_perspectiva(tam, 0, tam, d),
            this.transformar_perspectiva(tam, tam, tam, d),
            this.transformar_perspectiva(0, tam, tam, d)
        ];

        const lineas = [
            new Linea(puntos[0].x, puntos[0].y, puntos[1].x, puntos[1].y),
            new Linea(puntos[1].x, puntos[1].y, puntos[2].x, puntos[2].y),
            new Linea(puntos[2].x, puntos[2].y, puntos[3].x, puntos[3].y),
            new Linea(puntos[3].x, puntos[3].y, puntos[0].x, puntos[0].y),
            new Linea(puntos[4].x, puntos[4].y, puntos[5].x, puntos[5].y),
            new Linea(puntos[5].x, puntos[5].y, puntos[6].x, puntos[6].y),
            new Linea(puntos[6].x, puntos[6].y, puntos[7].x, puntos[7].y),
            new Linea(puntos[7].x, puntos[7].y, puntos[4].x, puntos[4].y),
            new Linea(puntos[0].x, puntos[0].y, puntos[4].x, puntos[4].y),
            new Linea(puntos[1].x, puntos[1].y, puntos[5].x, puntos[5].y),
            new Linea(puntos[2].x, puntos[2].y, puntos[6].x, puntos[6].y),
            new Linea(puntos[3].x, puntos[3].y, puntos[7].x, puntos[7].y)
        ];

        lineas.forEach(linea => linea.dibujar(context));
    }

    // Transformación isométrica para proyectar un punto 3D en 2D
    transformar_isometrico(x, y, z) {
        const anguloX = Math.PI / 6;  // 30 grados para el eje X
        const anguloY = Math.PI / 6;  // 30 grados para el eje Y
        const escala = 1;

        const isoX = (x - z) * Math.cos(anguloX) * escala;
        const isoY = (x + z) * Math.sin(anguloY) * escala - y;

        return { x: this.x + isoX, y: this.y + isoY };
    }

    // Transformación en perspectiva para proyectar un punto 3D en 2D
    transformar_perspectiva(x, y, z, d) {
        const factor = d / (d + z);
        const pX = this.x + x * factor;
        const pY = this.y + y * factor;

        return { x: pX, y: pY };
    }
}

// Inicializar el canvas y dibujar las proyecciones del cubo
window.onload = function () {
    const canvas = document.getElementById('miCanvas');
    const context = canvas.getContext('2d');

    context.font = '16px Arial';
    context.fillStyle = 'black';

    // Dibujar proyección ortográfica
    const cuboOrtografico = new Cubo(100, 200, 100);
    cuboOrtografico.dibujar_ortografica(context);
    context.fillText("Proyección Ortográfica", 100, 350);

    // Dibujar proyección isométrica
    const cuboIsometrico = new Cubo(400, 200, 100);
    cuboIsometrico.dibujar_isometrica(context);
    context.fillText("Proyección Isométrica", 350, 350);

    // Dibujar proyección perspectiva
    const cuboPerspectiva = new Cubo(600, 200, 100);  // Ajustar la posición del cubo perspectiva
    cuboPerspectiva.dibujar_perspectiva(context);
    context.fillText("Proyección Perspectiva", 600, 350);
};