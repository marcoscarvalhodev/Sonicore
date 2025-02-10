import { Mesh, MeshStandardMaterial } from 'three';
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
        child.material.setValues({
          map: this.texture,
        });
      }
    });

    this.scene.add(this.model);
  }
}
