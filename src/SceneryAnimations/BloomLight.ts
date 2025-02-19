import * as THREE from 'three';
import Structure from '../Structure/Structure';


export default class BloomLight {
  public model;
  public scene;
  public structure;

  constructor(structure: Structure) {
    this.structure = structure;
    this.model = structure.loaders.items.bloom_lights.scene;
    this.scene = structure.scene;
    this.setModel();
  }

  setModel() {
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          emissive: "#ffffff",
          emissiveIntensity:6,
          toneMapped: false,
        });
      }
    });
  }
}
