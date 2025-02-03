import GuitarModel1 from '../../SceneryAnimations/GuitarModel1';
import Scenery from '../../SceneryAnimations/Scenery';
import GuitarWall from '../../SceneryAnimations/GuitarWall';
import Structure from '../Structure';

import BloomLight from '../../SceneryAnimations/BloomLight';

export default class World {
  public loaderItems;
  public loaders;
  public guitar_1: GuitarModel1 | null;
  public structure;
  public scenery: Scenery | null;
  public guitar_wall: GuitarWall | null;
  public bloom_light: BloomLight | null;

  constructor(structure: Structure) {
    this.structure = structure;
    this.loaders = structure.loaders;
    this.loaderItems = structure.loaders.items;
    this.guitar_1 = null;
    this.scenery = null;
    this.guitar_wall = null;
    this.bloom_light = null;

    this.loaders.on('ready', () => {
      this.guitar_1 = new GuitarModel1(this.structure);
      this.guitar_wall = new GuitarWall(this.structure);
      this.bloom_light = new BloomLight(this.structure);
      this.scenery = new Scenery(this.structure);
    });
  }

  update() {
    this.guitar_1?.update();
    this.scenery?.update();
    this.guitar_wall?.update();
  }
}
