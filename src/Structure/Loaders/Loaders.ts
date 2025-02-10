import EventEmitter from '../Utils/EventEmitter';
import * as THREE from 'three';
import { sources } from './sources';
import { DRACOLoader, GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { TextureLoader } from 'three';

export interface ItemsProps {
  draco_model: DRACOLoader;
  scenery_gltf: GLTF;
  scenery_bake_floor: THREE.Texture;
  bloom_lights: GLTF;
  rest_scenery: GLTF;
  rest_scenery_texture: THREE.Texture;
  guitar_wall_texture_1: THREE.Texture;
  guitar_wall_texture_2: THREE.Texture;
  guitar_wall_texture_3: THREE.Texture;
  guitar_wall_texture_metal_4: THREE.Texture;
  guitar_wall_texture_4: THREE.Texture;
  guitar_wall_texture_5: THREE.Texture;
  guitar_wall_texture_6: THREE.Texture;
  guitar_wall_texture_7: THREE.Texture;
  guitar_wall_texture_8: THREE.Texture;
  guitar_wall_texture_metal_8: THREE.Texture;
  guitar_wall_texture_9: THREE.Texture;
  guitar_wall_texture_10: THREE.Texture;
  guitar_wall_texture_11: THREE.Texture;
  guitar_wall_texture_metal_11: THREE.Texture;
  guitar_wall_texture_12: THREE.Texture;
  guitar_wall_texture_13: THREE.Texture;
  guitar_wall_texture_14: THREE.Texture;
  guitar_wall_texture_metal_14: THREE.Texture;
  guitar_wall_texture_rough_14: THREE.Texture;
  guitar_wall_model_1: GLTF;
  guitar_wall_model_2: GLTF;
  guitar_wall_model_3: GLTF;
  guitar_wall_model_4: GLTF;
  guitar_wall_model_5: GLTF;
  guitar_wall_model_6: GLTF;
  guitar_wall_model_7: GLTF;
  guitar_wall_model_8: GLTF;
  guitar_wall_model_9: GLTF;
  guitar_wall_model_10: GLTF;
  guitar_wall_model_11: GLTF;
  guitar_wall_model_12: GLTF;
  guitar_wall_model_13: GLTF;
  guitar_wall_model_14: GLTF;
  sonicore_logo: GLTF;
  texture_base_1: THREE.Texture;
  texture_base_2: THREE.Texture;
  texture_base_3: THREE.Texture;
  scenery_texture: THREE.Texture;
  height_map: THREE.Texture;
  model_guitar_1: GLTF;
  [key: string]: DRACOLoader | THREE.Texture | GLTF;
}

export default class Loaders extends EventEmitter {
  public loaded;
  public toLoad;
  public items: ItemsProps;
  public sources;
  public loaders: {
    gltfLoader: GLTFLoader;
    textureLoader: TextureLoader;
    dracoLoader: DRACOLoader;
  } | null;

  constructor() {
    super();

    this.sources = sources;
    this.loaders = null;
    this.items = {
      draco_model: null as unknown as DRACOLoader,
      bloom_lights: null as unknown as GLTF,
      rest_scenery: null as unknown as GLTF,
      scenery_bake_floor: null as unknown as THREE.Texture,
      rest_scenery_texture: null as unknown as THREE.Texture,
      guitar_wall_texture_1: null as unknown as THREE.Texture,
      guitar_wall_texture_2: null as unknown as THREE.Texture,
      guitar_wall_texture_3: null as unknown as THREE.Texture,
      guitar_wall_texture_4: null as unknown as THREE.Texture,
      guitar_wall_texture_metal_4: null as unknown as THREE.Texture,
      guitar_wall_texture_5: null as unknown as THREE.Texture,
      guitar_wall_texture_6: null as unknown as THREE.Texture,
      guitar_wall_texture_7: null as unknown as THREE.Texture,
      guitar_wall_texture_8: null as unknown as THREE.Texture,
      guitar_wall_texture_metal_8: null as unknown as THREE.Texture,
      guitar_wall_texture_9: null as unknown as THREE.Texture,
      guitar_wall_texture_10: null as unknown as THREE.Texture,
      guitar_wall_texture_11: null as unknown as THREE.Texture,
      guitar_wall_texture_metal_11: null as unknown as THREE.Texture,
      guitar_wall_texture_12: null as unknown as THREE.Texture,
      guitar_wall_texture_13: null as unknown as THREE.Texture,
      guitar_wall_texture_14: null as unknown as THREE.Texture,
      guitar_wall_texture_metal_14: null as unknown as THREE.Texture,
      guitar_wall_texture_rough_14: null as unknown as THREE.Texture,
      guitar_wall_model_1: null as unknown as GLTF,
      guitar_wall_model_2: null as unknown as GLTF,
      guitar_wall_model_3: null as unknown as GLTF,
      guitar_wall_model_4: null as unknown as GLTF,
      guitar_wall_model_5: null as unknown as GLTF,
      guitar_wall_model_6: null as unknown as GLTF,
      guitar_wall_model_7: null as unknown as GLTF,
      guitar_wall_model_8: null as unknown as GLTF,
      guitar_wall_model_9: null as unknown as GLTF,
      guitar_wall_model_10: null as unknown as GLTF,
      guitar_wall_model_11: null as unknown as GLTF,
      guitar_wall_model_12: null as unknown as GLTF,
      guitar_wall_model_13: null as unknown as GLTF,
      guitar_wall_model_14: null as unknown as GLTF,
      sonicore_logo: null as unknown as GLTF,
      scenery_texture: null as unknown as THREE.Texture,
      texture_base_1: null as unknown as THREE.Texture,
      texture_base_2: null as unknown as THREE.Texture,
      texture_base_3: null as unknown as THREE.Texture,
      height_map: null as unknown as THREE.Texture,
      model_guitar_1: null as unknown as GLTF,
      scenery_gltf: null as unknown as GLTF,
    };
    this.loaded = 0;
    this.toLoad = this.sources.length;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      dracoLoader: new DRACOLoader(),
    };
  }

  startLoading() {
    for (const source of this.sources) {
      switch (source.type) {
        case 'DracoLoader':
          {
            this.loaders?.dracoLoader.setDecoderPath(source.path);
            this.loaders?.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);

            if (this.loaders) {
              this.sourceLoaded({ file: this.loaders?.dracoLoader, source });
            }
          }
          break;
        case 'TextureLoader':
          {
            this.loaders?.textureLoader.load(source.path, (file) => {
              this.sourceLoaded({ source, file });
            });
          }
          break;
        case 'GLTFLoader':
          {
            this.loaders?.gltfLoader.load(source.path, (file) => {
              this.sourceLoaded({ source, file });
            });
          }
          break;
        default:
          throw new Error('There was no loader available');
      }
    }
  }

  sourceLoaded({
    source,
    file,
  }: {
    source: {
      type: string;
      name: string;
      path: string;
    };
    file: THREE.Texture | GLTF | DRACOLoader;
  }) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger('ready');
    }
  }
}
