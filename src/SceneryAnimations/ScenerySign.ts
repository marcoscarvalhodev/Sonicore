import { Mesh, MeshStandardMaterial } from 'three';
import Structure from '../Structure/Structure';

export default class ScenerySign {
  public model;
  public scene;
  public texture;
  constructor(structure: Structure) {
    this.scene = structure.scene;
    this.model = structure.loaders.items.scenery_sign.scene;
    this.texture = structure.loaders.items.texture_scenery_sign;
    this.setModel();
  }

  setModel() {
    this.texture.flipY = false;
    this.model.traverse((child) => {
      child.receiveShadow = true;
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        child.material.setValues({ map: this.texture });
      }
    });
    this.scene.add(this.model);
  }
}
