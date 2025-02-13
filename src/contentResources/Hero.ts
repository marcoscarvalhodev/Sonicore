export const Hero = () => {
  const mainSection = document.querySelector('.main-section');

  const heroEl = document.createElement('section');

  const heroElTitle = `<div class="heroSection flex flex-col w-[50%] gap-[20px]">
  
  <h1 class='text-[50px]'>Welcome to the future of guitars with <span>Sonicore</span></h1>
  
  <p class="text-[30px]">Ready to find your next dream guitar? Check out and explore our awesome 3D collection.</p>

  </div>
  `;

  heroEl.innerHTML = heroElTitle;

  mainSection?.appendChild(heroEl);
};
