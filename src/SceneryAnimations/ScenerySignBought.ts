import { Mesh, MeshStandardMaterial } from 'three';
import Structure from '../Structure/Structure';
import gsap from 'gsap';

export default class ScenerySignBought {
  public model;
  public scene;
  public texture;
  public material;
  public child: Mesh | null;

  constructor(structure: Structure) {
    this.scene = structure.scene;
    this.model = structure.loaders.items.scenery_sign_bought.scene;
    this.texture = structure.loaders.items.texture_scenery_sign_bought;
    this.material = new MeshStandardMaterial();
    this.child = null;
    this.setModel();
  }

  SignAppear(guitarName: string) {
    this.model.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        const meshName = child.name.replace('_sold', '');

        if (meshName === guitarName) {

          gsap.to(child.material, {
            opacity: 1,
            duration: 2,

          });
        }
      }
    });
  }

  setModel() {
    this.texture.flipY = false;
    this.model.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        const newMaterial = new MeshStandardMaterial({
          map: this.texture,
          transparent: true,
          opacity: 0,
        });

        child.material = newMaterial;
      }
    });
    this.scene.add(this.model);
  }
}
