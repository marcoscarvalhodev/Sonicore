import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import GuitarModel1 from '../GLTFModels/GuitarModel1';
import Renderer from './Renderer';
import Light from './Light';

interface StructureProps {
  canvas: HTMLCanvasElement | null;
}

export default class Structure {
  public canvas;
  public sizes;
  public time;
  public scene;
  public camera;
  public guitar1;
  public renderer;
  public light;

  constructor({ canvas }: StructureProps) {
    this.canvas = canvas;

    this.time = new Time();
    this.sizes = new Sizes();

    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.guitar1 = new GuitarModel1(this);
    this.light = new Light(this);

    this.renderer = new Renderer(this);

    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
  }

  update() {
    this.renderer.Render();
  }
}
