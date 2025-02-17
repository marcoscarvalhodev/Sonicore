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
        scrollTo: { y: document.body.scrollHeight, autoKill: false }, // Scroll to the bottom of the page
        duration: 1, // Duration of the scroll animation
        ease: 'power2.inOut', // Easing function
      });
    });
  }

  setNav() {
    const navEl = `<nav class=" w-full py-[2rem] flex items-center justify-between">
    
    <h1 class="text-[3.2rem]">Sonicore</h1> 
    
    <ul>
    <li><a id="main-btn-buy" class="btn_buy">BUY A GUITAR</a></li>
    
    </ul>
    
    </nav>`;

    this.headerNav.innerHTML = navEl;

    this.mainSection?.appendChild(this.headerNav);
  }
}
