console.log('speak.js loaded');

document.getElementById('speak').addEventListener('click', nativeSpeak);

function nativeSpeak() {
    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();

    // msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = 'Bonjour, je suis une voix Google';
    msg.lang = 'fr';

    speechSynthesis.speak(msg);
}
