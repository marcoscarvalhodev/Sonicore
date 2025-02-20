import { Mesh } from 'three';
import Structure from '../Structure/Structure';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '../MeshReflectionMaterial';
import SonicoreLogo from './SonicoreLogo';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import ScreenSizes from '../Structure/Utils/ScreenSizes';

const {sm} = ScreenSizes();

export default class Scenery {
  public model;
  public scene;
  public texture;
  public texture_2;
  public camera;
  public renderer: null | THREE.WebGLRenderer;
  public material: MeshReflectorMaterial | null;
  public sonicore_logo;
  public child: null | Mesh;
  public structure;
  constructor(structure: Structure) {
    this.structure = structure;
    this.renderer = structure.WGLRenderer.instance;
    this.scene = structure.scene;
    this.texture = structure.loaders.items.scenery_texture;
    this.texture_2 = structure.loaders.items.scenery_bake_floor;
    this.model = structure.loaders.items.scenery_gltf.scene;
    this.camera = structure.camera.instance;
    this.child = null;
    this.setModel();
    this.material = null;
    this.setMaterial();
    this.sonicore_logo = new SonicoreLogo(structure);

  }

  setGUI() {
    const gui = new GUI();
    gui.addFolder('reflector');

    if (this.material) {
      gui.add(this.material.reflectorProps, 'mixBlur', -1, 1);
      gui.add(this.material.reflectorProps, 'mixStrength', -5, 5);
      gui.add(this.material.reflectorProps, 'mirror', -2, 2);
      gui.add(this.material.reflectorProps, 'mixContrast', -2, 2);
      gui.add(this.material.reflectorProps, 'depthToBlurRatioBias', -3, 3);
    }
  }

  setMaterial() {
    this.texture.flipY = false;
    this.texture_2.flipY = false;

    this.model.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.receiveShadow = true;

        if (child.name === 'floor') {
          this.material = new MeshReflectorMaterial(
            this.renderer,
            this.camera,
            this.scene,
            child,
            {
              mixBlur: sm? 1 : 0.65,
              mixStrength: sm ? 0.8: 1.3,
              resolution: 1024,
              blur: [512, 512],
              minDepthThreshold: 0.8,
              maxDepthThreshold: 1.9,
              depthScale: 5,
              depthToBlurRatioBias: 0.6,
              mirror: -1.2,
              distortion: 0,
              mixContrast: 2,
              reflectorOffset: -10,
              planeNormal: new THREE.Vector3(0, 1, 0),
            }
          );

          child.material = this.material;

          if (child.material instanceof MeshReflectorMaterial) {
            child.material.setValues({
              map: this.texture_2,
              roughness: 1,
              envMap: this.scene.environment,
              envMapIntensity: 1,
            });
          }

          this.child = child;
        } else {
          child.material = new THREE.MeshStandardMaterial({
            map: this.texture,
          });
        }
      }
    });
  }

  setModel() {
    this.scene.add(this.model);
  }

  update() {
    if (this.material instanceof MeshReflectorMaterial) {
      this.material?.update();
    }
  }
}
