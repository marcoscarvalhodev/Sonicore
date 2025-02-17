export default class ScreenSizeHandler {
  public mediaQuery;
  public match: null | boolean;

  constructor(mediaQuery: string) {
    this.mediaQuery = mediaQuery;
    this.match = null;

    this.init();
  }

  init() {
    this.updateMatch();
    window.addEventListener('resize', () => this.updateMatch());
    window.addEventListener('loadstart', () => this.updateMatch());
  }

  updateMatch() {
    const mediaQueryList = window.matchMedia(this.mediaQuery);
    this.match = mediaQueryList.matches;
  }

  destroy() {
    window.removeEventListener('resize', () => this.updateMatch());
  }
}
