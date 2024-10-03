  // Crear la escena
  const escena = new THREE.Scene();
  escena.background = new THREE.Color(0x000000); // Fondo negro

  // Crear la cámara
  const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camara.position.z = 10; // Alejamos un poco más la cámara para mayor visibilidad

  // Crear el renderizador
  const renderizador = new THREE.WebGLRenderer();
  renderizador.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderizador.domElement);

  // Añadir luz ambiental
  const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.5); 
  escena.add(luzAmbiental);

  // Añadir luz direccional
  const luzDireccional = new THREE.DirectionalLight(0xffffff, 1);
  luzDireccional.position.set(1, 1, 1).normalize();
  escena.add(luzDireccional);

  const cubes = []; // Array para almacenar los cubos

  // Función para crear un cubo
  function crearCubo() {
    const geometriaCubo = new THREE.BoxGeometry(1, 1, 1);
    const materialCubo = new THREE.MeshBasicMaterial({
      color: 0xffffff, // Color blanco
      wireframe: true
    });

    const cubo = new THREE.Mesh(geometriaCubo, materialCubo);
    return cubo;
  }

  // Crear y centrar los cubos
  const numeroObjetos = 5; // Número fijo de cubos alineados
  const separacion = 2; // Distancia entre cubos
  for (let i = 0; i < numeroObjetos; i++) {
    const cubo = crearCubo();
    cubo.position.x = (i - (numeroObjetos - 1) / 2) * separacion; // Centrar los cubos
    escena.add(cubo);
    cubes.push(cubo); // Agregar el cubo al array
  }

  // Añadir controles de órbita
  const controles = new THREE.OrbitControls(camara, renderizador.domElement);

  // Función de animación
  function animar() {
    requestAnimationFrame(animar);

    // Rotar cada cubo
    cubes.forEach(cube => {
      cube.rotation.x += 0.01; // Rota alrededor del eje X
      cube.rotation.y += 0.01; // Rota alrededor del eje Y
    });

    controles.update(); // Actualizar los controles en cada frame
    renderizador.render(escena, camara); // Renderizar la escena
  }

  // Iniciar la animación
  animar();

  // Ajustar el renderizado si se cambia el tamaño de la ventana
  window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
  });