import "./Hero.css"

export const Hero = () => {
  const mainSection = document.querySelector('.main-section');

  const heroEl = document.createElement('section');

  const heroElTitle = `
  <div id="main-guitar-trigger" class="h-[100dvh] relative ">
  <div class="heroSection sm:mt-[1.8rem] md:mt-[5.2rem] flex flex-col md:w-[70%] lg:w-[800px] gap-[2rem] text-[#1f1b1b]">
  
  <h1 class='sm:text-[3.2rem] lg:text-[5.2rem] text-[#1f1b1b]'>Welcome to the future of guitars with Sonicore</h1>
  
  <p class="lg:text-[3.2rem] sm:text-[2.4rem] text-[#1f1b1b]">Ready to find your next dream guitar? Check out and explore our awesome 3D collection.</p>

  <div class="mouse_scroll absolute left-[50%] sm:bottom-[calc(0%+9rem)] md:bottom-[calc(0%+14rem)]">

		<div class="mouse">
			<div class="wheel"></div>
		</div>
		<div>
			<span class="m_scroll_arrows unu"></span>
			<span class="m_scroll_arrows doi"></span>
			<span class="m_scroll_arrows trei"></span>
		</div>
</div>

  </div>
  </div>
  `;

  heroEl.innerHTML = heroElTitle;

  mainSection?.appendChild(heroEl);
};
