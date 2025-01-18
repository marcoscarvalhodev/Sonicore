import GuitarModel1 from '../../GLTFModels/GuitarModel1';
import WholeScenario from '../../GLTFModels/WholeScenario';
import Structure from '../Structure';
import Floor from './Floor';

export default class World {
  public loaderItems;
  public loaders;
  public guitar_1: GuitarModel1 | null;
  public structure;
  public floor: Floor | null;
  public scenario: WholeScenario | null;

  constructor(structure: Structure) {
    this.structure = structure;
    this.loaders = structure.loaders;
    this.loaderItems = structure.loaders.items;
    this.guitar_1 = null;
    this.floor = null;
    this.scenario = null;

    this.loaders.on('ready', () => {
      this.guitar_1 = new GuitarModel1(this.structure);
      /*this.floor = new Floor(this.structure);*/
      this.scenario = new WholeScenario(this.structure);
    });
  }

  update() {
    this.guitar_1?.update();
    /*this.floor?.update();*/
    
  }
}
