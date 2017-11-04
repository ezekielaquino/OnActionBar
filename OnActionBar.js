class OnActionBar {
  constructor(options) {
    if (OnActionBar.isIOS()) {
      Object.assign(this, options);
      this.data = {
        initialHeight: 0,
        collapsedHeight: 0,
        isCollapsed: false
      };

      this._init();
      this._listen();

      return this;
    } else {
      return false;
    }
  }

  _init() {
    const root = document.documentElement;

    this._prevState = this.isCollapsed;
    this.data.device = OnActionBar.isIOS()[0];

    if (!root.classList.contains(this.data.device)) {
      root.classList.add(this.data.device.toLowerCase());
    }

    if (this.data.initialHeight === 0) {
      this.data.initialHeight = window.innerHeight;
      this.previousHeight = this.data.initialHeight;
    }

    this.onInit(this.data);
  }

  _listen() {
    window.addEventListener('scroll', () => {
      if (this.previousHeight === window.innerHeight) {
        if (window.innerHeight > this.data.initialHeight) {
          if (this.data.collapsedHeight === 0 || this.data.collapsedHeight < window.innerHeight) {
            this.data.collapsedHeight = window.innerHeight;
          }

          this._setState(true, this.onCollapse);
        } else {
          this._setState(false, this.onVisible);
        }
      } else {
        this.previousHeight = window.innerHeight;
      }
    });
  }

  _setState(isCollapsed, callback) {
    this.data.isCollapsed = isCollapsed;

    if (this._prevState !== this.data.isCollapsed) {
      this._prevState = this.data.isCollapsed;

      if (this.setAttribute) {
        const root = document.documentElement;
        root.classList.remove('is-actionbar');
        if (this.data.isCollapsed) root.classList.add('is-actionbar');
      }  

      callback(this.data);
    }
  }

  static isIOS(device) {
    const devices = device || 'iPad|iPhone';
    const regex = new RegExp(`(${devices})`);
    return navigator.userAgent.match(regex);
  }
}

export default OnActionBar;