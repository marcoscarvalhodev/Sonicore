import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
import Structure from '../Structure/Structure';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default class GuitarModel1 {
  public scene;
  public model: THREE.Group<THREE.Object3DEventMap> | null;
  public texture;
  public time;
  public textureMap;
  public textureNormal;
  public textureRoughness;

  constructor(structure: Structure) {
    this.scene = structure.scene;
    this.model = null;
    this.time = structure.time;
    this.texture = new THREE.TextureLoader();
    this.textureMap = this.texture.load('/textures/base_color_3.jpg');
    this.textureRoughness = this.texture.load('/textures/guitar_roughness.png');
    this.textureNormal = this.texture.load('/textures/guitar_normal.png');

    this.AnimationGuitar(() => {});
  }

  AnimationGuitar(onLoadCallback: () => void) {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load('/models/sonicore.glb', (gltf) => {
      this.model = gltf.scene;

      this.textureMap.flipY = false;
      this.model.frustumCulled = false;

      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            map: this.textureMap,
            metalness: 0.9,
            roughness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            envMap: this.scene.environment,
            envMapIntensity: 0.5,
          });
        }
      });

      this.model.scale.set(0.5, 0.5, 0.5);
      this.model.rotation.set(-0.3, -1, 1.3);
      this.model.position.set(-2, 0.5, -0.5);
      this.model.position.setLength(-1);
      this.model.castShadow = true;

      this.LenisGuitar();
      this.GsapGuitar();

      this.scene.add(this.model);

      if (onLoadCallback) {
        onLoadCallback();
      }
    });
  }

  GuitarAnim() {
    if (window.scrollY < 15 && this.model) {
      this.model.position.y =
        this.model.position.y + Math.sin(this.time.elapsedTime * 0.003) * 0.005;
    }
  }

  GsapGuitar() {
    if (this.model) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });
      tl.to(
        this.model.position,
        {
          y: this.model.position.y + 0.2,
          x: this.model.position.x - 2,
          z: this.model.position.z + 0.8,
          duration:1,
        },
        0
      )
        .to(
          this.model.rotation,
          {
            y: this.model.rotation.y + 1,
            x: this.model.rotation.x - 1.2,
            z: this.model.rotation.z + 1,
            duration: 1,
          },
          0
        )
        .to(
          this.model.position,
          {
            x: this.model.position.x - 3,
            z: this.model.position.z,
            y: this.model.position.y,
            duration: 2,
          },
          1.3
        )
        .to(
          this.model.rotation,
          {
            y: this.model.rotation.y + 2.2,
            z: this.model.rotation.z + 0.3,
            x: this.model.rotation.x + 0.5,
            duration: 2,
          },
          1.3
        )
        .to(
          this.model.rotation,
          {
            y: this.model.rotation.y + 2.2,
            z: this.model.rotation.z + 0.3,
            x: this.model.rotation.x + 0.5,
            duration: 2,
          },
          4
        );
    }
  }

  LenisGuitar() {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
  }
}
