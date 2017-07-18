'use strict'

var webspeechapi, vibrateWebApi, DerReader

webspeechapi = require('./../../tts.webapi/tts.webapi.js')
vibrateWebApi = require('./../../vibrate.webapi/vibrate.webapi.js')
DerReader = require('./der-reader.js')

DerReader.init({
  container: 'der-reader',
  derFile: null,
  tts: webspeechapi,
  vibrate: vibrateWebApi,
  defaultMode: 0,
  format: 'A4',
  exit: function () {}
})

// Touch Point cache
var tpCache = new Array();

// This is a very basic 2-touch move/pinch/zoom handler that does not include
// error handling, only handles horizontal moves, etc.
function handle_pinch_zoom(ev) {
  if (ev.targetTouches.length == 2 && ev.changedTouches.length == 2) {
    // Check if the two target touches are the same ones that started
    // the 2-touch
    var point1 = -1,
      point2 = -1;
    for (var i = 0; i < tpCache.length; i++) {
      if (tpCache[i].identifier == ev.targetTouches[0].identifier) point1 = i;
      if (tpCache[i].identifier == ev.targetTouches[1].identifier) point2 = i;
    }
    if (point1 >= 0 && point2 >= 0) {
      // Calculate the difference between the start and move coordinates
      var diff1 = Math.abs(tpCache[point1].clientX - ev.targetTouches[0].clientX);
      var diff2 = Math.abs(tpCache[point2].clientX - ev.targetTouches[1].clientX);
      // This threshold is device dependent as well as application specific
      var PINCH_THRESHHOLD = ev.target.clientWidth / 10;
      if (diff1 >= PINCH_THRESHHOLD && diff2 >= PINCH_THRESHHOLD)
        ev.target.style.background = 'green';
    } else {
      // empty tpCache
      tpCache = new Array();
    }
  }
}


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
  // Note: if the user makes more than one "simultaneous" touches, most browsers 
  // fire at least one touchmove event and some will fire several touchmoves.
  // Consequently, an application might want to "ignore" some touchmoves.
  //
  // This function sets the target element's border to "dashed" to visualy
  // indicate the target received a move event.
  //
  ev.preventDefault();
  // if (logEvents) log("touchMove", ev, false);
  // To avoid too much color flashing many touchmove events are started,
  // don't update the background if two touch points are active
  if (!(ev.touches.length == 2 && ev.targetTouches.length == 2))
    // update_background(ev);
    // Set the target element's border to dashed to give a clear visual
    // indication the element received a move event.
    ev.target.style.border = 'dashed';
  // Check this event for 2-touch Move/Pinch/Zoom gesture
  handle_pinch_zoom(ev);
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

el.ontouchstart = start_handler;
el.ontouchmove = move_handler;
// Use same handler for touchcancel and touchend
el.ontouchcancel = end_handler;
el.ontouchend = end_handler;