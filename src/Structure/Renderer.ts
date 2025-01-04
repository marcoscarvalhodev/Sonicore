import * as THREE from 'three';
import Structure from './Structure';

export default class Renderer {
  public canvas;
  public scene;
  public camera;
  public sizes;
  public instance: THREE.WebGLRenderer | null;

  constructor(structure: Structure) {
    this.canvas = structure.canvas;
    this.scene = structure.scene;
    this.camera = structure.camera;
    this.sizes = structure.sizes;
    this.instance = null;

    this.SetInstance();
  }

  SetInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas as HTMLCanvasElement,
      antialias: true,
      alpha: true,
    });

    this.instance.outputColorSpace = THREE.LinearSRGBColorSpace;

    this.instance.setSize(this.sizes.width, this.sizes.height);
  }

  Render() {
    this.instance?.render(this.scene, this.camera.instance);
  }
}
