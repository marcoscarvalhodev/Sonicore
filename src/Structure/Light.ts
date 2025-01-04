import * as THREE from 'three';
import Structure from './Structure';

export default class Light {
  public instance: null | THREE.DirectionalLight;
  public scene;

  constructor(structure: Structure) {
    this.instance = null;
    this.scene = structure.scene;
    this.SetInstance();
  }

  SetInstance() {
    this.instance = new THREE.DirectionalLight('white', 5);
    this.instance.position.set(2, 2, 10);
    this.scene.add(this.instance);
  }
}
