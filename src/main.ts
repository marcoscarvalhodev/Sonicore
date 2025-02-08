import './style.css';
import { Hero } from './contentResources/Hero.ts';
import { Nav } from './contentResources/Nav.ts';
import { Characteristics } from './contentResources/Characteristics.ts';
import Structure from './Structure/Structure.ts';

document.body.style.overflowX = 'hidden';
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div >
  <canvas class="webgl"></canvas>
    <main class="main-section px-[72px]"></main>
  </div>
`;


Nav();
Hero();
new Characteristics();

new Structure({
  canvas: document!.querySelector('canvas.webgl'),
});
