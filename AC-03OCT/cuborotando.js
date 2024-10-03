const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Recupera el número de cubos del localStorage o inicializa en 1 si no existe
let numCubes = localStorage.getItem('numCubes') ? parseInt(localStorage.getItem('numCubes')) : 1;

// Limita el número máximo de cubos a 5
if (numCubes > 5) {
    numCubes = 5;
}

// Guarda el nuevo número de cubos en el localStorage, asegurando que no exceda 5
localStorage.setItem('numCubes', Math.min(numCubes + 1, 5));

// Arreglo para los cubos generados
const cubes = [];
let currentCube = 0;  // Para contar cuántos cubos se han añadido

// Función para añadir un cubo a la escena
function addCube() {
    if (currentCube < numCubes) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff }); // Color aleatorio
        const cube = new THREE.Mesh(geometry, material);

        // Alineación en el eje X, dejando un espacio de 1.5 entre cubos
        cube.position.x = currentCube * 1.5;

        scene.add(cube);
        cubes.push(cube);
        currentCube++;  // Incrementa el número de cubos añadidos
    }
}

// Añade los cubos de uno en uno con un intervalo
const cubeInterval = setInterval(() => {
    if (currentCube >= numCubes) {
        clearInterval(cubeInterval);  // Detiene el intervalo cuando todos los cubos han sido añadidos
    } else {
        addCube();  // Añade un cubo
    }
}, 1000);  // Intervalo de 1 segundo

camera.position.z = 10;

function animate() {
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}