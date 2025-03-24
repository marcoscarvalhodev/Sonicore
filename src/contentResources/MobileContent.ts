import gsap from 'gsap';

export default class MobileContent {
  public messageActive;
  public mainSection;
  public showMessage;

  constructor() {
    this.mainSection = document.querySelector('.main-section');
    this.messageActive = false;
    this.showMessage = document.createElement('section');

    gsap.set(this.showMessage, {
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

  setShowGuitarClickMessage() {
    const showMessageHTML = `
    <div class="show-message-guitar flex flex-col absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center opacity-0 pointer-events-none w-[30rem]">
          <h1 class="text-[2.4rem]">Click on one of the guitars to visualize it</h1>
      </div>`;

    this.showMessage.innerHTML = showMessageHTML;

    this.mainSection?.appendChild(this.showMessage);

    if (!this.messageActive) {
      const tl = gsap.timeline();
      
      tl.to('.show-message-guitar', {
        opacity: 1,
        duration: 1,
      });

      tl.to('.show-message-guitar', {
        opacity: 0,
        duration: 1,
        delay: 3,
      });

      this.messageActive = true;
    }
  }
}
