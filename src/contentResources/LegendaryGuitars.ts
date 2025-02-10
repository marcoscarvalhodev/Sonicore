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
    });
  }

  setLegendaryGuitars() {
    const LegendaryGuitars = `
      <div class="w-screen h-screen">
      
      
        
      <h1 id="legendary-text-2" class="text-[32px] absolute translate-x-[-100%] left-0 pl-[80px] mt-[80px]">Airline Res-O-Glass "JB Hutto"</h1>
      <h1 id="legendary-text-1" class="text-[32px] absolute translate-x-[100%] right-0 bottom-0 pr-[80px] mb-[80px]">Gibson ES-335</h1>
        
      </div>
    `;

    this.legendaryHTML.innerHTML = LegendaryGuitars;
    document.body.appendChild(this.legendaryHTML);
  }
}
