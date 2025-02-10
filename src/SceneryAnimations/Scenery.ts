import { Mesh } from 'three';
import Structure from '../Structure/Structure';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '../MeshReflectionMaterial';
import SonicoreLogo from './SonicoreLogo';

export default class Scenery {
  public model;
  public scene;
  public texture;
  public texture_2;
  public camera;
  public renderer: null | THREE.WebGLRenderer;
  public material: MeshReflectorMaterial | null;
  public sonicore_logo;
  

  constructor(structure: Structure) {
    this.renderer = structure.WGLRenderer.instance;
    this.scene = structure.scene;
    this.texture = structure.loaders.items.scenery_texture;
    this.texture_2 = structure.loaders.items.scenery_bake_floor;
    this.model = structure.loaders.items.scenery_gltf.scene;
    this.camera = structure.camera.instance;
    this.setModel();
    this.material = null;
    this.setMaterial();
    this.sonicore_logo = new SonicoreLogo(structure);
    
  }

  setMaterial() {
    this.texture.flipY = false;
    this.texture_2.flipY = false;

    this.model.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        if (child.name === 'floor') {
          /*child.material = new MeshReflectorMaterial(
            this.renderer,
            this.camera,
            this.scene,
            child,
            {
              mixBlur: 1.4,
              mixStrength: 1,
              resolution: 1024,
              blur: [2048, 2048],
              minDepthThreshold: 1.2,
              maxDepthThreshold: 0.43,
              depthScale: 1.3,
              depthToBlurRatioBias: 0.36,
              mirror: 0,
              distortion: 1,
              mixContrast: 1.27,
              reflectorOffset: 0,
              bufferSamples: 8,
              planeNormal: new THREE.Vector3(0, 1, 1),
            }
          );*/

          child.material = new THREE.MeshStandardMaterial({
            map: this.texture_2
          })

         /* if (child.material instanceof MeshReflectorMaterial) {
            child.material.setValues({
              map: this.texture_2,
              emissiveMap: this.texture_2,
              emissive: new THREE.Color(0xffffff),
              emissiveIntensity: 0.36,
              envMapIntensity: 1.08,
              roughness: 1,
            });
          }*/

          this.material = child.material;
        } else {
          child.material = new THREE.MeshStandardMaterial({map: this.texture});
        }
      }
    });
  }

  setModel() {
    this.scene.add(this.model);
  }

  update() {
    /*this.material?.update();*/
  }
}
