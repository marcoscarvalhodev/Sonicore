import { Mesh } from 'three';
import Structure from '../Structure/Structure';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '../MeshReflectionMaterial';
import { GUI } from 'dat.gui';

export default class Scenery {
  public model;
  public scene;
  public texture;
  public texture_2;
  public camera;
  public renderer: null | THREE.WebGLRenderer;
  public material: MeshReflectorMaterial | null;
  public gui;

  constructor(structure: Structure) {
    this.renderer = structure.WGLRenderer.instance;
    this.scene = structure.scene;
    this.texture = structure.loaders.items.scenery_texture;
    this.texture_2 = structure.loaders.items.scenery_bake_floor;
    this.model = structure.loaders.items.scenery_gltf.scene;
    this.camera = structure.camera.instance;
    this.setModel();
    this.material = null;
    this.setMaterial();
    this.gui = new GUI();
    
  }

  setGui() {
    if (this.material) {
      this.gui.add(this.material, 'roughness').min(0).max(2).step(0.001);
      this.gui.add(this.material, 'roughness').min(0).max(2).step(0.001);
      this.gui.add(this.material, 'envMapIntensity').min(0).max(2).step(0.001);
      this.gui
        .add(this.material, 'emissiveIntensity')
        .min(0)
        .max(2)
        .step(0.001);
      this.gui.add(this.material, 'metalness').min(0).max(2).step(0.001);
      this.gui
        .add(this.material.reflectorProps, 'mixBlur')
        .min(0)
        .max(7)
        .step(0.001);
      this.gui
        .add(this.material.reflectorProps, 'mixStrength')
        .min(0)
        .max(200)
        .step(0.001);
      this.gui
        .add(this.material.reflectorProps, 'depthScale')
        .min(0)
        .max(20)
        .step(0.1);
      this.gui
        .add(this.material.reflectorProps, 'mixContrast')
        .min(0)
        .max(7)
        .step(0.001);
      this.gui
        .add(this.material.reflectorProps, 'minDepthThreshold')
        .min(0)
        .max(7)
        .step(0.001);
      this.gui
        .add(this.material.reflectorProps, 'depthToBlurRatioBias')
        .min(0)
        .max(7)
        .step(0.001);
      this.gui
        .add(this.material.reflectorProps, 'maxDepthThreshold')
        .min(-5)
        .max(7)
        .step(0.001);

        this.gui
        .add(this.material.reflectorProps, 'mirror')
        .min(-5)
        .max(5)
        .step(0.001);

      this.gui.add(this.material.planeNormal, 'x').min(0).max(10).step(0.001);
      this.gui.add(this.material.planeNormal, 'y').min(0).max(10).step(0.001);
      this.gui.add(this.material.planeNormal, 'z').min(0).max(10).step(0.001);
      this.material.needsUpdate = true;
    }
  }

  setMaterial() {
    this.texture.flipY = false;
    this.texture_2.flipY = false;

    this.model.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        if (child.name === 'floor') {
          child.material = new MeshReflectorMaterial(
            this.renderer,
            this.camera,
            this.scene,
            child,
            {
              mixBlur: 1.4,
              mixStrength: 1,
              resolution: 1024,
              blur: [2048, 2048],
              minDepthThreshold: 1.2,
              maxDepthThreshold: 0.43,
              depthScale: 1.3,
              depthToBlurRatioBias: 0.36,
              mirror: 0,
              distortion: 1,
              mixContrast: 1.27,
              reflectorOffset: 0,
              bufferSamples: 8,
              planeNormal: new THREE.Vector3(0, 1, 1),
            }
          );

          if (child.material instanceof MeshReflectorMaterial) {
            child.material.setValues({
              map: this.texture_2,
              emissiveMap: this.texture_2,
              emissive: new THREE.Color(0xffffff),
              emissiveIntensity: 0.36,
              envMapIntensity: 1.08,
              roughness: 1,
            });
          }

          this.material = child.material;
        } else {
          child.material = new THREE.MeshStandardMaterial({});
        }
      }
    });
  }

  setModel() {
    this.scene.add(this.model);
  }

  update() {
    this.material?.update();
  }
}
