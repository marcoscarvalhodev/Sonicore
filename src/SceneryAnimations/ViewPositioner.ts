import * as THREE from 'three';
import Structure from '../Structure/Structure';
import gsap from 'gsap';

export default class ViewPositioner {
  public camera;
  public time;
  public gsap;
  public targetPosition;

  constructor(structure: Structure) {
    this.time = structure.time.current;
    this.camera = structure.camera.instance;
    this.gsap = gsap;
    this.targetPosition = new THREE.Vector3();
  }

  moveToView(object: THREE.Mesh, initialPosition: THREE.Vector3 | null) {
    if (initialPosition && this.targetPosition.z < -39) {
      this.gsap
        .timeline()
        .to(object.position, {
          z: initialPosition.z + 1,
          y: initialPosition.y + 1,
          duration: 1,
        })
        .to(object.position, {
          x: this.targetPosition.x,
          y: this.targetPosition.y,
          z: this.targetPosition.z - 5,
          duration: 1.5,
          ease: 'power4.inOut',
        });
    }
  }

  returnToOriginal(object: THREE.Mesh, initialPosition: THREE.Vector3 | null) {
    this.gsap.killTweensOf(object.position);

    this.gsap.to(object.position, {
      x: initialPosition?.x,
      y: initialPosition?.y,
      z: initialPosition?.z,
      duration: 5,
    });
  }

  update() {
    this.targetPosition = new THREE.Vector3().copy(this.camera.position);
  }
}
