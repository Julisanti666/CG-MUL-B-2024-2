class Linea {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}

class Cuadrado {
    constructor(x, y, lado) {
        this.x = x;
        this.y = y;
        this.lado = lado;
    }

    obtenerVertices() {
        const half = this.lado / 2;
        return [
            { x: this.x, y: this.y }, // Vértice A
            { x: this.x + half, y: this.y - half }, // Vértice B
            { x: this.x, y: this.y - this.lado }, // Vértice C
            { x: this.x - half, y: this.y - half }, // Vértice D
        ];
    }

    dibujar(ctx) {
        const vertices = this.obtenerVertices();
        const lineas = [
            new Linea(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y),
            new Linea(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y),
            new Linea(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y),
            new Linea(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y)
        ];

        lineas.forEach(linea => linea.dibujar(ctx));
    }
}

class Cubo {
    constructor(x, y, lado) {
        this.x = x;
        this.y = y;
        this.lado = lado;
        this.cuadrados = [];
        this.crearCuadrados();
    }

    crearCuadrados() {
        const offset = this.lado / 2;
        // Cara frontal
        this.cuadrados.push(new Cuadrado(this.x, this.y, this.lado)); 
        // Cara lateral
        this.cuadrados.push(new Cuadrado(this.x + offset, this.y - offset, this.lado));
        // Cara superior
        this.cuadrados.push(new Cuadrado(this.x, this.y - this.lado, this.lado));
    }

    dibujar(ctx) {
        // Dibuja cada cuadrado
        this.cuadrados.forEach(cuadrado => cuadrado.dibujar(ctx));
        
        // Conecta los vértices entre las caras para mayor claridad
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); // Vértice A (frontal)
        ctx.lineTo(this.x + this.lado / 2, this.y - this.lado / 2); // Vértice B (lateral)
        ctx.lineTo(this.x + this.lado / 2, this.y - this.lado / 2 + this.lado); // Conecta a C (superior)
        ctx.moveTo(this.x + this.lado, this.y); // Vértice D (frontal)
        ctx.lineTo(this.x + this.lado + this.lado / 2, this.y - this.lado / 2); // Conecta a B
        ctx.lineTo(this.x + this.lado / 2, this.y - this.lado / 2 + this.lado); // Conecta a C
        ctx.stroke();
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cubo = new Cubo(150, 200, 100);
cubo.dibujar(ctx);
