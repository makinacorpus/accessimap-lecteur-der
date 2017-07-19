class touch {
  constructor() {
    this.mylatesttap;
  }

  getType(e) {
    e.preventDefault();
    let eventType;
    var now = new Date().getTime();
    var timesince = now - this.mylatesttap;
    if ((timesince < 300) && (timesince > 0)) {
    // double tap   
      eventType = 'dblclick';
    }
    else {
      // single tap
      eventType = 'click';
    }
    this.mylatesttap = new Date().getTime();
    return eventType;
  }
}

export const touchEvent = new touch()


// Touch Point cache
var tpCache = new Array();

export const touchStartHandler = (e, cb) => {
  if (e.targetTouches.length == 2) {
    for (var i = 0; i < e.targetTouches.length; i++) {
      tpCache.push(e.targetTouches[i]);
    }
  }
  cb(e)
}

export function move_handler(e) {
  e.preventDefault();
}

export class Swipe {
  constructor(element) {
    this.xDown = null;
    this.yDown = null;
    this.element = typeof (element) === 'string' ? document.querySelector(element) : element;

    this.element.addEventListener('touchstart', function (evt) {
      this.xDown = evt.touches[0].clientX;
      this.yDown = evt.touches[0].clientY;
    }.bind(this), false);
  }

  onUp = callback => {
    this.onUp = callback;
    return this;
  }

  onDown = callback => {
    this.onDown = callback;
    return this;
  }

  handleTouchMove = e => {
    if (!this.xDown || !this.yDown) {
      return;
    }

    var xUp = e.touches[0].clientX;
    var yUp = e.touches[0].clientY;

    this.xDiff = this.xDown - xUp;
    this.yDiff = this.yDown - yUp;

    if (Math.abs(this.xDiff) < Math.abs(this.yDiff)) { // Most significant.
      if (this.yDiff > 0) {
        this.onUp(e);
      } else {
        this.onDown(e);
      }
    }

    // Reset values.
    this.xDown = null;
    this.yDown = null;
  }

  run() {
    this.element.addEventListener('touchmove', this.handleTouchMove);
  }

  destroy() {
    console.log('destroy')
    this.element.removeEventListener('touchmove', this.handleTouchMove);
  }
}