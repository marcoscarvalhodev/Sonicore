import Structure from '../Structure/Structure';

/*const GuitarContent = [
  { type: 'guitar_1', name: 'Explorer Guitar', price: '$689.99' },
  { type: 'guitar_2', name: 'Juanes Stratocaster Guitar', price: '$2,129.99' },
  {
    type: 'guitar_3',
    name: 'Gibson Tony Iommi SG Special Guitar',
    price: '$2,545.00',
  },
  {
    type: 'guitar_4',
    name: 'Epiphone Flying V Guitar',
    price: '$558.99',
  },
  {
    type: 'guitar_5',
    name: 'Jackson JS Series Rhoads JS32 Guitar',
    price: '$479.00',
  },
  {
    type: 'guitar_6',
    name: 'Brian May BMG Special Guitar',
    price: '$889.00',
  },
  {
    type: 'guitar_7',
    name: 'Gretsch Electromatic Guitar',
    price: '$699.00',
  },
  {
    type: 'guitar_8',
    name: 'Gibson Firebird V Banjo Tuner Vintage Guitar ',
    price: '$2589.99',
  },
  {
    type: 'guitar_9',
    name: 'Squier Sonic Stratocaster Guitar',
    price: '179.99',
  },
  {
    type: 'guitar_10',
    name: 'Ibanez JEM Guitar',
    price: '599.00',
  },
  {
    type: 'guitar_11',
    name: 'Gibson Les Paul Standard 50s',
    price: '$2589.99',
  },
];*/

export default class GuitarSpecifications {
  public camera;
  public guitarName;
  constructor(structure: Structure, guitarName: string) {
    this.camera = structure.camera.instance;
    this.guitarName = guitarName;
  }
}
