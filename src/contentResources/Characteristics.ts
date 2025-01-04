import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Characteristics = () => {
  const mainSection = document.querySelector('.main-section');

  const characteristicsEl = document.createElement('section');

  const characteristicsElText = `
      <div>
        <h2 class="text-[72px] font-bold showText translate-x-[-100%]">BUILT WITH THE LATEST TECHNOLOGIES</h2>

        <h2 class="text-[72px] font-bold">New asset</h2>

        <h2 class="text-[72px] font-bold">New asset</h2>

        <h2 class="text-[72px] font-bold">New asset</h2>

        <h2 class="text-[72px] font-bold">New asset</h2>

        <h2 class="text-[72px] font-bold">New asset</h2>
      </div>
  `;



  characteristicsEl.innerHTML = characteristicsElText;

  mainSection?.appendChild(characteristicsEl);


  gsap.to(document.querySelector(".showText"), {
    xPercent: 100,
    
    scrollTrigger: {
      trigger: document.querySelector(".showText"),
      scrub: 4,
      markers: true,
      start: "center+=-50px center+=100px",
      end: 'bottom+=50px center+=100px',
      toggleActions: "play none none none",
      
    },
   
  });
};
