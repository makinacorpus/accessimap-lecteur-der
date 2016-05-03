function webspeechapi(text) {
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

module.exports = webspeechapi;
