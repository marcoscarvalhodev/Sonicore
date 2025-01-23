import { Mesh } from 'three';
import Structure from '../Structure/Structure';
import * as THREE from 'three';

export default class Scenery {
  public model;
  public scene;
  public texture;
  constructor(structure: Structure) {
    this.texture = structure.loaders.items.scenery_texture;
    this.scene = structure.scene;
    this.model = structure.loaders.items.scenery_gltf.scene;
    this.setModel();
    this.setMaterial();
  }

  setMaterial() {
    this.texture.flipY = false;

    this.model.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.roughness = 1;
        
      }
    });
  }

  setModel() {
    this.model.position.z = -20;
    this.model.position.y = -10;
    
    this.model.position.x = 1;
    this.model.rotation.x = 0.1;

    this.scene.add(this.model);
  }
}
