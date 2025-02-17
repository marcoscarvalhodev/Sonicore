import './style.css';
import { Hero } from './contentResources/Hero.ts';
import Nav from './contentResources/Nav.ts';
import { Characteristics } from './contentResources/Characteristics.ts';
import Structure from './Structure/Structure.ts';
import gsap from 'gsap';

gsap.set('body', { overflowX: 'hidden' });
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div >
  <canvas class="webgl"></canvas>
    <main class="main-section sm:px-[2.4rem] md:px-[4.8rem] relative left-0 right-0"></main>
  </div>
`;

new Nav();
Hero();
new Characteristics();

new Structure({
  canvas: document.querySelector('canvas.webgl'),
});
