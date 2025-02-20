import Structure from '../Structure/Structure';
import gsap from 'gsap';
import * as THREE from 'three';
import ScreenSizes from '../Structure/Utils/ScreenSizes';

const { sm } = ScreenSizes();

const GuitarContent = [
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
    name: 'Fender Player Telecaster Guitar',
    price: '$1029.00',
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
    name: 'BC Rich Legacy Series Stealth Guitar',
    price: '$1290.99',
  },
  {
    type: 'guitar_12',
    name: 'Jackson Pro Series SL2Q Soloist Guitar',
    price: '$1570.00',
  },
];

export default class GuitarSpecifications {
  public camera;
  public guitarName;
  public specHTML;
  public idGuitarSpec;
  public index;
  public backGuitarSelection;
  public updatedCamera;
  public buyGuitar;
  public gsap;

  constructor(
    structure: Structure,
    guitarName: string,
    index: number,
    updatedCamera: THREE.Vector3
  ) {
    this.camera = structure.camera.instance;
    this.updatedCamera = updatedCamera;
    this.guitarName = guitarName;
    this.index = index % 2 === 0 ? true : false;
    this.gsap = gsap;

    if (this.updatedCamera.z < (sm ? -31 : -24)) {
      this.specHTML = document.createElement('section');
      this.gsap.set(this.specHTML, {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        z: 9999,
      });

      this.setGuitarSpec();

      this.idGuitarSpec = document.getElementById('guitar_spec_wrapper');
      this.backGuitarSelection = document.getElementById(
        'back_guitar_selection'
      );

      this.buyGuitar = document.getElementById('buy_guitar');

      this.guitarSpecIn();
    }
  }

  setBoughtGuitar() {
    const boughtGuitarText = `<div id="bought_guitar_text" class="opacity-0 w-full h-full flex justify-center items-center">${GuitarContent.filter(
      ({ type }) => type === this.guitarName
    ).map(
      ({ name }) =>
        `<div class='px-[2.4rem] flex gap-[1.2rem] items-center'><h1 class="sm:text-[2rem] md:text-[3.2rem] text-[#11742a]">This ${name.replace(
          ' Guitar',
          ''
        )} is all yours</h1><img src="./svg/icon-check.svg" class="sm:w-[2.8rem] md:w-[4rem] h-[40px]"/></div>`
    )}</div>`;

    if (this.specHTML) {
      this.specHTML.innerHTML = boughtGuitarText;
    }

    this.gsap
      .timeline()
      .to('#bought_guitar_text', {
        opacity: 1,
        duration: 1,
        delay: 0.5,
      })
      .to('#bought_guitar_text', {
        opacity: 0,
        duration: 1,
        delay: 1,
        onComplete: () => {
          document.getElementById('bought_guitar_text')?.remove();
        },
      });
  }

  setGuitarSpec() {
    const spectText = `
      <div id="guitar_spec_wrapper" class=" fixed w-screen h-screen z-[999] p-[32px]">${GuitarContent.filter(
        ({ type }) => type === this.guitarName
      ).map(
        ({ name, price }) => `<div class="select-none"> 
              <h1 class="sm:text-[3.2rem] md:text-[4.8rem] mb-[1.6rem] text-[#1f1b1b]">${name}</h1>
              <h2 class="sm:text-[2.4rem] md:text-[3.2rem] mb-[1.6rem] text-[#1f1b1b]">Price: ${price}</h2>
              <ul class="flex gap-[20px] mt-[2rem] sm:flex-col lg:flex-row">
                <li id="buy_guitar" class="btn_buy">BUY GUITAR</li>
                <li id="back_guitar_selection" class="btn_back">${
                  sm ? 'GO BACK' : 'GO BACK TO SELECTION'
                }</li>
              </ul>
            </div>`
      )}</div>
    `;
    if (this.specHTML) {
      this.specHTML.innerHTML = spectText;
      gsap.set(this.specHTML, {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      });
      document.body.appendChild(this.specHTML);
    }
  }

  guitarSpecIn() {
    if (this.idGuitarSpec) {
      gsap.fromTo(
        this.idGuitarSpec,
        {
          x: this.index ? '-100%' : '100%',
        },
        { x: '0', duration: 2 }
      );
    }
  }

  setGuitarOut = () => {
    if (this.idGuitarSpec)
      gsap.to(this.idGuitarSpec, {
        x: this.index ? '100%' : '-100%',
        duration: 2,
        onComplete: () => {
          this.idGuitarSpec?.remove();
          this.specHTML?.remove()
        },
      });
  };
}
