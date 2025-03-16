import { Mesh, MeshStandardMaterial, Texture } from 'three';
import Structure from '../Structure/Structure';
import * as THREE from 'three';
import ViewPositioner from './ViewPositioner';
import RaycasterChecker from '../Structure/Utils/RaycasterChecker';
import GuitarSpecifications from '../contentResources/GuitarSpecifications';
import GuitarBuy from './GuitarBuy';
import gsap from 'gsap';

import ScreenSizes from '../Structure/Utils/ScreenSizes';

const { sm } = ScreenSizes();

export default class GuitarWall {
  public gsap;
  public model;
  public scene;
  public texture: { guitar_texture: Texture }[];
  public texture_metal: { guitar_texture: Texture | null }[];
  public texture_rough: { guitar_texture: Texture | null }[];
  public loaders;
  public initialPosition: null | THREE.Vector3;
  public time;
  public camera;
  public viewPositioner;
  public structure;
  public raycasterClick: null | RaycasterChecker;
  public raycasterHover: null | RaycasterChecker;
  public guitarName: string | undefined;
  public guitarMove;
  public guitarSpecifications: null | GuitarSpecifications;
  public currentGuitar: null | THREE.Object3D;
  public guitarBuy: null | GuitarBuy;
  public boundSetGuitarHover: (event: MouseEvent) => void;
  public cameraEnded;

  constructor(structure: Structure) {
    this.structure = structure;
    this.camera = structure.camera.instance;
    this.time = structure.time;
    this.loaders = structure.loaders.items;
    this.initialPosition = null;
    this.gsap = gsap;
    this.scene = structure.scene;

    this.model = [
      { guitar_model: this.loaders.guitar_wall_model_1.scene },
      { guitar_model: this.loaders.guitar_wall_model_2.scene },
      { guitar_model: this.loaders.guitar_wall_model_3.scene },
      { guitar_model: this.loaders.guitar_wall_model_4.scene },
      { guitar_model: this.loaders.guitar_wall_model_5.scene },
      { guitar_model: this.loaders.guitar_wall_model_6.scene },
      { guitar_model: this.loaders.guitar_wall_model_7.scene },
      { guitar_model: this.loaders.guitar_wall_model_8.scene },
      { guitar_model: this.loaders.guitar_wall_model_9.scene },
      { guitar_model: this.loaders.guitar_wall_model_10.scene },
      { guitar_model: this.loaders.guitar_wall_model_11.scene },
      { guitar_model: this.loaders.guitar_wall_model_12.scene },
      { guitar_model: this.loaders.guitar_wall_model_13.scene },
      { guitar_model: this.loaders.guitar_wall_model_14.scene },
    ];
    this.texture = [
      { guitar_texture: this.loaders.guitar_wall_texture_1 },
      { guitar_texture: this.loaders.guitar_wall_texture_2 },
      { guitar_texture: this.loaders.guitar_wall_texture_3 },
      { guitar_texture: this.loaders.guitar_wall_texture_4 },
      { guitar_texture: this.loaders.guitar_wall_texture_5 },
      { guitar_texture: this.loaders.guitar_wall_texture_6 },
      { guitar_texture: this.loaders.guitar_wall_texture_7 },
      { guitar_texture: this.loaders.guitar_wall_texture_8 },
      { guitar_texture: this.loaders.guitar_wall_texture_9 },
      { guitar_texture: this.loaders.guitar_wall_texture_10 },
      { guitar_texture: this.loaders.guitar_wall_texture_11 },
      { guitar_texture: this.loaders.guitar_wall_texture_12 },
      { guitar_texture: this.loaders.guitar_wall_texture_13 },
      { guitar_texture: this.loaders.guitar_wall_texture_14 },
    ];

    this.texture_metal = [
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: this.loaders.guitar_wall_texture_metal_4 },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: this.loaders.guitar_wall_texture_metal_8 },
      { guitar_texture: null },
      { guitar_texture: this.loaders.guitar_wall_texture_metal_14 },
      { guitar_texture: this.loaders.guitar_wall_texture_metal_11 },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: this.loaders.guitar_wall_texture_metal_14 },
    ];

    this.texture_rough = [
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: null },
      { guitar_texture: this.loaders.guitar_wall_texture_rough_14 },
    ];
    this.cameraEnded = false;
    this.guitarSpecifications = null;
    this.guitarMove = true;
    this.viewPositioner = new ViewPositioner(structure);
    this.guitarBuy = null;
    this.guitarName = 'default';
    this.boundSetGuitarHover = () => {};
    this.setTexture();
    this.setModel();
    this.setMaterial();
    this.setGuitarHover();
    this.setGuitarClick();
    this.raycasterClick = null;
    this.raycasterHover = null;
    this.setGuitarOnCamera();
    this.currentGuitar = null;
  }

  setGuitarOnCamera() {
    this.viewPositioner.on('guitar_on_camera', () => {
      this.guitarMove = this.viewPositioner.guitarMove;

      if (!this.guitarMove) {
        gsap.to(document.body, { cursor: 'grab' });

        document.addEventListener('mousedown', () => {
          gsap.to(document.body, { cursor: 'grabbing' });
        });

        document.addEventListener('mouseup', () => {
          gsap.to(document.body, { cursor: 'grab' });
        });
      }
    });

    this.viewPositioner.on('guitar_out_camera_complete', () => {
      this.guitarMove = this.viewPositioner.guitarMove;
    });
  }

  setTexture() {
    this.model.forEach((item, index) => {
      item.guitar_model.traverse((child) => {
        if (
          child instanceof Mesh &&
          child.material instanceof MeshStandardMaterial
        ) {
          child.material.dispose();

          if (child.material.map) {
            child.material.map.dispose();
          }

          switch (child.userData?.material) {
            case 'normal_material':
              {
                const normal_textures = this.texture[index].guitar_texture;

                normal_textures.flipY = false;
                child.material = new MeshStandardMaterial({
                  map: normal_textures,
                });
              }
              break;

            case 'metal_material':
              {
                const metal_textures = this.texture_metal[index].guitar_texture;
                if (metal_textures) metal_textures.flipY = false;
                child.material = new MeshStandardMaterial({
                  map: metal_textures,
                });
              }
              break;
            case 'rough_material':
              {
                const rough_textures = this.texture_rough[index].guitar_texture;
                if (rough_textures) rough_textures.flipY = false;
                child.material = new MeshStandardMaterial({
                  map: rough_textures,
                });
              }
              break;
            default:
              console.warn('no material was found');
          }
        }
      });
    });
  }

  updateWithCameraPosition() {
    if (this.camera.position.z < (sm ? -31 : -24) && !this.cameraEnded) {
      document.addEventListener('mousemove', this.boundSetGuitarHover);
      this.cameraEnded = true;
      console.log('works');
    }

    if (this.camera.position.z > (sm ? -30 : -23) && this.cameraEnded) {
      this.cameraEnded = false;
      document.removeEventListener('mousemove', this.boundSetGuitarHover);
      console.log('doesnt work');
    }
  }

  setGuitarHover() {
    this.raycasterHover = new RaycasterChecker(this.structure, () => {});

    this.boundSetGuitarHover = this.raycasterHover.setGuitarHover.bind(
      this.raycasterHover
    );

    this.viewPositioner.on('guitar_on_camera', () => {
      document.removeEventListener('mousemove', this.boundSetGuitarHover);
    });

    this.viewPositioner.on('guitar_out_camera', () => {
      document.addEventListener('mousemove', this.boundSetGuitarHover);
    });
  }

  setGuitarClick() {
    const handleGuitarRaycaster = (guitarName: string) => {
      this.guitarName = guitarName;
      this.model.forEach((item, index) => {
        item.guitar_model.traverse((child) => {
          if (
            child.parent &&
            child.name === this.guitarName &&
            this.guitarMove
          ) {
            if (child.type === 'Object3D') {
              this.initialPosition = child.position.clone();
              this.viewPositioner.moveToView(child, this.initialPosition);

              this.currentGuitar = child;
              this.guitarSpecifications = new GuitarSpecifications(
                this.structure,
                child.name,
                index,
                this.viewPositioner.targetPosition
              );

              this.setAnimEnd(child);
              this.setBuyGuitar(child, this.guitarName);
            }
          }
        });
      });
    };

    this.raycasterClick = new RaycasterChecker(
      this.structure,
      handleGuitarRaycaster
    );

    document.addEventListener(
      'click',
      this.raycasterClick.setGuitarClick.bind(this.raycasterClick)
    );
  }

  setBuyGuitar(child: THREE.Object3D, guitarName: string) {
    this.guitarSpecifications?.buyGuitar?.addEventListener('click', () => {
      //newly added code

      gsap.to(document.body, { cursor: 'default' });

      document.addEventListener('mousemove', this.boundSetGuitarHover);

      this.guitarBuy = new GuitarBuy(
        this.structure,
        child,
        this.viewPositioner
      );

      setTimeout(() => {
        this.guitarMove = true;
        this.gsap.set('body', { overflowY: 'visible' });
      }, 3000);

      this.guitarBuy.setGuitarRemove();
      this.guitarSpecifications?.setGuitarOut();
      this.guitarSpecifications?.setBoughtGuitar();

      this.structure.world.scenery_sign_bought?.SignAppear(guitarName);
    });
  }

  setAnimEnd(child: THREE.Object3D) {
    this.guitarSpecifications?.backGuitarSelection?.addEventListener(
      'click',
      () => {
        this.viewPositioner.returnToOriginal(child, this.initialPosition);
        this.guitarSpecifications?.setGuitarOut();
      }
    );
  }

  setMaterial() {
    this.model.forEach((item) => {
      item.guitar_model.traverse((child) => {
        if (child instanceof Mesh) {
          const excludedGuitars = ['guitar_13', 'guitar_14'];

          if (
            child.parent?.name &&
            !excludedGuitars.includes(child.parent.name)
          ) {
            child.castShadow = true;
          }

          if (child.name.startsWith('guitar_metal')) {
            child.material = child.material.clone();

            if (child.material instanceof MeshStandardMaterial) {
              child.material.roughness = 0.2;
              child.material.metalness = 1;
              child.material.transparent = true;
              child.material.opacity = 1;
            }
          } else if (child.name.startsWith('guitar_body')) {
            child.material = child.material.clone();

            if (child.material instanceof MeshStandardMaterial) {
              child.material.roughness = 0.1;
              child.material.metalness = 0;
              child.material.transparent = true;
              child.material.opacity = 1;
            }
          } else if (child.name.startsWith('guitar_rough')) {
            child.material = child.material.clone();

            if (child.material instanceof MeshStandardMaterial) {
              child.material.roughness = 1;
              child.material.metalness = 0;
              child.material.transparent = true;
              child.material.opacity = 1;
            }
          }
        }
      });
    });
  }

  setModel() {
    this.model.forEach((item) => {
      const model = item.guitar_model;

      model.frustumCulled = false;

      this.scene.add(model);
    });
  }

  update() {
    this.viewPositioner.update();
    this.updateWithCameraPosition();
  }
}
