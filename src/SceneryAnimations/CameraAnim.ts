import Structure from '../Structure/Structure';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LegendaryGuitars from '../contentResources/LegendaryGuitars';
import ScreenSizes from '../Structure/Utils/ScreenSizes';

const { sm } = ScreenSizes();
gsap.registerPlugin(ScrollTrigger);

export default class CameraAnim {
  public camera;
  public domEl;
  public timeline: null | gsap.core.Timeline;
  public timeline_no_scrub: null | gsap.core.Timeline;
  public cameraForward: undefined | gsap.core.Timeline;
  public structure;
  public gsap;
  public legendaryGuitars;

  constructor(structure: Structure) {
    this.gsap = gsap;
    this.legendaryGuitars = new LegendaryGuitars().setLegendaryGuitars();
    this.structure = structure;
    this.domEl = document.getElementById('camera-anim');
    this.camera = structure.camera.instance;
    this.cameraForward = undefined;
    this.timeline = null;
    this.timeline_no_scrub = null;
    this.setCameraAnim();
  }

  setCameraAnim() {
    this.timeline = this.gsap.timeline({
      scrollTrigger: {
        trigger: this.domEl,
        start: 'top center',
        end: 'bottom-=150px bottom-=100px',
        scrub: 5,
      },
    });

    this.timeline
      .to(
        this.camera.position,
        {
          z: -23,
          x: -2,
          y: 4,
          duration: 2,
        },

        0
      )

      .to(
        this.camera.rotation,
        {
          y: -1.57,
          duration: 2,
          delay: 0.2,
        },
        0
      )
      .to(
        ['#legendary-text-1', '#legendary-text-2'],
        {
          x: '0',
          delay: 1,
          duration: 1,
        },
        0
      )
      .to(
        '#legendary-text-1',
        {
          x: '100%',
          duration: 1,
          delay: 0.4,
        },
        2.6
      )
      .to('#legendary-text-2', { x: '-100%', duration: 1, delay: 0.4 }, 2.6)

      .to(
        this.camera.position,
        {
          z: sm ? -15 : 0,
          x: -2,
          y: 10,
          duration: 1,
        },
        3
      )
      .to(
        this.camera.rotation,
        {
          y: 0,
          duration: 1,
        },
        3
      )
      .to(
        this.camera.position,
        {
          z: sm ? -32 : -25,
          x: this.camera.position.x - 0.3,
          duration: 1,
        },
        4
      );

    this.timeline.eventCallback(
      'onUpdate',
      this.simpleThrottle(() => {
       
        this.structure.world.scenery?.material?.update();
      }, 40)
    );
  }

  simpleThrottle(func: () => void, limit: number) {
    let lastCall = 0;

    return function () {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func();
      }
    };
  }
}
