var Hammer = require('hammerjs');

var TouchEvents = {

    /**
	 * add event listener to DER elements
	 * @param {HTMLElement} element
	 * @param {Object} actions
	 * @param {Function} tts
	 */
    init: function(element, actions, tts) {
        var hammer = new Hammer.Manager(element, {});
        this._addTouchEventsListeners(hammer);

        hammer.on('swipe triple_tap double_tap tap', function(e) {
            element.style.fill = 'red';
            var textToSpeech = TouchEvents._getGestureValue(actions, e.type);
            tts(textToSpeech).then(function() {
                element.style.fill = 'white';
            });
        });
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


    _getGestureValue: function(actions, type) {
        for (var i = 1; i < actions.length; i++) {
            if (type === actions[i].gesture) {
                return actions[i].value;
            }
        }
        return;
    }
};

module.exports = TouchEvents;
