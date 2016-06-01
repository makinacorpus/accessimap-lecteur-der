const _ = require('lodash');

let mouseDown = false;

var ScreenReader = {
  init: function(tts, vibrate) {
    this.tts = tts;
    this.vibrate = vibrate;
    this.setEventsListener();
  },

  setEventsListener: function() {
    this.container = document.body;

    this.container.addEventListener('mousedown', e => this.initSpeak(e));
    this.container.addEventListener('touchstart', e => this.initSpeak(e));

    this.container.addEventListener('mouseup', e => this._disableMouseHandler(e));
    this.container.addEventListener('touchend', e => this._disableMouseHandler(e));

    this.container.addEventListener('mousemove', _.throttle(e => this.handlePan(e), 400));
    this.container.addEventListener('touchmove', _.throttle(e => this.handlePan(e), 400));

  },

  initSpeak: function() {
    mouseDown = true;
  },

  _disableMouseHandler: function() {
    mouseDown = false;
  },

  handlePan: function(event) {
    if (!mouseDown) {
      return;
    }

    const touch = event.touches ? event.touches.item(0) : event;
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if ((element.tagName == 'H2' || element.tagName == 'BUTTON' || element.tagName === 'A')
    && element.innerText) {
      this.tts.speak(element.innerText, this.vibrate(0));
    }
  }
};

module.exports = ScreenReader;
