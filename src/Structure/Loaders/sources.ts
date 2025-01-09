export const sourcesType = {
  GLTFLoader: 'GLTFLoader',
  TextureLoader: 'TextureLoader',
  DracoLoader: 'DracoLoader',
} as const;

export const sources = [
  {
    type: sourcesType.GLTFLoader,
    name: 'model_guitar_1',
    path: '/models/sonicore.glb',
  },
  {
    type: sourcesType.TextureLoader,
    name: 'texture_base_1',
    path: '/textures/guitar_base.png',
  },
  {
    type: sourcesType.TextureLoader,
    name: 'guitar_1_roughnessMap',
    path: '/textures/guitar_roughness.png',
  },
  {
    type: sourcesType.DracoLoader,
    name: 'draco_model',
    path: 'https://www.gstatic.com/draco/v1/decoders/',
  },
  {
    type: sourcesType.DracoLoader,
    name: 'draco_model',
    path: 'https://www.gstatic.com/draco/v1/decoders/',
  },
];
