import {
  EffectComposer,
  FXAAEffect,
  ToneMappingEffect,
  ToneMappingMode,
  EffectPass,
  RenderPass,
  BrightnessContrastEffect,
  BloomEffect,
  BlendFunction,
} from 'postprocessing';
import Structure from './Structure';
import { HalfFloatType, WebGLRenderer } from 'three';
import ScreenSizes from './Utils/ScreenSizes';

const { sm } = ScreenSizes();

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

  constructor(structure: Structure) {
    this.renderer = structure.WGLRenderer.instance;
    this.fxaaEffect = null;
    this.scene = structure.scene;
    this.toneMappingEffect = null;
    this.camera = structure.camera.instance;
    this.pixelRatio = structure.sizes.pixelRatio;
    this.width = structure.sizes.width;
    this.height = structure.sizes.height;
    this.brightness = null;
    this.bloom = null;
    
    this.composer = null;
    this.renderPass = null;
    this.SetComposer();
    this.setBloom();
    this.SetToneMapping();
  }

  SetComposer() {
    this.composer = new EffectComposer(this.renderer as WebGLRenderer, {
      multisampling: sm ? 4 : 8,
      frameBufferType: HalfFloatType,
    });
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
  }

  setBloom() {
    this.bloom = new BloomEffect({
      mipmapBlur: true,
      intensity: 1.5,
      luminanceThreshold: 1,
    });

    const bloomPass = new EffectPass(this.camera, this.bloom);
    this.composer?.addPass(bloomPass);
  }

  SetToneMapping() {
    this.toneMappingEffect = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC,
      blendFunction: BlendFunction.MULTIPLY,
    });

    const toneMappingPass = new EffectPass(this.camera, this.toneMappingEffect);
    this.composer?.addPass(toneMappingPass);
  }

  SetFxaaPass() {
    this.fxaaEffect = new FXAAEffect({ blendFunction: BlendFunction.NORMAL });
    const fxaaPass = new EffectPass(this.camera, this.fxaaEffect);
    this.composer?.addPass(fxaaPass);
  }

  PostRender() {
    if (this.composer instanceof EffectComposer && this.composer) {
      this.composer.render();
    }
  }
}
