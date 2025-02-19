import * as THREE from 'three';
import Structure from './Structure';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { PMREMGenerator } from 'three';
import ScreenSizes from './Utils/ScreenSizes';
const { sm } = ScreenSizes();

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

      const envTexture = pmremGenerator.fromEquirectangular(texture).texture;

      this.scene.environment = envTexture;
    });
  }

  SetInstance() {
    this.dirLight = new THREE.DirectionalLight('#ffffff', 0.5);
    this.dirLight.position.set(5, 4, 50);
    this.ambLight = new THREE.AmbientLight('#ffffff', 1);
    this.dirLight.castShadow = true;

    this.dirLight.shadow.mapSize.width = sm ? 256 : 512;
    this.dirLight.shadow.mapSize.height = sm ? 256 : 512;
    this.dirLight.shadow.camera.left = -20;
    this.dirLight.shadow.camera.right = 20;
    this.dirLight.shadow.camera.top = 20;
    this.dirLight.shadow.camera.bottom = -20;

    this.scene.add(
      this.dirLight,
      this.ambLight,
    );
  }

}
