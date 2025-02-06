import { MeshStandardMaterial } from 'three';
import Structure from '../Structure/Structure';
import * as THREE from 'three';

export default class SonicoreLogo {
  public model;
  public scene;
  constructor(structure: Structure) {
    this.scene = structure.scene;
    this.model = structure.loaders.items.sonicore_logo.scene;
    this.setModel();
  }

  setModel() {
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new MeshStandardMaterial({
          color: new THREE.Color(1.0, 0, 0),
          emissive: new THREE.Color(0.8,  0.2, 0.1),
          emissiveIntensity: 5,
        });
      }
    });
    this.scene.add(this.model);
  }
}
