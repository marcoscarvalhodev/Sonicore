import * as THREE from 'three';
import Structure from './Structure';

export default class Camera {
  public instance: THREE.PerspectiveCamera;
  public canvas;
  public scene;
  public sizes;

  constructor(structure: Structure) {
    this.canvas = structure.canvas;
    this.scene = structure.scene;
    this.sizes = structure.sizes;

    this.instance = new THREE.PerspectiveCamera();
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(0, 0, 2);
    
    this.scene.add(this.instance);

  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
