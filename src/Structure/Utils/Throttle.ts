export default class Throttle {
  public prev;
  public fn;
  public delay;
  constructor(fn: (event: MouseEvent | TouchEvent ) => void, delay: number) {
    this.prev = 0;
    this.fn = fn;
    this.delay = delay;
  }

  setThrottle = (event: MouseEvent | TouchEvent) => {
    const now = Date.now();
    if (now - this.prev > this.delay) {
      this.prev = now;
      this.fn(event);
    }
  };


}
