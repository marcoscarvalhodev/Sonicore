import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import Structure from './Structure';
import { WebGLRenderer } from 'three';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

export default class Postprocessing {
  public instance: null | EffectComposer;
  public renderer;
  public scene;
  public camera;
  public pixelRatio;
  public width;
  public height;
  public fxaaPass: null | ShaderPass;
  public bokehPass: null | BokehPass;

  constructor(structure: Structure) {
    this.renderer = structure.renderer.instance;
    this.fxaaPass = null;
    this.bokehPass = null;
    this.scene = structure.scene;
    this.camera = structure.camera.instance;
    this.instance = null;
    this.pixelRatio = structure.sizes.pixelRatio;
    this.width = structure.sizes.width;
    this.height = structure.sizes.height;

    this.SetInstance();
  }

  SetInstance() {
    if (this.renderer) {
      this.instance = new EffectComposer(this.renderer as WebGLRenderer);

      this.instance.addPass(new RenderPass(this.scene, this.camera));

      this.SetFxaaPass();
    }
  }

  SetFxaaPass() {
    this.fxaaPass = new ShaderPass(FXAAShader);
    this.fxaaPass.material.uniforms['resolution'].value.x =
      0.1 / (this.width * this.pixelRatio);
    this.fxaaPass.material.uniforms['resolution'].value.y =
      0.1 / (this.height * this.pixelRatio);

    this.instance?.addPass(this.fxaaPass);

    this.fxaaPass.renderToScreen = true;
  }

  SetBokehPass() {
    this.bokehPass = new BokehPass(this.scene, this.camera, {
      focus: 0,
      aperture: 10,
      maxblur: 1,
    });

    this.instance?.addPass(this.bokehPass);
  }

  PostRender() {
    this.instance?.render();
  }
}
