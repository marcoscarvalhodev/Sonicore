import * as TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';

export default class ViewPositioner {
  public camera;
  public viewDistance;
  public originalPositions;
  public tween: null | TWEEN.Tween;
  public tweens: TWEEN.Tween[];
  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.viewDistance = 10;
    this.originalPositions = new Map();
    this.tween = new TWEEN.Tween(new THREE.Vector3());
    this.tweens = [this.tween];
  }

  moveToView(object: THREE.Mesh) {
    if (!this.originalPositions.has(object.uuid)) {
      this.originalPositions.set(object.uuid, {
        position: object.position.clone(),
      });
    }

    const viewPosition = new THREE.Vector3();
    viewPosition.copy(this.camera.position);

    this.tween = new TWEEN.Tween(object.position)
      .to(
        {
          x: viewPosition.x,
          y: viewPosition.y,
          z: viewPosition.z - 5,
        },
        2000
      )
      .easing(TWEEN.Easing.Linear.None)
      .start();

    this.tweens.push(this.tween);
  }

  // Return object to its original position
  returnToOriginal(object: THREE.Mesh) {
    const originalPos = this.originalPositions.get(object.uuid);
    if (!originalPos) return;

    this.tween = new TWEEN.Tween(object.position)
      .to(
        {
          x: originalPos.position.x,
          y: originalPos.position.y,
          z: originalPos.position.z,
        },
        1000
      )
      .easing(TWEEN.Easing.Linear.None)
      .start();

    this.tweens.push(this.tween);
  }

  update() {
    this.tweens.forEach((item) => {
      item.update();
    });
  }
}
