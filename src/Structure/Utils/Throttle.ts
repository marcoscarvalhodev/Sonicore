export default class Throttle {
  public prev;
  public fn;
  public delay;
  constructor(fn: (event: TouchEvent | MouseEvent ) => void, delay: number) {
    this.prev = 0;
    this.fn = fn;
    this.delay = delay;
  }

  setThrottle = (event: TouchEvent | MouseEvent) => {
    const now = Date.now();
    if (now - this.prev > this.delay) {
      this.prev = now;
      this.fn(event);
    }
  };


}