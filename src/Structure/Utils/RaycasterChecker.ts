import * as THREE from 'three';
import Structure from '../Structure';
import { Intersection, Object3D, Object3DEventMap } from 'three';
import gsap from 'gsap';

export default class RaycasterClick {
  public raycaster;
  public camera;
  public renderer;
  public mouse;
  public scene;
  public guitarMouseEvent;
  public guitarOptions;
  public intersects: Intersection<Object3D<Object3DEventMap>>[] | null;
  public outline;
  public viewPositioner;
  constructor(
    structure: Structure,
    guitarMouseEvent: (guitarName: string) => void
  ) {
    this.scene = structure.scene;
    this.viewPositioner = structure.world.guitar_wall?.viewPositioner;
    this.renderer = structure.WGLRenderer.instance;
    this.outline = structure.postprocessing.outline;
    this.mouse = new THREE.Vector2();
    this.camera = structure.camera.instance;
    this.raycaster = new THREE.Raycaster();
    this.guitarMouseEvent = guitarMouseEvent;
    this.intersects = null;
    this.guitarOptions = [
      'guitar_1',
      'guitar_2',
      'guitar_3',
      'guitar_4',
      'guitar_5',
      'guitar_6',
      'guitar_7',
      'guitar_8',
      'guitar_9',
      'guitar_10',
      'guitar_11',
      'guitar_12',
    ];
  }

  setGuitarClick(event: MouseEvent) {

    console.log('working')
    this.setRaycaster(event);

    if (this.intersects) {
      if (this.intersects.length === 0) return;

      const clickedMesh = this.intersects[0].object;

      if (
        clickedMesh.parent &&
        this.guitarOptions.includes(clickedMesh.parent.name)
      ) {
        this.guitarMouseEvent(clickedMesh.parent.name);
      }
    }
  }

  setGuitarHover(event: MouseEvent) {
    this.setRaycaster(event);

    if (this.intersects) {
      if (this.intersects.length === 0) return;

      const clickedMesh = this.intersects[0].object;

      if (
        clickedMesh.parent &&
        this.guitarOptions.includes(clickedMesh.parent.name)
      ) {
        if (this.outline) {
          this.outline.selection.set(clickedMesh.parent.children);

          gsap.set(document.body, { cursor: 'pointer' });
        }
        this.guitarMouseEvent(clickedMesh.parent.name);
      } else {
        this.outline?.selection.set([]);
        gsap.set(document.body, { cursor: 'default' });
      }
    }
  }

  setRaycaster(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    this.intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );

    this.outline?.selection.set([]);
  }
}
