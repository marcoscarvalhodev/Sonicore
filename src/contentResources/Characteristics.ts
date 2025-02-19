import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScreenSizes from '../Structure/Utils/ScreenSizes';
gsap.registerPlugin(ScrollTrigger);

const { md, sm } = ScreenSizes();
enum shortTextEnum {
  'shorttext_1' = 'shorttext_1',
  'shorttext_2' = 'shorttext_2',
  'shorttext_3' = 'shorttext_3',
  'shorttext_4' = 'shorttext_4',
}

const contents = [
  {
    tag: `<h2 class="${shortTextEnum.shorttext_1} sm:text-[2.4rem] lg:text-[3.2rem] self-end w-[300px] mb-[100vh]"> ELEVATE YOUR PLAYING EXPERIENCE WITH OUR FINE GUITARS</h2>`,
    identifier: shortTextEnum.shorttext_1,
  },
  {
    tag: `<h2 class="${shortTextEnum.shorttext_2} sm:text-[2.4rem] lg:text-[3.2rem] self-end w-[300px] mb-[100vh]">TAKE THE NEXT STEP WITH SONICORE</h2>`,
    identifier: shortTextEnum.shorttext_2,
  },
  {
    tag: `<h2 class="${shortTextEnum.shorttext_3} sm:text-[2.4rem] lg:text-[3.2rem] self-end w-[300px] mb-[100vh]">YOUR DREAM GUITAR AWAITS FOR YOU</h2>`,
    identifier: shortTextEnum.shorttext_3,
  },
  {
    tag: `<h2 class="${shortTextEnum.shorttext_4} sm:text-[2.4rem] lg:text-[3.2rem] self-end w-[300px]">FULLY CUSTOMIZABLE GUITARS THAT SUITS YOUR PREFERENCE</h2>`,
    identifier: shortTextEnum.shorttext_4,
  },
];

export class Characteristics {
  public mainSection;
  public characteristicsWrapper;
  public showTextLeft;
  public showTextRight;
  public timeline;

  constructor() {
    this.mainSection = document.querySelector('.main-section');
    this.characteristicsWrapper = document.createElement('section');
    this.setCharacteristics();

    this.showTextLeft = document.querySelector('.showTextLeft');
    this.showTextRight = document.querySelector('.showTextRight');

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.showTextRight,
        scrub: 2,
        start: 'top center+=100px',
        end: 'bottom-=30px center+=100px',
      },
    });

    this.setMainTextsAnim();
    this.setAlternateTexts();
  }

  setCharacteristics() {
    const characteristicsElText = `
    <div id="scroll-container">
      <div id="mainText" class="flex flex-col">
      <h2 class="showTextLeft sm:text-[4.8rem] lg:text-[7.2rem] font-bold translate-x-[-100%] pt-[220px]">DESIGNED WITH TOP-QUALITY COMPONENTS</h2>
   
      <h2 id="trigger_1" class="showTextRight self-end text-[42px] md:w-[480px] font-bold mt-[300px] translate-x-[650px]">CHOOSE FROM A VARIETY OF MODELS</h2>

      <div class="sm:mt-[200px] lg:mt-[100vh]"> </div>
      
      ${contents
        .map(({ tag }) => {
        
          return tag;
        })
        .join('')}
      
      <div id="trigger_2" class="h-[100vh]"></div>

      </div>
      <div id="camera-anim" class="h-[1600vh]"></div>
    </div>
`;

    this.characteristicsWrapper.innerHTML = characteristicsElText;

    this.mainSection?.appendChild(this.characteristicsWrapper);
  }

  setAlternateTexts() {
    this.timeline.fromTo(
      this.showTextRight,
      { x: '0' },
      {
        x: sm || md ? '0' : '-350',

        scrollTrigger: {
          trigger: document.querySelector(`.shorttext_1`),
          scrub: 2,
          start: `top-=100px center`,
          end: 'top+=100vh center',
        },
      },
      0
    );

    gsap.set(this.showTextRight, { x: '650' });

    const trigger_1 = document
      .getElementById('trigger_1')
      ?.getBoundingClientRect();
    const trigger_2 = document
      .getElementById('trigger_2')
      ?.getBoundingClientRect();

    const triggers_diff = trigger_1!.bottom - trigger_2!.top;

    ScrollTrigger.create({
      trigger: this.showTextRight,
      start: 'top top+=50px',
      end: `bottom+=${Math.abs(triggers_diff)}px top`,
      pin: md || sm ? false : true,
      scrub: 2,
      pinSpacing: false,
    });
  }

  setMainTextsAnim() {
    gsap.fromTo(
      this.showTextLeft,
      {
        xPercent: -10,
      },
      {
        xPercent: 100,
        scrollTrigger: {
          trigger: this.showTextLeft,
          scrub: 2,
          start: 'center+=-50px center+=100px',
          end: 'bottom+=50px center+=100px',
          toggleActions: 'play none none none',
        },
      }
    );

    this.timeline.fromTo(
      this.showTextRight,
      {
        x: '600',
      },
      { x: '0', duration: 1 },
      0
    );
  }
}
