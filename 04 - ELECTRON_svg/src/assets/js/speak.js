// Load DER SVG
// -------------------------------------
// get a reference to an element
var der = document.getElementById('der');
var eventText = document.getElementById('event');

var xhr = new XMLHttpRequest();
xhr.open('GET', './assets/der/carte_avec_source.svg',false);
// Following line is just to be on the safe side;
// not needed if your server delivers SVG with correct MIME type
xhr.overrideMimeType('image/svg+xml');
xhr.send('');
der.appendChild(xhr.responseXML.documentElement);


// Get JSON instructions
xhr.open('GET', './assets/der/interactions.json',false);
xhr.send('');
var POIS = JSON.parse(xhr.response).pois;


function initTouchEventsListeners(poi, hammer) {


    var singleTap = new Hammer.Tap({ event: 'tap' });
    var doubleTap = new Hammer.Tap({event: 'double_tap', taps: 2 });
    var tripleTap = new Hammer.Tap({event: 'triple_tap', taps: 3 });

    hammer.add([tripleTap, doubleTap, singleTap]);
    tripleTap.recognizeWith([doubleTap, singleTap]);
    doubleTap.recognizeWith(singleTap);

    doubleTap.requireFailure(tripleTap);
    singleTap.requireFailure([tripleTap, doubleTap]);

    hammer.on('swipe triple_tap double_tap tap', function(e) {
        showEvent(e);
        speechPOIActions(poi, e.type);
    });
}

function speechPOIActions(poi, type) {
    var poiEl = document.getElementById(poi.id);
    poiEl.style.fill = 'red';

    for (var i = 1; i < poi.actions.length; i++) {
        if (type === poi.actions[i].gesture) {
            nativeSpeak(poi.actions[i].value).then(function() {
                poiEl.style.fill = 'white';
            });
        }
    }
}

function showEvent(event) {
    var textToSpeech = event.type;
    eventText.innerHTML = textToSpeech;
}

POIS.map(function(poi, key) {
    var poiEl = document.getElementById(poi.id);
    if (poiEl !== null) {
        var hammer = new Hammer.Manager(poiEl, {});
        initTouchEventsListeners(poi, hammer);
    }
});

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

    return new Promise(function(resolve) {
        msg.onend = function() {
            resolve();
        };
    });
}
