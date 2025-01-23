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
    path: '/textures/guitar_base_1.png',
  },
  {
    type: sourcesType.TextureLoader,
    name: 'texture_base_2',
    path: '/textures/guitar_base_2.jpg',
  },
  {
    type: sourcesType.TextureLoader,
    name: 'texture_base_3',
    path: '/textures/guitar_base_3.jpg',
  },
  {
    type: sourcesType.TextureLoader,
    name: 'height_map',
    path: '/textures/heightMap.png',
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
    type: sourcesType.TextureLoader,
    name: 'floor_texture',
    path: '/textures/floor_texture.jfif',
  },

  {
    type: sourcesType.GLTFLoader,
    name: 'scenery_gltf',
    path: '/models/scenery.glb',
  },

  {
    type: sourcesType.TextureLoader,
    name: 'scenery_texture',
    path: '/textures/scenery/scenery_bake.jpg',
  },
  {
    type: sourcesType.TextureLoader,
    name: 'guitar_wall_texture_1',
    path: '/textures/guitar_wall/guitar_wall_1.png',
  },
  {
    type: sourcesType.GLTFLoader,
    name: 'guitar_wall_model_1',
    path: '/models/guitar_wall/guitar_wall_1.glb',
  },
  {
    type: sourcesType.TextureLoader,
    name: 'guitar_wall_texture_2',
    path: '/textures/guitar_wall/guitar_wall_2.png',
  },
  {
    type: sourcesType.GLTFLoader,
    name: 'guitar_wall_model_2',
    path: '/models/guitar_wall/guitar_wall_2.glb',
  },
];
