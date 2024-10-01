// Configuración de la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un cubo
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Cargar una textura para la esfera
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://img.lovepik.com/photo/50104/0794.jpg_wh860.jpg'); // Reemplaza con la ruta de tu imagen

// Crear una esfera con la textura
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Radio 0.5, 32 segmentos
const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture }); // Usar la textura cargada
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 2; // Mover la esfera a la derecha
scene.add(sphere);

// Crear un romboide 3D
const rhombusGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 1, 0,   // Vértice superior
   -0.5, 0, 0, // Vértice izquierdo
    0.5, 0, 0, // Vértice derecho
    0, -1, 0,  // Vértice inferior
    0, 1, 1,   // Vértice superior trasero
   -0.5, 0, 1, // Vértice izquierdo trasero
    0.5, 0, 1, // Vértice derecho trasero
    0, -1, 1,  // Vértice inferior trasero
]);

const indices = new Uint16Array([
    0, 1, 2, // Triángulo superior
    1, 3, 2, // Triángulo inferior
    4, 5, 6, // Triángulo trasero superior
    5, 7, 6, // Triángulo trasero inferior
    0, 1, 5, // Lados
    0, 4, 5,
    2, 3, 7,
    2, 6, 7,
    0, 2, 6,
    0, 4, 6,
    1, 3, 7,
    1, 5, 7,
]);

rhombusGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
rhombusGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
rhombusGeometry.computeVertexNormals();

const rhombusMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide });
const rhombus = new THREE.Mesh(rhombusGeometry, rhombusMaterial);
rhombus.position.x = -2; // Mover el rombo a la izquierda
scene.add(rhombus);

// Funciones para movimiento aleatorio
function getRandomDirection() {
    const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
    return new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize(); // Vector de dirección
}

// Inicializar direcciones de movimiento
let cubeDirection = getRandomDirection();
let sphereDirection = getRandomDirection();
let rhombusDirection = getRandomDirection();

// Posicionar la cámara
camera.position.z = 5;

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Mover el cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.position.add(cubeDirection.clone().multiplyScalar(0.01)); // Mover lentamente

    // Mover la esfera
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.position.add(sphereDirection.clone().multiplyScalar(0.01)); // Mover lentamente

    // Mover el rombo
    rhombus.rotation.x += 0.01;
    rhombus.rotation.y += 0.01;
    rhombus.position.add(rhombusDirection.clone().multiplyScalar(0.01)); // Mover lentamente

    // Detectar límites y cambiar dirección si es necesario
    const boundary = 5; // Límite de movimiento

    [cube, sphere, rhombus].forEach((obj, index) => {
        if (obj.position.x > boundary || obj.position.x < -boundary) {
            if (index === 0) cubeDirection.x *= -1; // Cambiar dirección del cubo
            if (index === 1) sphereDirection.x *= -1; // Cambiar dirección de la esfera
            if (index === 2) rhombusDirection.x *= -1; // Cambiar dirección del rombo
        }
        if (obj.position.y > boundary || obj.position.y < -boundary) {
            if (index === 0) cubeDirection.y *= -1; // Cambiar dirección del cubo
            if (index === 1) sphereDirection.y *= -1; // Cambiar dirección de la esfera
            if (index === 2) rhombusDirection.y *= -1; // Cambiar dirección del rombo
        }
    });

    renderer.render(scene, camera);
}

// Iniciar la animación
animate();
