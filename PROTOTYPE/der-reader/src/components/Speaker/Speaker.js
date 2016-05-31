var Hammer = require('hammerjs');

var Speaker = {

  setEventsListener: function() {
    var mc = new Hammer.Manager(document.body);

    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 20 }) );

    mc.on('pan', this.handlePan);

    this.voice = 'off';
  },

  handlePan: function(event) {
    var element = event.srcElement || event.target;
    console.log(element.tagName);
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
