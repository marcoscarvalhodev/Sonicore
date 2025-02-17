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
        child.receiveShadow = true;
        if (child.name === 'floor') {
          child.material = new THREE.MeshStandardMaterial({
            map: this.texture_2,
          });

          this.material = child.material;
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
}
