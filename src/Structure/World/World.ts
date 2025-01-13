import GuitarModel1 from '../../GLTFModels/GuitarModel1';
import Structure from '../Structure';

export default class World {
  public loaderItems;
  public loaders;
  public guitar_1: GuitarModel1 | null;
  public structure;

  constructor(structure: Structure) {
    this.structure = structure;
    this.loaders = structure.loaders;
    this.loaderItems = structure.loaders.items;
    this.guitar_1 = null;

    this.loaders.on('ready', () => {
      this.guitar_1 = new GuitarModel1(this.structure);
    });
  }

  update() {
    this.guitar_1?.update();
  }
}
