var Hammer = require('hammerjs');

var DerExplore = {

  /**
  * add event listener to DER elements
  * @param {HTMLElement} element
  * @param {Object} actions
  * @param {readAudioFile} tts
  * @param {Function} tts
  */
  setExploreEvents: function(element, actions, readAudioFile, tts) {
    var hammer = new Hammer.Manager(element, {});
    this._addTouchEventsListeners(hammer);

    hammer.on('swipe triple_tap double_tap tap', function(e) {
      var action = TouchEvents._getGestureAction(actions, e.type);

      if (action !== undefined) {

        TouchEvents._onEventStarted(element);

        if (action.protocol === 'mp3') {
          readAudioFile(action.value).then(function() {
            TouchEvents._onEventEnded(element);
          });
        }

        if (action.protocol === 'tts') {
          tts(action.value).then(function() {
            TouchEvents._onEventEnded(element);
          });
        }
      }
    });
  },

  _onEventStarted: function(element) {
    this.initialColor = element.style.fill;
    element.style.fill = 'red';
  },

  _onEventEnded: function(element) {
    element.style.fill = this.initialColor;
  },

  _addTouchEventsListeners: function(hammer) {
    var singleTap = new Hammer.Tap({ event: 'tap' });
    var doubleTap = new Hammer.Tap({event: 'double_tap', taps: 2 });
    var tripleTap = new Hammer.Tap({event: 'triple_tap', taps: 3 });

    hammer.add([tripleTap, doubleTap, singleTap]);
    tripleTap.recognizeWith([doubleTap, singleTap]);
    doubleTap.recognizeWith(singleTap);

    doubleTap.requireFailure(tripleTap);
    singleTap.requireFailure([tripleTap, doubleTap]);
  },


  _getGestureAction: function(actions, type) {
    if (actions.length === undefined) {
      return actions;
    } else {
      for (var i = 0; i < actions.length; i++) {
        if (type === actions[i].gesture && actions[i].protocol !== undefined) {
          return actions[i];
        }
      }
    }
    return;
  }
};

module.exports = DerExplore;
