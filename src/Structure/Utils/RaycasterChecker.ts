import * as THREE from 'three';
import Structure from '../Structure';

export default class RaycasterClick {
  public raycaster;
  public camera;
  public renderer;
  public mouse;
  public scene;
  public onGuitarClick;
  public guitarOptions;
  constructor(
    structure: Structure,
    onGuitarClick: (guitarName: string) => void
  ) {
    this.scene = structure.scene;
    this.renderer = structure.WGLRenderer.instance;
    this.mouse = new THREE.Vector2();
    this.camera = structure.camera.instance;
    this.raycaster = new THREE.Raycaster();
    this.onGuitarClick = onGuitarClick;
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

  setRaycaster(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );

    if (intersects.length === 0) return;

    const clickedMesh = intersects[0].object;

    if (clickedMesh.parent && this.guitarOptions.includes(clickedMesh.parent.name)) {
      this.onGuitarClick(clickedMesh.parent.name);
    }
  }
}
