const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Recupera el número de cubos del localStorage o inicializa en 0 si no existe
let numCubes = localStorage.getItem('numCubes') ? parseInt(localStorage.getItem('numCubes')) : 0;

// Aumenta el número de cubos y lo guarda en localStorage
numCubes += 1;
localStorage.setItem('numCubes', numCubes);

// Arreglo para los cubos generados
const cubes = [];

// Función para añadir un cubo a la escena
function addCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff }); // Color aleatorio
    const cube = new THREE.Mesh(geometry, material);

    // Alineación en el eje X, dejando un espacio de 1.5 entre cubos
    cube.position.x = cubes.length * 1.5;

    scene.add(cube);
    cubes.push(cube);
}

// Añade los cubos según el número guardado en localStorage
for (let i = 0; i < numCubes; i++) {
    addCube();
}

camera.position.z = 10;

function animate() {
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}
