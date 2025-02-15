import * as THREE from 'three';
import Structure from '../Structure/Structure';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ItemsProps } from '../Structure/Loaders/Loaders';
import ShaderLoad from '../Structure/ShaderLoad';

gsap.registerPlugin(ScrollTrigger);

export default class MainGuitar {
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
            child.material = this.shader.instance;
          }
        }
      });

      if (this.model) {
        this.model.scale.set(3, 3, 3);
        this.model.rotation.set(0, -1, 1.6);
        this.model.position.set(2, 10, 12);

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
          y: this.model.position.y - 0.5,
          x: this.model.position.x - 5,
          z: this.model.position.z + 1.8,
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
            x: this.model.position.x - 12,
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
