import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

export default class Nav {
  public mainSection;
  public headerNav;
  public guitarButton;
  constructor() {
    this.mainSection = document.querySelector('.main-section');
    this.headerNav = document.createElement('header');
    this.setNav();

    this.guitarButton = document.getElementById('main-btn-buy');
    this.ScrollBottom();
  }

  ScrollBottom() {
    this.guitarButton?.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: { y: document.body.scrollHeight, autoKill: false },
        duration: 1,
        ease: 'power2.inOut',
      });
    });
  }

  setNav() {
    const navEl = `<nav class=" w-full py-[2rem] flex items-center justify-between">
    
    <h1 class="sm:text-[2.4rem] md:text-[3.2rem] text-[#1f1b1b]">Sonicore</h1> 
    
    <ul class="flex gap-[1.6rem]">

    <li >
    <div >
    <img id="toggleButton" class="sm:max-w-[3rem] md:max-w-[4rem] cursor-pointer hover:opacity-[0.7] transition-all duration-[0.3s]" src="/svg/sound-mute.svg"/></div>
    <audio class="h-0 w-0 opacity-0 pointer-events-none" id="audioPlayer" controls></audio>
    </li>

    <li class="mt-[0.7rem]"><a id="main-btn-buy" class="btn_buy ">BUY A GUITAR</a></li>
    
    </ul>
    
    </nav>`;

    this.headerNav.innerHTML = navEl;

    this.mainSection?.appendChild(this.headerNav);
  }
}
