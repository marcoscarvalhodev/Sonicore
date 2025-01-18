import Structure from '../Structure/Structure';

export default class WholeScenario {
  public model;
  public scene;

  constructor(structure: Structure) {
    this.scene = structure.scene;
    this.model = structure.loaders.items.scenario_loader.scene;
    this.setModel();

  }

  setModel() {
    this.model.position.z = -17;
    this.model.position.y = -10;
    this.scene.add(this.model);
  }
}
