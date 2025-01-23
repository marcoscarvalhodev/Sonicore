import {
  EffectComposer,
  FXAAEffect,
  ToneMappingEffect,
  ToneMappingMode,
  EffectPass,
  RenderPass,
  BrightnessContrastEffect,
  BloomEffect,
  SMAAEffect,
  SMAAPreset,
  BlendFunction,
  EdgeDetectionMode,
  PredicationMode,
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
  public bloom: null | BloomEffect;
  public smaaEffect: null | SMAAEffect;

  constructor(structure: Structure) {
    this.renderer = structure.renderer.instance;
    this.fxaaEffect = null;
    this.scene = structure.scene;
    this.toneMappingEffect = null;
    this.camera = structure.camera.instance;
    this.pixelRatio = structure.sizes.pixelRatio;
    this.width = structure.sizes.width;
    this.height = structure.sizes.height;
    this.smaaEffect = null;
    this.brightness = null;
    this.bloom = null;
    

    this.composer = null;
    this.renderPass = null;
    this.SetComposer();
    this.SetToneMapping();

    this.SetBrightness();
    this.setBloom();
   
  }

  SetComposer() {
    this.composer = new EffectComposer(this.renderer as WebGLRenderer);
    console.log(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    this.composer.multisampling = 8;
  }

  setBloom() {
    this.bloom = new BloomEffect({
      intensity: 2,
      luminanceThreshold: 0.9,
      luminanceSmoothing: 0.75,
    });
    const bloomPass = new EffectPass(this.camera, this.bloom);
    this.composer?.addPass(bloomPass);
  }

  SetBrightness() {
    this.brightness = new BrightnessContrastEffect({
      brightness: 0,
      contrast: 0.1,
      blendFunction: BlendFunction.DARKEN,
    });

    const brightnessPass = new EffectPass(this.camera, this.brightness);

    this.composer?.addPass(brightnessPass);
  }

  SetToneMapping() {
    this.toneMappingEffect = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC,
    });

    const toneMappingPass = new EffectPass(this.camera, this.toneMappingEffect);
    this.composer?.addPass(toneMappingPass);
  }

  SetFxaaPass() {
    this.fxaaEffect = new FXAAEffect({ blendFunction: BlendFunction.NORMAL });
    const fxaaPass = new EffectPass(this.camera, this.fxaaEffect);
    this.composer?.addPass(fxaaPass);
  }

  setSmaaEffect() {
    this.smaaEffect = new SMAAEffect({
      preset: SMAAPreset.HIGH,
      edgeDetectionMode: EdgeDetectionMode.DEPTH,
      predicationMode: PredicationMode.DEPTH,
    });
    const smaaPass = new EffectPass(this.camera, this.smaaEffect);
    this.composer?.addPass(smaaPass);
  }

  PostRender() {
    if (this.composer instanceof EffectComposer && this.composer) {
      this.composer.render();
    }
  }
}
