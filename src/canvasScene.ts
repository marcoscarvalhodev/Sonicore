import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

export const canvasScene = () => {
  /*GLTF Loader*/

  let model: THREE.Group<THREE.Object3DEventMap>;

  const gltfLoader = new GLTFLoader();
  gltfLoader.load('/models/sonicore.glb', (gltf) => {
    model = gltf.scene;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/textures/guitar_texture_1.jpg');
    texture.flipY = false;

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.map = texture;
          material.needsUpdate = true;
        }
      }
    });

    scene.add(model);
    model.scale.set(0.5, 0.5, 0.5);
    model.rotation.set(0, 0, 1.6);
  });

  /*Scene*/

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#ffffff');

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('sonicore-canvas')?.appendChild(renderer.domElement);

  camera.position.set(0, 0, 2);

  /*Lights*/

  const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
  directionalLight.position.set(20, 2, 20);
  scene.add(directionalLight);

  /*Animations*/

  let mouseX = 0;
  let mouseY = 0;
  let isMousePressed = false;

  // Event listener for mouse movement
  document.addEventListener('mousemove', (event) => {
    if (isMousePressed) {
      console.log('working')
      // Normalize mouse coordinates to range [-1, 1]
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Inverted Y-axis
    }
  });

  document.addEventListener('mousedown', () => {
    isMousePressed = true;
  });

  // Event listener for mouse up
  document.addEventListener('mouseup', () => {
    isMousePressed = false;
  });

  function animate() {
    requestAnimationFrame(animate);

    if (model) {
      model.rotation.y += mouseX * Math.PI * 0.01;
      model.rotation.x += (mouseY * Math.PI) / 4 * 0.01;
    }

    renderer.render(scene, camera);
  }
  animate();
};

export const CanvasAnimations = {
  canvasScene,
};
