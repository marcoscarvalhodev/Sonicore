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
  OutlineEffect,
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
  public outline: null | OutlineEffect;

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
    this.outline = null;

    this.composer = null;
    this.renderPass = null;
    this.SetComposer();
    this.setBloom();
    this.SetToneMapping();
    this.SetOutlineEffect();
  }

  SetComposer() {
    this.composer = new EffectComposer(this.renderer as WebGLRenderer, {
      multisampling: sm ? 1 : 8,
      frameBufferType: HalfFloatType,
    });
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
  }

  setBloom() {
    if (!sm) {
      this.bloom = new BloomEffect({
        mipmapBlur: true,
        intensity: 1.5,
        luminanceThreshold: 1,
      });

      const bloomPass = new EffectPass(this.camera, this.bloom);
      this.composer?.addPass(bloomPass);
    }
  }

  SetOutlineEffect() {
    if (!sm) {
      this.outline = new OutlineEffect(this.scene, this.camera, {
        blendFunction: BlendFunction.SCREEN,
        multisampling: 1,
        edgeStrength: 10,
        pulseSpeed: 0.2,
        visibleEdgeColor: 0xb8860b,
        hiddenEdgeColor: 0xb8860b,
        height: 480,
        blur: false,
        xRay: false,
      });

      const outlinePass = new EffectPass(this.camera, this.outline);
      this.composer?.addPass(outlinePass);
    }
  }

  SetToneMapping() {
    this.toneMappingEffect = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC,
      blendFunction: BlendFunction.MULTIPLY,
    });

    const toneMappingPass = new EffectPass(this.camera, this.toneMappingEffect);
    this.composer?.addPass(toneMappingPass);
  }

  PostRender() {
    if (this.composer instanceof EffectComposer && this.composer) {
      this.composer.render();
    }
  }
}
