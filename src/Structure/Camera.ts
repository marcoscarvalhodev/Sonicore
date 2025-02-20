import * as THREE from 'three';
import Structure from './Structure';
import ScreenSizes from './Utils/ScreenSizes';

const { sm, md, lg } = ScreenSizes();

export default class Camera {
  public instance: THREE.PerspectiveCamera;
  public canvas;
  public scene;
  public sizes;
  public time;

  constructor(structure: Structure) {
    this.canvas = structure.canvas;
    this.scene = structure.scene;
    this.sizes = structure.sizes;
    this.time = structure.time;

    this.instance = new THREE.PerspectiveCamera();
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      sm ? 90 : md ? 60 : 40,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(-2, 10, sm || md ? 20 : lg ? 32 : 24);

    this.instance.updateProjectionMatrix();

    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
