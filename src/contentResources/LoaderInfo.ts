import gsap from 'gsap';

export default class LoaderInfo {
  public mainSection;
  public percentageWrapper;
  constructor() {
    this.mainSection = document.querySelector('.main-section');
    this.percentageWrapper = document.createElement('div');

    gsap.set(this.percentageWrapper, {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999999,
      background: '#ebebeb',
    });
  }

  setLoaderPercentage(percentage: number) {
    if (this.percentageWrapper)
      this.percentageWrapper.innerHTML = `
      <div class="flex flex-col absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center">

      <h1 class="text-[3.2rem] text-red-600 ">${percentage}%</h1>
      </div>
      
    `;

    this.mainSection?.appendChild(this.percentageWrapper);
    
  }

  setRemoveLoader() {
    this.percentageWrapper.remove();
  }
}
