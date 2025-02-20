import * as THREE from 'three';
import Throttle from '../Structure/Utils/Throttle';
import { Object3DEventMap } from 'three';
import ViewPositioner from './ViewPositioner';
import gsap from 'gsap';
export default class RotateGuitar {
  public viewPositioner;
  public isMouseDown;
  public previousMousePosition;
  public guitar;
  public deltaX;
  public deltaY;
  public rotationSpeed;
  public xRotationLimits;
  public throttle;
  public targetRotation;
  public dampingFactor;
  public rotationOffset;
  public gsap;
  public normalizedZ;
  public normalizedX;
  public normalizedY;

  constructor(
    viewPositioner: ViewPositioner,
    guitar: THREE.Object3D<Object3DEventMap> | null | undefined
  ) {
    this.gsap = gsap;
    this.viewPositioner = viewPositioner;
    this.isMouseDown = false;
    this.previousMousePosition = new THREE.Vector2(0, 0);
    this.guitar = guitar;
    this.deltaX = 0;
    this.deltaY = 0;
    this.normalizedZ = 0;
    this.normalizedX = 0;
    this.normalizedY = 0;
    this.rotationSpeed = 0.005;
    this.xRotationLimits = { min: -Math.PI / 4, max: Math.PI / 4 };
    this.targetRotation = new THREE.Euler();
    this.dampingFactor = 0.035;
    this.rotationOffset = 0.1;

    window.addEventListener('mousedown', this.setMouseDown);
    window.addEventListener('touchstart', this.setMouseDown);

    this.throttle = new Throttle(this.setMouseMove, 50);

    window.addEventListener('mousemove', this.throttle.setThrottle);
    window.addEventListener('touchmove', this.throttle.setThrottle);

    window.addEventListener('mouseup', this.setMouseUp);
    window.addEventListener('touchend', this.setMouseUp);

    this.viewPositioner.on('guitar_out_camera', () => {
      this.setDispose();
      this.setStopMovement();
    });
  }

  setStopMovement() {
    const targetRotation = new THREE.Euler(0, 0, 0);

    if (this.guitar) {
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

      this.gsap.to(this.guitar.rotation, {
        z: this.guitar.rotation.z + this.normalizedZ,
        y: this.guitar.rotation.y + this.normalizedY,
        x: this.guitar.rotation.x + this.normalizedX,
        duration: 1.5,
        onComplete: () => {
          this.guitar?.rotation.set(0, 0, 0);
        },
      });

      this.deltaX = 0;
      this.deltaY = 0;
      this.rotationOffset = 0;
      this.rotationSpeed = 0;
      this.dampingFactor = 0;
    }
  }

  setMouseDown = (event: MouseEvent | TouchEvent) => {
    if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      this.previousMousePosition.set(touch.clientX, touch.clientY);
    } else {
      this.previousMousePosition.set(event.clientX, event.clientY);
    }

    this.isMouseDown = true;
  };

  setMouseMove = (event: MouseEvent | TouchEvent | undefined) => {
    if (!this.isMouseDown) return;

    if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.previousMousePosition.x;
      this.deltaY = touch.clientY - this.previousMousePosition.y;
    } else if (event instanceof MouseEvent) {
      this.deltaX = event.clientX - this.previousMousePosition.x;
      this.deltaY = event.clientY - this.previousMousePosition.y;
    }

    if (this.guitar) {
    
      const targetYRotation = this.guitar.rotation.y + this.deltaX * 0.2;
      const targetXRotation = this.guitar.rotation.x + this.deltaY * 0.2;

      const clampedXRotation = THREE.MathUtils.clamp(
        targetXRotation,
        this.xRotationLimits.min,
        this.xRotationLimits.max
      );

      // Smoothly transition to the target rotation using lerp
      this.guitar.rotation.y = THREE.MathUtils.lerp(
        this.guitar.rotation.y,
        targetYRotation,
        this.dampingFactor
      );
      this.guitar.rotation.x = THREE.MathUtils.lerp(
        this.guitar.rotation.x,
        clampedXRotation,
        this.dampingFactor
      );
    }

    if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      this.previousMousePosition.set(touch.clientX, touch.clientY);
    } else if (event instanceof MouseEvent) {
      this.previousMousePosition.set(event.clientX, event.clientY);
    }
  };

  setMouseUp = () => {
    this.isMouseDown = false;

    if (this.guitar) {
      this.targetRotation.copy(this.guitar.rotation);
      this.targetRotation.y +=
        this.deltaX * this.rotationSpeed + this.rotationOffset;
      this.targetRotation.x +=
        this.deltaY * this.rotationSpeed + this.rotationOffset;
    }

    this.animate();
  };

  animate = () => {
    if (this.isMouseDown) return;

  
    if (this.guitar) {
      this.guitar.rotation.x = THREE.MathUtils.lerp(
        this.guitar.rotation.x,
        this.targetRotation.x,
        this.dampingFactor
      );
      this.guitar.rotation.y = THREE.MathUtils.lerp(
        this.guitar.rotation.y,
        this.targetRotation.y,
        this.dampingFactor
      );
    }
  };

  setDispose() {
    window.removeEventListener('mousedown', this.setMouseDown);
    window.removeEventListener('mousemove', this.setMouseMove);
    window.removeEventListener('mouseup', this.setMouseUp);

    window.removeEventListener('touchstart', this.setMouseDown);
    window.removeEventListener('touchmove', this.setMouseMove);
    window.removeEventListener('touchend', this.setMouseUp);
  }

  update() {
    this.animate();
  }
}
