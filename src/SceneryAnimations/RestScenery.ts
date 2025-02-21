import { Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';
import Structure from '../Structure/Structure';

export default class RestScenery {
  public model;
  public scene;
  public texture;
  constructor(structure: Structure) {
    this.model = structure.loaders.items.rest_scenery.scene;
    this.texture = structure.loaders.items.rest_scenery_texture;
    this.scene = structure.scene;
    this.setModel();
  }

  setModel() {
    this.texture.flipY = false;
    this.model.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        if (child.name === 'rest-scenery') {
          child.material.setValues({
            map: this.texture,
          });
        } else {
          child.material = new MeshPhysicalMaterial({
            color: "#203569",
            transparent: true,
            opacity: 0.8,
            roughness: 0.1,
            metalness: 0.1,
            transmission: 1.0,
          });
        }
      }
    });

    this.scene.add(this.model);
  }
}
