var Hammer = require('hammerjs');
var DerSounds = require('./der.sounds');

var TouchEvents = {

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

    setSearchEvents: function(element, container) {
        var boundingBox = element.getBoundingClientRect(),
            horizontalRange = {min: boundingBox.left, max: boundingBox.right},
            verticalRange = {min: boundingBox.top, max: boundingBox.bottom};

        var zone = {width: container.clientWidth, height: container.clientWidth};
        var hammer = new Hammer.Manager(container, {});
        var pan = new Hammer.Pan({ event: 'pan'});
        hammer.add(pan);

        function getDistanceNumber(number, min, max) {
            return Math.abs(Math.min(Math.round(number - min), Math.round(max - number)));
        }

        var sounds = false;
        hammer.on('panleft panright', function(e) {
            if (!sounds) {
                sounds = true;
                var distance = getDistanceNumber(e.center.x, horizontalRange.min, horizontalRange.max);

                DerSounds.play(distance, 'x', zone.width, function() {
                    sounds = false;
                });
            }
        });

        hammer.on('panup pandown', function(e) {
            if (!sounds) {
                sounds = true;
                var distance = getDistanceNumber(e.center.y, verticalRange.min, verticalRange.max);

                DerSounds.play(distance, 'y', zone.height, function() {
                    sounds = false;
                });
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

module.exports = TouchEvents;
