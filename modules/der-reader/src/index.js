'use strict'

var webspeechapi, vibrateWebApi, DerReader

webspeechapi = require('./../../tts.webapi/tts.webapi.js')
vibrateWebApi = require('./../../vibrate.webapi/vibrate.webapi.js')
DerReader = require('./der-reader.js')


DerReader.init({
  container: 'der-reader',
  derFile: './Android.zip',
  tts: webspeechapi,
  vibrate: vibrateWebApi,
  defaultMode: 0,
  format: 'A4',
  exit: function () {}
})

// Touch Point cache
var tpCache = new Array();


function start_handler(ev) {
  // If the user makes simultaneious touches, the browser will fire a 
  // separate touchstart event for each touch point. Thus if there are 
  // three simultaneous touches, the first touchstart event will have 
  // targetTouches length of one, the second event will have a length 
  // of two, and so on.
  // ev.preventDefault();
  // Cache the touch points for later processing of 2-touch pinch/zoom
  if (ev.targetTouches.length == 2) {
    for (var i = 0; i < ev.targetTouches.length; i++) {
      tpCache.push(ev.targetTouches[i]);
    }
  }
  // if (logEvents) log("touchStart", ev, true);
  // update_background(ev);
}

function move_handler(ev) {
  ev.preventDefault();
  // Check this event for 2-touch Move/Pinch/Zoom gesture
  // handle_pinch_zoom(ev);
}


function end_handler(ev) {
  ev.preventDefault();
  // if (logEvents) log(ev.type, ev, false);
  if (ev.targetTouches.length == 0) {
    // aRestore background and border to original values
    ev.target.style.background = 'white';
    ev.target.style.border = '1px solid black';
  }
}

const el = document.getElementById('der-reader');

// el.ontouchstart = start_handler;
el.ontouchmove = move_handler;
// Use same handler for touchcancel and touchend
el.ontouchcancel = end_handler;
// el.ontouchend = end_handler;