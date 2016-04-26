// get a reference to an element
var stage = document.getElementById('zone');
var eventText = document.getElementById('event');

// create a manager for that element
var hammer = new Hammer.Manager(stage, {});

// create a recognizer
var Rotate = new Hammer.Rotate();
var Pinch = new Hammer.Pinch();
var Press = new Hammer.Press();
var Swipe = new Hammer.Swipe();

var singleTap = new Hammer.Tap({ event: 'tap' });
var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
var tripleTap = new Hammer.Tap({event: 'tripletap', taps: 3 });

hammer.add([Rotate, Pinch, Press, Swipe, tripleTap, doubleTap, singleTap]);

tripleTap.recognizeWith([doubleTap, singleTap]);
doubleTap.recognizeWith(singleTap);

doubleTap.requireFailure(tripleTap);
singleTap.requireFailure([tripleTap, doubleTap]);

hammer.on('rotate pinch press swipe tripletap doubletap tap', function(e) {
    showEvent(e);
});

function showEvent(event) {
    console.log(event);

    var textToSpeech = event.type;

    setTimeout(function() {
        eventText.innerHTML = textToSpeech;
        nativeSpeak(textToSpeech);
    }, 350);
}


function nativeSpeak(text) {
    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    msg.voice = voices[0]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = text;
    msg.lang = 'fr';
    speechSynthesis.speak(msg);
}
