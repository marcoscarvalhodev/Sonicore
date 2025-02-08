import * as THREE from 'three';
import Structure from '../Structure/Structure';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ItemsProps } from '../Structure/Loaders/Loaders';
import ShaderLoad from '../Structure/ShaderLoad';

gsap.registerPlugin(ScrollTrigger);

export default class GuitarModel1 {
  public scene;
  public model: THREE.Group<THREE.Object3DEventMap> | null;
  public time;
  public textureMap: undefined | THREE.Texture;
  public structure;
  public loaders;
  public loader: ItemsProps | null;
  public shader;
  public lenis: null | Lenis;

  constructor(structure: Structure) {
    this.structure = structure;
    this.loaders = this.structure.loaders;
    this.loader = null;
    this.scene = structure.scene;
    this.model = null;
    this.time = structure.time;
    this.textureMap = undefined;
    this.lenis = null;

    this.loader = this.loaders.items;

    this.setTextures();
    this.shader = new ShaderLoad(this.model, structure);
    this.setModel();
    this.LenisGuitar();
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
          if (
            child.name === 'Object_4' ||
            child.name === 'Object_5' ||
            child.name === 'Object_6'
          ) {
            child.material = new THREE.MeshPhysicalMaterial({
              map: this.textureMap,

              roughness: 0.1,
              metalness: 0.6,
              envMap: this.scene.environment,
              envMapIntensity: 0.6,
            });
          } else {
            child.material = this.shader.instance;
          }
        }
      });

      if (this.model) {
        this.model.scale.set(3, 3, 3);
        this.model.rotation.set(-0.3, -1.3, 1.3);
        this.model.position.set(0, 5, -6);

        this.model.castShadow = true;

        this.scene.add(this.model);
      }
    }
  }

  GuitarAnim() {
    this.shader.update();
    if (window.scrollY < 15 && this.model) {
      this.model.position.y =
        this.model.position.y + Math.sin(this.time.elapsedTime * 0.003) * 0.005;
    }
  }

  GsapGuitar() {
    const heroHeight = document.querySelector('.heroSection')?.clientHeight;

    if (this.model) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.getElementById('mainText'),
          start: `top-=${heroHeight} top`,
          end: 'bottom bottom',
          scrub: 2,
        },
      });
      tl.to(
        this.model.position,
        {
          y: this.model.position.y - 0.15,
          x: this.model.position.x - 3,
          z: this.model.position.z + 0.9,
          duration: 0.6,
        },
        0
      )
        .to(
          this.model.rotation,
          {
            y: this.model.rotation.y + 1.3,
            x: this.model.rotation.x - 1.3,
            z: this.model.rotation.z + 0.6,
            duration: 0.6,
          },
          0
        )
        .to(
          this.model.position,
          {
            x: this.model.position.x - 5,
            z: this.model.position.z,
            y: this.model.position.y - 0.1,
            duration: 1.4,
          },
          1.3
        )
        .to(
          this.model.rotation,
          {
            y: this.model.rotation.y + 3,
            z: this.model.rotation.z + 0.3,
            x: this.model.rotation.x + 0.5,
            duration: 1.4,
          },
          1.3
        )
        .to(
          this.model.rotation,
          {
            y: this.model.rotation.y + 2.2,
            z: this.model.rotation.z + 0.3,
            x: this.model.rotation.x + 0.5,
            duration: 1,
          },
          3.4
        )
        .to(
          this.model.rotation,
          {
            y: Math.PI * -1.6,
            duration: 5,
          },
          4.4
        );
    }
  }

  LenisGuitar() {
    this.lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis?.raf(time * 1000);
    });
  }

  update() {
    this.GuitarAnim();
  }
}
