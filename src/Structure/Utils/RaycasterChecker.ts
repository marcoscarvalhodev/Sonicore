import * as THREE from 'three';
import Structure from '../Structure';

export default class RaycasterClick {
  public raycaster;
  public camera;
  public renderer;
  public mouse;
  public scene;
  public onGuitarClick;

  constructor(
    structure: Structure,
    onGuitarClick: (guitarName: string | undefined) => void
  ) {
    this.scene = structure.scene;
    this.renderer = structure.WGLRenderer.instance;
    this.mouse = new THREE.Vector2();
    this.camera = structure.camera.instance;
    this.raycaster = new THREE.Raycaster();
    this.onGuitarClick = onGuitarClick;
  }

  setRaycaster(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object;

      this.onGuitarClick(clickedMesh.parent?.name);
      document.body.style.cursor = 'pointer';

    } else {
      document.body.style.cursor = 'auto'
    }

   
  }
}
