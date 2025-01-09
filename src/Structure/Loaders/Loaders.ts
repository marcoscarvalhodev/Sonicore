import EventEmitter from '../Utils/EventEmitter';
import * as THREE from 'three';
import { sources } from './sources';
import { DRACOLoader, GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { TextureLoader } from 'three';

export interface ItemsProps {
  draco_model: DRACOLoader;
  texture_base_1: THREE.Texture;
  model_guitar_1: GLTF;
  guitar_1_roughnessMap: THREE.Texture;
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

  public textureMap: THREE.Texture | undefined;
  public textureRoughness: THREE.Texture | undefined;

  constructor() {
    super();

    this.sources = sources;
    this.loaders = null;
    this.items = {
      draco_model: null as unknown as DRACOLoader,
      texture_base_1: null as unknown as THREE.Texture,
      model_guitar_1: null as unknown as GLTF,
      guitar_1_roughnessMap: null as unknown as THREE.Texture
    };
    this.loaded = 0;
    this.toLoad = this.sources.length;

    this.textureMap = undefined;
    this.textureRoughness = undefined;

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
          
            this.textureMap = this.loaders?.textureLoader.load(
              source.path,
              (file) => {
                
                this.sourceLoaded({ source, file });
              }
            );
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
