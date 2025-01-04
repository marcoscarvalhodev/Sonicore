import  EventEmitter  from './EventEmitter';

export default class Time extends EventEmitter {
  public start;
  public current;
  public delta;
  public elapsedTime;
  
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.delta = 16;
    this.elapsedTime = 0;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();

    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsedTime = this.current - this.start;

    this.trigger('tick');

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
