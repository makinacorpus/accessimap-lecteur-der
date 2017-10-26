// const voices = window.speechSynthesis.getVoices(),
//   frVoice = voices.filter((currentVoice) => currentVoice.lang === 'fr-FR')[0];

// ( ! frVoice ) && console.error('No voice detected !!! Speech synthesis will not work.');

// useful to customize this var
// on windows, seems 400ms a good time
// for allowing a user to double tap rapidly
// and speak correctly the last text
const TIMEOUT_FOR_SPEAKING = 500;

const webspeechapi = {
  utterance: null,
  intervalId: null,
  textToSpeech: '',
  lastText: '',

  initUtterance: function(text, callback) {
    let utterance = new SpeechSynthesisUtterance();
    // utterance.voice = frVoice; // Note: some voices don't support altering params
    utterance.voiceURI = 'native';
    utterance.volume = 1; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.lang = 'fr';
    utterance.text = text;
    if (callback) {
      utterance.onend = () => {
        // console.log(`onend ${text}`)
        callback();
      };
    }
    return utterance;
  },

  cancel: function() {
    // console.log('cancel', this.lastText)
    // first we clear interval that normally speak
    if (this.intervalId) window.clearInterval(this.intervalId);
    // then we cancel the window.speechSynthesis
    window.speechSynthesis.cancel();
  },

  speak: function(text, callback) {
    this.textToSpeech = text;
    // console.log(`tts.webapi > speak ${text}`)
    this.cancel();
    // we set a timeout to make work cancel/speak 
    // in electron+chromium, tts doesn't work when we 'swipe' quickly
    // see https://github.com/makinacorpus/accessimap-lecteur-der/issues/21
    // we set to 150ms the timeout before speaking
    this.intervalId = window.setTimeout(() => {
      // console.log(`tts.webapi > speak setTimeout ok ${this.textToSpeech}`)
      window.speechSynthesis.speak(this.initUtterance(this.textToSpeech, callback));
    }, TIMEOUT_FOR_SPEAKING);
  }
};

module.exports = webspeechapi;
