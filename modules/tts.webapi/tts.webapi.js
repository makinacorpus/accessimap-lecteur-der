const voices = speechSynthesis.getVoices(),
  frVoice = voices.filter((currentVoice) => currentVoice.lang === 'fr-FR')[0];

( ! frVoice ) && console.error('No voice detected !!! Speech synthesis will not work.');

const webspeechapi = {
  utterance: null,
  intervalId: null,

  initUtterance: function(text) {
    let utterance = new SpeechSynthesisUtterance();
    utterance.voice = frVoice; // Note: some voices don't support altering params
    utterance.voiceURI = 'native';
    utterance.volume = 1; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.lang = 'fr';
    utterance.text = text;


    return utterance;
  },

  cancel: function() {
    if (this.promise) {
      console.log(this.promise)
      this.promise.resolve();
    }
    speechSynthesis.cancel();
    if (this.intervalId) window.clearInterval(this.intervalId);
  },

  speak: function(text) {
    this.cancel();
    return new Promise((resolve, reject) => {
      // we set a timeout to make work cancel/speak 
      // in electron+chromium, tts doesn't work when we 'swipe' quickly
      // see https://github.com/makinacorpus/accessimap-lecteur-der/issues/21
      // we set to 150ms the timeout before speaking
      this.intervalId = window.setTimeout(() => {
        this.utterance = this.initUtterance(text);
        speechSynthesis.speak(this.utterance);
        this.utterance.onend = () => {
          resolve();
        };
        this.utterance.onpause = () => {
          resolve();
        };
        this.utterance.onresume = () => {
          resolve();
        };
      }, 150);
    });
  }
};

module.exports = webspeechapi;
