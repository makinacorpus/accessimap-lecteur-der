// var Hammer = require('hammerjs');
var _ = require('lodash');

var mouseDown = false;

var Speaker = {
  setEventsListener: function() {
    this.container = document.body;


    this.container.addEventListener('mousedown', Speaker.initSpeak);
    this.container.addEventListener('touchstart', Speaker.initSpeak);

    this.container.addEventListener('mouseup', Speaker._disableMouseHandler);
    this.container.addEventListener('touchend', Speaker._disableMouseHandler);

    this.container.addEventListener('mousemove', _.throttle(Speaker.handlePan, 200));
    this.container.addEventListener('touchmove', _.throttle(Speaker.handlePan, 200));

    this.voice = 'off';
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

    var touch = event.touches ? event.touches.item(0) : event;
    var element = document.elementFromPoint(touch.clientX, touch.clientY);

    if ((element.tagName == 'H2' || element.tagName == 'BUTTON' || element.tagName === 'A')
    && element.innerText && Speaker.voice === 'off') {
      Speaker.voice = 'on';
      Speaker.tts(element.innerText).then(function() {
        Speaker.voice = 'off';
      });
    }
  },

  setTTS: function(tts) {
    Speaker.tts = tts;
  }
};

module.exports = Speaker;
