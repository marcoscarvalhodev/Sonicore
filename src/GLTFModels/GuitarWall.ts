import {
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Texture,
} from 'three';
import Structure from '../Structure/Structure';
import * as THREE from 'three';
import ViewPositioner from './ViewPositioner';

export default class GuitarWall {
  public model;
  public scene;
  public index;
  public metal: string[];
  public texture: { guitar_texture: Texture }[];
  public loaders;
  public targetPosition;
  public initialPosition: null | THREE.Vector3;
  public time;
  public camera;
  public viewPositioner;

  constructor(structure: Structure) {
    this.camera = structure.camera.instance;
    this.time = structure.time;
    this.loaders = structure.loaders.items;
    this.initialPosition = null;
    this.targetPosition = new THREE.Vector3(2, -3, 70);
    this.scene = structure.scene;
    this.index = 0;
    this.metal = [];
    this.model = [
      { guitar_model: this.loaders.guitar_wall_model_1.scene },
      { guitar_model: this.loaders.guitar_wall_model_2.scene },
      { guitar_model: this.loaders.guitar_wall_model_3.scene },
    ];
    this.texture = [
      { guitar_texture: this.loaders.guitar_wall_texture_1 },
      { guitar_texture: this.loaders.guitar_wall_texture_2 },
      { guitar_texture: this.loaders.guitar_wall_texture_3 },
    ];

    this.viewPositioner = new ViewPositioner(this.camera);

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

  setAnimModel() {
    this.model.forEach((item) => {
      item.guitar_model.traverse((child) => {
        if (child instanceof Mesh) {
          if (child.parent?.name === 'guitar_2') {
            this.initialPosition = child.position.clone();

            child.position.lerpVectors(
              this.initialPosition,
              this.targetPosition,
              Math.min(this.time.elapsedTime / 1000, 0.175)
            );
          }
        }
      });
    });
  }

  setMaterial() {
    this.model.forEach((item) => {
      item.guitar_model.traverse((child) => {
        if (child instanceof Mesh) {
          if (child.parent?.name === 'guitar_1') {
            this.initialPosition = child.position.clone();
            

            window.addEventListener('click', () => {
              this.viewPositioner.moveToView(child);
            })
            console.log(child.position);
          }

          if (child.name.startsWith('guitar_metal')) {
            child.material = child.material.clone();

            if (child.material instanceof MeshPhysicalMaterial) {
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

      this.scene.add(model);
    });
  }

  update() {
    this.viewPositioner.update();
  }
}
