console.log('speak.js loaded');

document.getElementById('speak').addEventListener('click', nativeSpeak);
document.getElementById('speak-js').addEventListener('click', jsSpeak);

function nativeSpeak() {
    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = 'Bonjour, je suis une voix installée en natif sur le système';
    msg.lang = 'fr';

    console.log(speechSynthesis.getVoices());
    speechSynthesis.speak(msg);
}


function jsSpeak() {
    speak('Bonjour, je suis une voix embarquée en javascript');
}
