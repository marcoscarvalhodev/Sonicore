import * as THREE from 'three';
import Structure from './Structure';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { PMREMGenerator } from 'three';
export default class Light {
  public dirLight: null | THREE.DirectionalLight;
  public ambLight: null | THREE.AmbientLight;
  public envLight: null;
  public scene;
  public renderer;

  constructor(structure: Structure) {
    this.dirLight = null;
    this.ambLight = null;
    this.envLight = null;
    this.scene = structure.scene;
    this.renderer = structure.WGLRenderer.instance;
    this.SetInstance();
    this.SetEnvLight();
  }

  SetEnvLight() {
    const hdrLoader = new RGBELoader();

    hdrLoader.load('/textures/environment.hdr', (texture) => {
      const pmremGenerator = new PMREMGenerator(
        this.renderer as THREE.WebGLRenderer
      );

      pmremGenerator.compileEquirectangularShader();

      this.scene.environment =
        pmremGenerator.fromEquirectangular(texture).texture;
    });
  }

  SetInstance() {
    this.dirLight = new THREE.DirectionalLight('#fcfdff', 1);
    this.dirLight.position.set(-5, 5, 10);
    this.ambLight = new THREE.AmbientLight('#ffffff', 1.8);
   
  }
}
