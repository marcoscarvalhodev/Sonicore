import { Mesh, MeshStandardMaterial, Object3D } from 'three';
import gsap from 'gsap';
import Structure from '../Structure/Structure';
import ViewPositioner from './ViewPositioner';
import * as THREE from 'three';
import EventEmitter from '../Structure/Utils/EventEmitter';

export default class GuitarBuy extends EventEmitter {
  public guitar;
  public timeline;
  public rotateGuitar;
  public scene;
  public normalizedX;
  public normalizedY;
  public normalizedZ;
  constructor(
    structure: Structure,
    guitar: Object3D,
    viewPositioner: ViewPositioner
  ) {
    super();
    this.scene = structure.scene;
    this.rotateGuitar = viewPositioner.rotateGuitar;
    this.normalizedX = 0;
    this.normalizedY = 0;
    this.normalizedZ = 0;
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
    const targetRotation = new THREE.Euler(0, 0, 0);

    this.normalizedX =
      THREE.MathUtils.euclideanModulo(
        targetRotation.x - this.guitar.rotation.x + Math.PI,
        Math.PI * 2
      ) - Math.PI;

    this.normalizedY =
      THREE.MathUtils.euclideanModulo(
        targetRotation.y - this.guitar.rotation.y + Math.PI,
        Math.PI * 2
      ) - Math.PI;

    this.normalizedZ =
      THREE.MathUtils.euclideanModulo(
        targetRotation.z - this.guitar.rotation.z + Math.PI,
        Math.PI * 2
      ) - Math.PI;

    this.timeline.to(this.guitar.rotation, {
      z: this.guitar.rotation.z + this.normalizedZ,
      x: this.guitar.rotation.x + this.normalizedX,
      y: this.guitar.rotation.y + this.normalizedY,
      duration: 1.2,
      onComplete: () => {
        this.guitar.rotation.set(0, 0, 0);
      },
    });
  }
}
