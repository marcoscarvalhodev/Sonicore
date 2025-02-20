import gsap from 'gsap';
export default class LegendaryGuitars {
  public legendaryHTML;
  constructor() {
    this.legendaryHTML = document.createElement('section');
    gsap.set(this.legendaryHTML, {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      z: '999',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      pointerEvents: 'none',
    });
  }

  setLegendaryGuitars() {
    const LegendaryGuitars = `
      <div class="w-screen h-screen relative">
        
      <h1 id="legendary-text-2" class="text-[3.2rem] absolute translate-x-[-100%] left-0 pl-[80px] mt-[8rem] text-[#1f1b1b]">Airline Res-O-Glass "JB Hutto"</h1>
      
      <h1 id="legendary-text-1" class="text-[3.2rem] absolute translate-x-[100%] right-0 bottom-0 pr-[8rem] sm:mb-[15rem] md:mb-[8rem] text-[#1f1b1b]">Gibson ES-335</h1>
        
      </div>
    `;

    this.legendaryHTML.innerHTML = LegendaryGuitars;
    document.body.appendChild(this.legendaryHTML);
  }
}
