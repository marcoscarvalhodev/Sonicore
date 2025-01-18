import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import Light from './Light';
import Postprocessing from './Postprocessing';
import Loaders from './Loaders/Loaders';
import World from './World/World';

interface StructureProps {
  canvas: HTMLCanvasElement | null;
}

export default class Structure {
  public canvas;
  public sizes;
  public time;
  public scene;
  public camera;
  public renderer;
  public light;
  public postprocessing;
  public loaders;
  public world;

  constructor({ canvas }: StructureProps) {
    this.canvas = canvas;

    this.time = new Time();
    this.sizes = new Sizes();
    this.loaders = new Loaders();
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.world = new World(this);
    this.light = new Light(this);
    this.renderer = new Renderer(this);
    this.postprocessing = new Postprocessing(this);

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
    this.world.update();
    this.renderer.Render();
    this.postprocessing.PostRender();
    
  }
}
