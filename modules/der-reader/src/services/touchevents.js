class touch {
  constructor() {
    this.mylatesttap;
  }

  getType() {
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

export const touchStartHandler = (ev, cb) => {
  if (ev.targetTouches.length == 2) {
    for (var i = 0; i < ev.targetTouches.length; i++) {
      tpCache.push(ev.targetTouches[i]);
    }
  }
  cb(ev)
}

export function move_handler(ev) {
  ev.preventDefault();
}