import {
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Texture,
  
} from 'three';
import Structure from '../Structure/Structure';

export default class GuitarWall {
  public model;
  public scene;
  public index;
  public metal: string[];
  public texture: { guitar_texture: Texture }[];
  public loaders;

  constructor(structure: Structure) {
    this.loaders = structure.loaders.items;

    this.scene = structure.scene;
    this.index = 0;
    this.metal = [];
    this.model = [
      { guitar_model: this.loaders.guitar_wall_model_1.scene },
      { guitar_model: this.loaders.guitar_wall_model_2.scene },
    ];
    this.texture = [
      { guitar_texture: this.loaders.guitar_wall_texture_1 },
      { guitar_texture: this.loaders.guitar_wall_texture_2 },
    ];

    this.setTexture();
    this.setModel();
    this.setMaterial();
  }

  setTexture() {
    this.model.forEach((item, index) => {
      item.guitar_model.traverse((child) => {
        if (
          child instanceof Mesh &&
          child.material instanceof MeshStandardMaterial
        ) {
          const textures = this.texture[index].guitar_texture;
          textures.flipY = false;
          child.material = new MeshPhysicalMaterial({ map: textures });
        }
      });
    });
  }

  setMaterial() {
    this.model.forEach((item) => {
      item.guitar_model.traverse((child) => {
        if (child instanceof Mesh) {
          if (child.name.startsWith('guitar_metal')) {
            child.material = child.material.clone();
            console.log(child.material);
            if (child.material instanceof MeshPhysicalMaterial) {
              console.log('working');
              child.material.roughness = 0.1;
              child.material.metalness = 1;
            }
          } else if (child.name.startsWith('guitar_body')) {
            child.material = child.material.clone();

            if (child.material instanceof MeshPhysicalMaterial) {
              child.material.roughness = 0;
              child.material.metalness = 0.1;
            }
          }
        }
      });
    });
  }

  setModel() {
    this.model.forEach((item) => {
      const model = item.guitar_model;

      model.frustumCulled = false;
      model.position.z = -20;
      model.position.y = -10;
      model.position.x = 1;
      model.rotation.x = 0.1;
      this.scene.add(model);
    });
  }
}
