import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import Structure from '../Structure/Structure';

export default class GuitarModel1 {
  public scene;
  public model: THREE.Group<THREE.Object3DEventMap> | null;
  public texture;

  constructor(structure: Structure) {
    this.scene = structure.scene;
    this.model = null;

    this.texture = new THREE.TextureLoader().load(
      '/textures/guitar_texture_1.jpg'
    );
    this.AnimationGuitar(() => {});
  }

  AnimationGuitar(onLoadCallback: () => void) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/models/sonicore.glb', (gltf) => {
      this.model = gltf.scene;

      console.log(this.model);

      this.texture.flipY = false;
      this.model.frustumCulled = false;

      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            map: this.texture,
            metalness: 0.9,
            roughness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
          });
        }
      });

      this.model.scale.set(1, 1, 1);

      this.scene.add(this.model);

      if (onLoadCallback) {
        onLoadCallback();
      }
    });
  }
}
