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

// Crear una esfera
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Radio 0.5, 32 segmentos
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Material azul
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 2; // Mover la esfera a la derecha
scene.add(sphere);

// Posicionar la cámara
camera.position.z = 5;

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Rotar el cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rotar la esfera
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Iniciar la animación
animate();
