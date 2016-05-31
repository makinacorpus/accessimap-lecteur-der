// var Hammer = require('hammerjs');
var _ = require('lodash');

var pressTimer,
  lastPos;

var Speaker = {

  // setEventsListener: function() {
  //   var mc = new Hammer.Manager(document.body);
  //
  //   mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 20 }) );
  //
  //   mc.on('panmove', this.handlePan);
  //
  // },
  setEventsListener: function(container) {
    this.container = document.body;

    this.container.addEventListener('mousemove', _.throttle(Speaker.handlePan, 200));
    this.container.addEventListener('touchmove', _.throttle(Speaker.handlePan, 200));
    this.voice = 'off';
  },

  handlePan: function(event) {
    var touch = event.touches ? event.touches.item(0) : event;
    var element = document.elementFromPoint(touch.clientX, touch.clientY);

    if ((element.tagName == 'H2' || element.tagName == 'BUTTON' || element.tagName === 'A')
    && element.innerText && Speaker.voice === 'off') {
      console.log(element);
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
