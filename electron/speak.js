console.log('speak.js loaded');

document.getElementById('speak').addEventListener('click', testSpeak);

function testSpeak() {
  var msg = new SpeechSynthesisUtterance();
  var voices = speechSynthesis.getVoices();
  msg.voice = voices[10]; // Note: some voices don't support altering params
  msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 2; //0 to 2
  msg.text = 'Facebook C\'est du caca';
  msg.lang = 'fr-FR';

  console.log(speechSynthesis.getVoices());
  speechSynthesis.speak(msg);
}
