import * as THREE from 'three';
import Structure from './Structure';

import ScreenSizes from './Utils/ScreenSizes';

const { sm } = ScreenSizes();

export default class WGLRenderer {
  public canvas;
  public scene;
  public camera;
  public sizes;
  public instance: THREE.WebGLRenderer | null;
  public pixelRatio;

  constructor(structure: Structure) {
    this.canvas = structure.canvas;
    this.scene = structure.scene;
    this.camera = structure.camera.instance;
    this.sizes = structure.sizes;
    this.instance = null;
    this.pixelRatio = structure.sizes.pixelRatio;
    this.SetInstance();
  }

  SetInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas as HTMLCanvasElement,
      antialias: false,
    });

    this.instance.shadowMap.enabled = sm ? false : true;
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setSize(this.sizes.width, this.sizes.height);
  }

  resize() {
    this.instance?.setSize(this.sizes.width, this.sizes.height);
    this.instance?.setPixelRatio(this.pixelRatio);
  }

  Render() {
    this.instance?.render(this.scene, this.camera);
  }
}
