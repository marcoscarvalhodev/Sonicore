import * as THREE from 'three';
import Structure from './Structure';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

export default class Light {
  public dirLight: null | THREE.DirectionalLight;
  public ambLight: null | THREE.AmbientLight;
  public envLight: null ;
  public scene;

  constructor(structure: Structure) {
    this.dirLight = null;
    this.ambLight = null;
    this.envLight = null;
    this.scene = structure.scene;
    this.SetInstance();
    this.SetEnvLight();
  }

  SetEnvLight() {
    const hdrLoader = new RGBELoader();

    hdrLoader.load("/textures/environment.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
      this.scene.background = new THREE.Color("#edeef0");

      


    })
  }

  SetInstance() {
    this.dirLight = new THREE.DirectionalLight('white', 10);
    this.dirLight.position.set(-5, 5, 10);

    this.scene.add(this.dirLight);
  }
}
