import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Characteristics = () => {
  const mainSection = document.querySelector('.main-section');

  const characteristicsEl = document.createElement('section');

  const characteristicsElText = `
      <div class="flex flex-col">
        <h2 class="showTextLeft text-[72px] font-bold translate-x-[-100%] pt-[72px]">BUILT WITH THE LATEST TECHNOLOGIES</h2>
     
        <h2 id="trigger_1" class="showTextRight self-end text-[56px] w-[560px] font-bold translate-x-[calc(100%+90px)] mt-[300px]">CHOOSE FROM A RANGE OF COLORS.</h2>

        <div  class="h-[100vh] mt-[200vh]"> </div>
        
        <h2 class="text-[42px] text-end">THIS IS WHERE INOVATION HAS ITS PLACE</h2>
        <div id="trigger_2" class="h-[100vh]"></div>
      </div>
  `;

  characteristicsEl.innerHTML = characteristicsElText;

  mainSection?.appendChild(characteristicsEl);

  gsap.to(document.querySelector('.showTextLeft'), {
    xPercent: 100,
    scrollTrigger: {
      trigger: document.querySelector('.showTextLeft'),
      scrub: 4,
      start: 'center+=-50px center+=100px',
      end: 'bottom+=50px center+=100px',
      toggleActions: 'play none none none',
      markers: true,
    },
  });

  const showTextRight = document.querySelector('.showTextRight');

  gsap.to(showTextRight, {
    x: 'calc(-100%+90px)',
    scrollTrigger: {
      trigger: document.querySelector('.showTextRight'),
      scrub: 4,
      start: 'top center+=100px',
      end: 'bottom-=30px center+=100px',
      toggleActions: 'play none none none',
    },
  });

  const trigger_1 = document
    .getElementById('trigger_1')
    ?.getBoundingClientRect();
  const trigger_2 = document
    .getElementById('trigger_2')
    ?.getBoundingClientRect();

  const triggers_diff = trigger_1!.bottom - trigger_2!.top;

  console.log(triggers_diff);

  ScrollTrigger.create({
    trigger: showTextRight,
    start: 'top top+=50px',
    end: `bottom+=${Math.abs(triggers_diff)}px top`,
    pin: true,
    pinSpacing: false,
  });
};
