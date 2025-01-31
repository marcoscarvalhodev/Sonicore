import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

enum shortTextEnum {
  'shorttext_1' = 'shorttext_1',
  'shorttext_2' = 'shorttext_2',
  'shorttext_3' = 'shorttext_3',
  'shorttext_4' = 'shorttext_4',
}

const contents = [
  {
    tag: `<h2 class="${shortTextEnum.shorttext_1} text-[32px] self-end w-[300px] mb-[100vh]">THIS IS WHERE INOVATION HAS ITS PLACE</h2>`,
    identifier: shortTextEnum.shorttext_1,
  },
  {
    tag: `<h2 class="${shortTextEnum.shorttext_2} text-[32px] self-center w-[300px] mb-[100vh]">TAKE THE NEXT STEP WITH SONICORE</h2>`,
    identifier: shortTextEnum.shorttext_2,
  },
  {
    tag: `<h2 class="${shortTextEnum.shorttext_3} text-[32px] self-end w-[300px] mb-[100vh]">FIND YOUR DREAM GUITAR FULLY CUSTOMIZABLE</h2>`,
    identifier: shortTextEnum.shorttext_3,
  },
  {
    tag: `<h2 class="${shortTextEnum.shorttext_4} text-[32px] self-center w-[300px]">ONCE YOU BUY AT SONICORE, YOU WON'T WANT NO OTHER WAY</h2>`,
    identifier: shortTextEnum.shorttext_4,
  },
];

gsap.registerPlugin(ScrollTrigger);

export const Characteristics = () => {
  const mainSection = document.querySelector('.main-section');

  const characteristicsEl = document.createElement('section');

  const characteristicsElText = `
      <div 

        <div id="mainText" class="flex flex-col">
        <h2 class="showTextLeft text-[72px] font-bold translate-x-[-100%] pt-[72px]">BUILT WITH THE LATEST TECHNOLOGIES</h2>
     
        <h2 id="trigger_1" class="showTextRight self-end text-[42px] w-[480px] font-bold mt-[300px] translate-x-[650px]">CHOOSE FROM A RANGE OF COLORS.</h2>

        <div  class=" mt-[100vh]"> </div>
        
        ${contents.map(({ tag }) => {
          return tag;
        })}
        
        <div id="trigger_2" class="h-[100vh]"></div>

        </div>
        <div class="h-[1000vh]"></div>
      </div>
  `;

  characteristicsEl.innerHTML = characteristicsElText;

  mainSection?.appendChild(characteristicsEl);

  gsap.to(document.querySelector('.showTextLeft'), {
    xPercent: 100,
    scrollTrigger: {
      trigger: document.querySelector('.showTextLeft'),
      scrub: 2,
      start: 'center+=-50px center+=100px',
      end: 'bottom+=50px center+=100px',
      toggleActions: 'play none none none',
    },
  });

  const showTextRight = document.querySelector('.showTextRight');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: showTextRight,
      scrub: 4,
      start: 'top center+=100px',
      end: 'bottom-=30px center+=100px',
    },
  });

  tl.fromTo(
    showTextRight,
    {
      x: '600',
    },
    { x: '80' },
    0
  );

  //alternate when text goes left and right

  contents.forEach(({ identifier }, index) => {
    if (index % 2 === 0) {
      tl.fromTo(
        showTextRight,
        { x: '80' },
        {
          x: '-300',

          scrollTrigger: {
            trigger: document.querySelector(`.${identifier}`),
            scrub: 2,
            start: `top-=100px center`,
            end: 'bottom center',
          },
        },
        0
      );
    } else {
      tl.fromTo(
        showTextRight,
        { x: '-300' },
        {
          x: '80',
          scrollTrigger: {
            trigger: document.querySelector(`.${identifier}`),
            scrub: 2,
            start: `top-=100px center`,
            end: 'bottom center',
          },
        },
        0
      );
    }
  });

  gsap.set(showTextRight, { x: '650' });

  const trigger_1 = document
    .getElementById('trigger_1')
    ?.getBoundingClientRect();
  const trigger_2 = document
    .getElementById('trigger_2')
    ?.getBoundingClientRect();

  const triggers_diff = trigger_1!.bottom - trigger_2!.top;


  ScrollTrigger.create({
    trigger: showTextRight,
    start: 'top top+=50px',
    end: `bottom+=${Math.abs(triggers_diff)}px top`,
    pin: true,
    pinSpacing: false,
    
  });
};
