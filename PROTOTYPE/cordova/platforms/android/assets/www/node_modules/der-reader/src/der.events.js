var Hammer = require('hammerjs');

var TouchEvents = {
    init: function(element, data) {
        var hammer = new Hammer.Manager(element, {});
        initTouchEventsListeners(hammer);

        hammer.on('swipe triple_tap double_tap tap', function(e) {
            speechPOIActions(element, data, e.type);
        });
    }
};

function initTouchEventsListeners(hammer) {
    var singleTap = new Hammer.Tap({ event: 'tap' });
    var doubleTap = new Hammer.Tap({event: 'double_tap', taps: 2 });
    var tripleTap = new Hammer.Tap({event: 'triple_tap', taps: 3 });

    hammer.add([tripleTap, doubleTap, singleTap]);
    tripleTap.recognizeWith([doubleTap, singleTap]);
    doubleTap.recognizeWith(singleTap);

    doubleTap.requireFailure(tripleTap);
    singleTap.requireFailure([tripleTap, doubleTap]);
}

function speechPOIActions(element, data, type) {
    element.style.fill = 'red';

    for (var i = 1; i < data.actions.length; i++) {
        if (type === data.actions[i].gesture) {
            console.log(data.actions[i].value);
            nativeSpeak(data.actions[i].value).then(function() {
                element.style.fill = 'white';
            });
        }
    }
}

function nativeSpeak(text) {
    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    msg.voice = voices[0]; // Note: some voices don't support altering params
    // msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = text;
    msg.lang = 'fr';
    speechSynthesis.speak(msg);

    return new Promise(function(resolve) {
        msg.onend = function() {
            resolve();
        };
    });
}

module.exports = TouchEvents;
