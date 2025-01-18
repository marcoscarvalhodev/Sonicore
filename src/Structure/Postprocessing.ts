import {
  EffectComposer,
  FXAAEffect,
  ToneMappingEffect,
  ToneMappingMode,
  EffectPass,
  RenderPass,
  BrightnessContrastEffect,
} from 'postprocessing';
import Structure from './Structure';
import { WebGLRenderer } from 'three';

export default class Postprocessing {
  public renderer;
  public scene;
  public camera;
  public pixelRatio;
  public width;
  public height;
  public fxaaEffect: null | FXAAEffect;
  public toneMappingEffect: null | ToneMappingEffect;
  public composer: null | EffectComposer;
  public renderPass: null | RenderPass;
  public brightness: null | BrightnessContrastEffect;

  constructor(structure: Structure) {
    this.renderer = structure.renderer.instance;
    this.fxaaEffect = null;
    this.scene = structure.scene;
    this.toneMappingEffect = null;
    this.camera = structure.camera.instance;
    this.pixelRatio = structure.sizes.pixelRatio;
    this.width = structure.sizes.width;
    this.height = structure.sizes.height;

    this.brightness = null;

    this.composer = null;
    this.renderPass = null;
    this.SetComposer();
    this.SetToneMapping();
    this.SetFxaaPass();
    this.SetBrightness();
  }

  SetComposer() {
    this.composer = new EffectComposer(this.renderer as WebGLRenderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
  }

  SetBrightness() {
    this.brightness = new BrightnessContrastEffect({
      brightness: 0,
      contrast: 0.2,
    });

    const brightnessPass = new EffectPass(this.camera, this.brightness);

    this.composer?.addPass(brightnessPass);
  }

  SetToneMapping() {
    this.toneMappingEffect = new ToneMappingEffect({
      mode: ToneMappingMode.OPTIMIZED_CINEON,
    });

    const toneMappingPass = new EffectPass(this.camera, this.toneMappingEffect);
    this.composer?.addPass(toneMappingPass);
  }

  SetFxaaPass() {
    this.fxaaEffect = new FXAAEffect();
    const fxaaPass = new EffectPass(this.camera, this.fxaaEffect);
    this.composer?.addPass(fxaaPass);
  }

  PostRender() {
    if (this.composer instanceof EffectComposer && this.composer) {
      this.composer.render();
    }
  }
}
