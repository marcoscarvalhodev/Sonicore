export const Hero = () => {
  const mainSection = document.querySelector('.main-section');

  const heroEl = document.createElement('section');

  const heroElTitle = `<div class="heroSection flex flex-col md:w-[70%] lg:w-[60%] gap-[2rem]">
  
  <h1 class='sm:text-[4.2rem] lg:text-[5.2rem]'>Welcome to the future of guitars with <span>Sonicore</span></h1>
  
  <p class="lg:text-[3.2rem] sm:text-[2.4rem]">Ready to find your next dream guitar? Check out and explore our awesome 3D collection.</p>

  </div>
  `;

  heroEl.innerHTML = heroElTitle;

  mainSection?.appendChild(heroEl);
};
