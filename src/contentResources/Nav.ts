export const Nav = () => {
  const headerNav = document.createElement('header');
  const mainSection = document.querySelector('.main-section');
  const navEl = `<nav class=" w-full py-[20px] flex items-center justify-between">
  
  <h1 class="text-[30px]">Sonicore</h1> 
  
  <ul>

  <li><a></a></li>
  <li><a></a></li>
  <li><a class="btn_buy">BUY A GUITAR</a></li>
  
  </ul>
  
  </nav>`;

  headerNav.innerHTML = navEl;

  mainSection?.appendChild(headerNav);
};
