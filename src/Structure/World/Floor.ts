import * as THREE from 'three';
import Structure from '../Structure';
import MeshReflectorMaterial from '../MeshReflectorMaterial';


export default class Floor {
  public floorGeometry: null | THREE.PlaneGeometry;
  public floorMesh: null | THREE.Mesh;
  public floorMaterial: null | MeshReflectorMaterial;
  public scene;
  public renderer;
  public camera;
  public floorTexture;

  constructor(structure: Structure) {
    this.floorGeometry = null;
    this.floorMesh = null;
    this.floorMaterial = null;
    this.scene = structure.scene;
    this.renderer = structure.renderer.instance;
    this.camera = structure.camera.instance;
    this.floorTexture = structure.loaders.items.floor_texture;

    this.setFloor();
    this.floorProperties();
    this.setTexture();
  }

  setTexture() {
    if (this.floorMaterial) {
      this.floorMaterial.map = this.floorTexture;
      this.floorMaterial.needsUpdate = true;
    }
  }

  setFloor() {
    this.floorGeometry = new THREE.PlaneGeometry(40, 40);
    this.floorMesh = new THREE.Mesh(this.floorGeometry);
    this.floorMaterial = new MeshReflectorMaterial(
      this.renderer,
      this.camera,
      this.scene,
      this.floorMesh,
      {
        resolution: 512, // Higher resolution for better quality
        mixBlur: 0.3, // Blur the reflection
        mixStrength: 1, // Strength of the reflection
        blur: [1024, 1024], // Blur kernel size
        mirror: 0.1, // Mirror effect
        distortion: 0.01,
        
        depthToBlurRatioBias: 1,
      }
    );

    this.floorMesh.material = this.floorMaterial;

    this.scene.add(this.floorMesh);
  }

  floorProperties() {
    this.floorMesh?.rotation.set(-1.8, 0, 0);
    this.floorMesh?.position.set(0, -2.4, -5);
  }

  update() {
    if (this.floorMaterial) this.floorMaterial.update();
  }
}
