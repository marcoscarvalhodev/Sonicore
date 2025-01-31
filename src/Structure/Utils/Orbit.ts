import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Structure from '../Structure';

export default class Orbit {
  public camera;
  public renderer;
  public controls;
  constructor(structure: Structure) {
    this.camera = structure.camera.instance;
    this.renderer = structure.WGLRenderer.instance?.domElement;
    this.controls = new OrbitControls(this.camera, this.renderer);
    this.controls.enableDamping = true;
    this.controls.update();
  }

  update() {
    this.controls.update();
  }
}
