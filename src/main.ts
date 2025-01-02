import './style.css';
import { CanvasAnimations } from './canvasScene.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="sonicore-canvas" class=" bg-blue-400 w-screen h-screen">
    
  </div>
`;

CanvasAnimations.canvasScene();
