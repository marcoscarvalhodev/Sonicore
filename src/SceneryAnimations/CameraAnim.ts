import Structure from '../Structure/Structure';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class CameraAnim {
  public camera;
  public domEl;
  public timeline: null | gsap.core.Timeline;
  public cameraForward: undefined | gsap.core.Timeline;
  public structure;
  public gsap;

  constructor(structure: Structure) {
    this.gsap = gsap;
    this.structure = structure;
    this.domEl = document.getElementById('camera-anim');
    this.camera = structure.camera.instance;
    this.cameraForward = undefined;
    this.timeline = null;
    this.setCameraAnim();
  }

  setCameraAnim() {
    
      this.timeline = this.gsap.timeline({
        scrollTrigger: {
          trigger: this.domEl,
          markers: true,
          start: 'top center',
          end: 'bottom-=150px bottom-=100px',
          scrub: 2,
          
        },
      });

      this.timeline.to(this.camera.position, {
        z: -40,
        duration: 5,
      });
    
  }

}
