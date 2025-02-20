import * as THREE from 'three';
import Structure from '../Structure/Structure';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ItemsProps } from '../Structure/Loaders/Loaders';
import ScreenSizes from '../Structure/Utils/ScreenSizes';

const { sm, md, lg } = ScreenSizes();

gsap.registerPlugin(ScrollTrigger);

export default class MainGuitar {
  public scene;
  public model: THREE.Group<THREE.Object3DEventMap> | null;
  public time;
  public textureMap: undefined | THREE.Texture;
  public structure;
  public loaders;
  public loader: ItemsProps | null;
  public heroHeight;
  constructor(structure: Structure) {
    this.structure = structure;
    this.loaders = this.structure.loaders;
    this.loader = null;
    this.scene = structure.scene;
    this.model = null;
    this.time = structure.time;
    this.textureMap = undefined;
    this.heroHeight = document.querySelector('.heroSection')?.clientHeight;
    this.loader = this.loaders.items;

    this.setTextures();
    
    this.setModel();
    this.GsapGuitar();
  }

  setTextures() {
    if (this.loader) {
      this.textureMap = this.loader.texture_base_1;
      this.textureMap.flipY = false;
    }
  }

  setModel() {
    if (this.loader) {
      this.model = this.loader.model_guitar_1.scene;
      this.model.frustumCulled = false;

      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name === 'guitar_metal') {
            child.material = new THREE.MeshPhysicalMaterial({
              map: this.textureMap,

              roughness: 0.2,
              metalness: 1,
              envMap: this.scene.environment,
              envMapIntensity: 1,
            });
          } else if (child.name === 'guitar_rough') {
            child.material = new THREE.MeshPhysicalMaterial({
              map: this.textureMap,

              roughness: 1,
              metalness: 0.1,
              envMap: this.scene.environment,
              envMapIntensity: 1,
            });
          } else {
            child.material = new THREE.MeshPhysicalMaterial({
              roughness: 0.2,
              metalness: 0.1,
              map: this.textureMap,
            });
          }
        }
      });

      if (this.model) {
        this.model.scale.set(3, 3, 3);
        this.model.rotation.set(0, -1, 1.6);
        this.model.position.set(
          sm || md ? 1 : 4,
          10,
          sm ? 12 : md ? 9 : lg ? 16 : 8
        );

        this.model.castShadow = true;

        this.scene.add(this.model);
      }
    }
  }

  GuitarAnim() {
    const guitar_trigger = document.getElementById(
      'main-guitar-trigger'
    )?.clientHeight;
    if (
      guitar_trigger &&
      this.heroHeight &&
      window.scrollY < guitar_trigger - this.heroHeight &&
      this.model
    ) {
      this.model.position.y =
        this.model.position.y + Math.sin(this.time.elapsedTime * 0.003) * 0.005;
    }
  }

  GsapGuitar() {
    if (this.model) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.getElementById('mainText'),
          start: `top-=${this.heroHeight} top`,
          end: 'bottom bottom',
          scrub: 2,
        },
      });
      tl.to(
        this.model.position,
        {
          y: this.model.position.y - 0.5,
          x: this.model.position.x - (sm || md ? 4 : 7.5),
          z: this.model.position.z + (sm ? 2 : md ? 4.5 : 8.5),
          duration: 0.6,
        },
        0
      )
        .to(
          this.model.rotation,
          {
            y: this.model.rotation.y + 1,
            x: this.model.rotation.x - 1.55,
            z: this.model.rotation.z,
            duration: 0.6,
          },
          0
        )
        .to(
          this.model.position,
          {
            x: this.model.position.x - (sm || md ? 6 : 12),
            z: this.model.position.z,
            y: this.model.position.y - 0.1,
            duration: 1.4,
          },
          1.3
        )
        .to(
          this.model.rotation,
          {
            y: this.model.rotation.y + 2.3,
            z: this.model.rotation.z,
            x: this.model.rotation.x,
            duration: 1.4,
          },
          1.3
        )
        .to(
          this.model.rotation,
          {
            y: Math.PI * -1.7,

            duration: 5,
          },
          4
        );
    }
  }

  update() {
    this.GuitarAnim();
  }
}
