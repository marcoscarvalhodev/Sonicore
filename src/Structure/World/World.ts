import MainGuitar from '../../SceneryAnimations/MainGuitar';
import Scenery from '../../SceneryAnimations/Scenery';
import GuitarWall from '../../SceneryAnimations/GuitarWall';
import Structure from '../Structure';
import BloomLight from '../../SceneryAnimations/BloomLight';
import RestScenery from '../../SceneryAnimations/RestScenery';
import ScenerySign from '../../SceneryAnimations/ScenerySign';
import ScenerySignBought from '../../SceneryAnimations/ScenerySignBought';

export default class World {
  public loaderItems;
  public loaders;
  public main_guitar: MainGuitar | null;
  public structure;
  public scenery: Scenery | null;
  public guitar_wall: GuitarWall | null;
  public bloom_light: BloomLight | null;
  public rest_scenery: RestScenery | null;
  public scenery_sign: ScenerySign | null;
  public scenery_sign_bought: ScenerySignBought | null;

  constructor(structure: Structure) {
    this.structure = structure;
    this.loaders = structure.loaders;
    this.loaderItems = structure.loaders.items;
    this.main_guitar = null;
    this.scenery = null;
    this.guitar_wall = null;
    this.bloom_light = null;
    this.rest_scenery = null;
    this.scenery_sign = null;
    this.scenery_sign_bought = null;

    this.loaders.on('ready', () => {
      this.bloom_light = new BloomLight(this.structure);
      this.scenery = new Scenery(this.structure);
      this.rest_scenery = new RestScenery(this.structure);
      this.scenery_sign = new ScenerySign(this.structure);
      this.scenery_sign_bought = new ScenerySignBought(this.structure);
      this.main_guitar = new MainGuitar(this.structure);
      this.guitar_wall = new GuitarWall(this.structure);
      
      
    });
  }

  update() {
    this.main_guitar?.update();
    this.guitar_wall?.update();
    this.scenery?.update();
  }
}
