import { Mesh, MeshStandardMaterial, Object3D } from 'three';
import gsap from 'gsap';
import RotateGuitar from './RotateGuitar';
import Structure from '../Structure/Structure';

export default class GuitarBuy {
  public guitar;
  public timeline;
  public rotateGuitar;
  public scene;
  constructor(
    structure: Structure,
    guitar: Object3D,
    rotateGuitar: RotateGuitar | null
  ) {
    this.scene = structure.scene;
    this.rotateGuitar = rotateGuitar;
    this.guitar = guitar;

    this.timeline = gsap.timeline({
      onComplete: () => {
        this.guitar.children.forEach((item) => {
          if (
            item instanceof Mesh &&
            item.material instanceof MeshStandardMaterial
          ) {
            gsap.fromTo(
              item.material,
              { opacity: 1 },
              {
                opacity: 0,
                duration: 1.5,
                onComplete: () => {
                  if (this.guitar.parent) {
                    this.scene.remove(this.guitar.parent);
                  }
                },
              }
            );
          }
        });

        this.rotateGuitar?.setDispose();
        this.rotateGuitar?.setStopMovement();
      },
    });
  }

  setGuitarRemove() {
    [...Array(5)].forEach((_, index) => {
      if (index % 2 === 0) {
        this.timeline.to(this.guitar.rotation, {
          z: 0,
          y: 1,
          x: 0,
          duration: 0.2,
        });
      } else {
        this.timeline.to(this.guitar.rotation, {
          y: -1,
          x: 0,
          z: 0,
          duration: 0.2,
        });
      }
    });

    this.timeline.to(this.guitar.rotation, { z: 0, y: 0, x: 0, duration: 0.2 });
  }
}
