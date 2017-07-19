export class Touch {
  constructor(element) {
    this.mylatesttap;
    // Touch Point cache
    this.tpCache = new Array();
    this.element = typeof (element) === 'string' ? document.querySelector(element) : element;
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
  
  startHandler = (e, cb) => {
    if (e.targetTouches.length == 2) {
      for (var i = 0; i < e.targetTouches.length; i++) {
        tpCache.push(e.targetTouches[i]);
      }
    }
    cb(e)
  }

  onTap = callback => {
    this.onTap = callback;
    return this;
  }

  onDoubleTap = callback => {
    this.onDoubleTap = callback;
    return this;
  }

  handleTap = e => {
    e.preventDefault();
    var now = new Date().getTime();
    var timesince = now - this.mylatesttap;
    if ((timesince < 300) && (timesince > 0)) {
      this.onDoubleTap(e);
    }
    else {
      this.onTap(e);
    }
    this.mylatesttap = new Date().getTime();
  }

  run() {
    this.element.addEventListener('touchstart', this.handleTap);
    this.element.addEventListener('click', this.handleTap);
  }

  destroy() {
    this.element.removeEventListener('touchstart', this.handleTap);
    this.element.removeEventListener('click', this.handleTap);
  }
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
    this.element.removeEventListener('touchmove', this.handleTouchMove);
  }
}