import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import WGLRenderer from './WGLRenderer';
import Light from './Light';
import Postprocessing from './Postprocessing';
import Loaders from './Loaders/Loaders';
import World from './World/World';
import CameraAnim from '../SceneryAnimations/CameraAnim';

interface StructureProps {
  canvas: HTMLCanvasElement | null;
}

export default class Structure {
  public canvas;
  public sizes;
  public time;
  public scene;
  public camera;
  public WGLRenderer;
  public light;
  public postprocessing;
  public loaders;
  public world;
  public cameraAnim;

  constructor({ canvas }: StructureProps) {
    this.canvas = canvas;
    this.time = new Time();
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.cameraAnim = new CameraAnim(this);
    this.WGLRenderer = new WGLRenderer(this);

    this.loaders = new Loaders();
    this.world = new World(this);
    this.postprocessing = new Postprocessing(this);
    this.light = new Light(this);
    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {
    this.WGLRenderer.resize();
    this.camera.resize();
  }

  update() {
    this.world.update();
    this.postprocessing.PostRender();
  }
}
