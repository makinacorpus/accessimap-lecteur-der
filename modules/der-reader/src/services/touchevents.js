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