import * as THREE from 'three';
import Structure from './Structure';

export default class ShaderLoad {
  public uniforms: {
    iTime: { value: number };
    iResolution: { value: THREE.Vector2 };
    iChannel0: { value: THREE.Texture };
    iChannel1: { value: THREE.Texture };
    iChannel2: { value: THREE.Texture };
  } | null;

  public model;
  public instance;
  public sizes;
  public texture_0;
  public texture_1;
  public texture_2;
  public texture_3;
  public toggle;
  public scene;

  constructor(
    model: THREE.Group<THREE.Object3DEventMap> | null,
    structure: Structure
  ) {
    this.scene = structure.scene;
    this.model = model;
    this.sizes = structure.sizes;
    this.uniforms = null;
    this.toggle = false;

    this.instance = new THREE.MeshStandardMaterial({
      roughness: 0.2,
      metalness: 0.4
    });

    this.texture_0 = structure.loaders.items.height_map;

    this.texture_1 = structure.loaders.items.texture_base_1;
    this.texture_2 = structure.loaders.items.texture_base_2;
    this.texture_3 = structure.loaders.items.texture_base_3;

    this.texture_1.flipY = false;
    this.texture_2.flipY = false;
    this.texture_3.flipY = false;

    this.setUniforms();
    this.setMaterial();
  }

  setMaterial() {
    this.instance.onBeforeCompile = (shader) => {
      if (this.uniforms) {
        shader.uniforms = { ...shader.uniforms, ...this.uniforms };
      }

      shader.vertexShader = `varying vec2 vUv; 
      ${shader.vertexShader}`.replace(
        `#include <uv_vertex>`,
        `#include <uv_vertex>
      
    vUv = uv;
    
        `
      );

      shader.fragmentShader = `
      uniform vec2 iResolution;
      uniform float iTime;
      uniform sampler2D iChannel0;
      uniform sampler2D iChannel1;
      uniform sampler2D iChannel2;
      varying vec2 vUv; 
${shader.fragmentShader}
`.replace(
        `#include <map_fragment>`,
        `   
   vec2 uv = vUv;

    vec3 col = vec3(0.);
    
    vec3 heightmap = texture2D(iChannel0, uv).rrr;
    vec3 background = texture2D(iChannel1, uv).rgb;
    vec3 foreground = texture2D(iChannel2, uv).rgb;
    
    float t = fract(-iTime * 0.2);
    vec3 erosion = smoothstep(t - 0.2, t, heightmap);
    
    vec3 border = smoothstep(0., 0.1, erosion) - smoothstep(0.1, 1., erosion);
    
    col = (1. - erosion) * foreground + erosion * background;
    
    vec3 leadcol = vec3(1., 0.5, 0.1);
    vec3 trailcol = vec3(0.2, 0.4, 1.);
    vec3 fire = mix(leadcol, trailcol, smoothstep(0.8, 1., border)) * 2.;
    
    col += border * fire;
    
    diffuseColor = vec4(col, 1.0);

`
      );
    };
  }

  setUniforms() {
    this.uniforms = {
      iTime: { value: 4 },
      iResolution: {
        value: new THREE.Vector2(this.sizes.width, this.sizes.height),
      },
      iChannel0: {
        value: this.texture_0,
      },
      iChannel1: {
        value: this.texture_1,
      },
      iChannel2: {
        value: this.texture_3,
      },
    };

    
  }

  update() {
    if (this.uniforms) {
      this.uniforms.iTime.value = THREE.MathUtils.lerp(
        this.uniforms.iTime.value,
        this.toggle ? 0 : 4,
        0.03
      );
    }
  }
}
