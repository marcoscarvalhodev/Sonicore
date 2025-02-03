import Structure from '../Structure/Structure';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class CameraAnim {
  public camera;
  public domEl;
  public timeline;
  constructor(structure: Structure) {
    this.domEl = document.getElementById('camera-anim');
    this.camera = structure.camera.instance;
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.domEl,
        markers: true,
        start: 'top center',
        end: 'bottom-=150px bottom-=100px',
        scrub: 2,
      },
    });

    this.setCameraAnim();
  }

  setCameraAnim() {
    this.timeline.to(this.camera.position, {
      z: -40,
      duration: 5,
    });
    
  }

  update() {
  
  }
}
