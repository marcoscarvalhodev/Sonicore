export const Nav = () => {
  const headerNav = document.createElement('header');
  const mainSection = document.querySelector('.main-section');
  const navEl = `<nav class=" w-full py-[20px] flex items-center justify-between">
  
  <h1 class="text-[30px]">Sonicore</h1> 
  
  <ul>

  <li><a></a></li>
  <li><a></a></li>
  <li><a class="cursor-pointer transition-all duration-[1s] bg-red-600 px-[20px] py-[10px] rounded-[24px] text-[white] border-red-600 border-solid border-[3px] hover:bg-transparent hover:text-black">BUY A GUITAR</a></li>
  
  </ul>
  
  </nav>`;

  headerNav.innerHTML = navEl;

  mainSection?.appendChild(headerNav);
};
