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
    this.mousedown = false;


    this.element.addEventListener('touchstart', this.start);
    this.element.addEventListener('mousedown', this.start);

    this.element.addEventListener('touchend', this.stop);
    this.element.addEventListener('mouseup', this.stop);
  }

  start = (evt) => {  
    this.mousedown = true;
    this.yDown = evt.targetTouches ? evt.targetTouches[evt.targetTouches.length -1].clientY : evt.y;
  }

  stop = (evt) => {
    this.mousedown = false;
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
    setTimeout(() => {
      if (!this.yDown) {
        return;
      }

      var yUp;
      if (e.targetTouches) {
        yUp = e.targetTouches[e.targetTouches.length -1].clientY;
        this.yDiff = this.yDown - yUp;
      } else {
        yUp = e.y;
        this.yDiff = yUp - this.yDown;
      }
      if (this.mousedown && Math.abs(this.yDiff)) { // Most significant.
        if (this.yDiff > 0) {
          this.onUp(e);
        } else {
          this.onDown(e);
        }
      }

      // Reset values.
      this.yDown = null;
    }, 50);
  }

  run() {
    this.element.addEventListener('touchmove', this.handleTouchMove);
    this.element.addEventListener('mousemove', this.handleTouchMove);
  }

  destroy() {
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('mousemove', this.handleTouchMove);
    this.element.removeEventListener('touchstart', this.start);
    this.element.removeEventListener('mousedown', this.start);
    this.element.removeEventListener('touchend', this.stop);
    this.element.removeEventListener('mouseup', this.stop);
  }
}