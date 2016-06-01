const voices = speechSynthesis.getVoices();

const webspeechapi = {
  initUtterance: function() {
    const utterance = new SpeechSynthesisUtterance();
    utterance.voice = voices[0]; // Note: some voices don't support altering params
    // utterance.voiceURI = 'native';
    utterance.volume = 1; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.lang = 'fr';
    return utterance;
  },

  speak: function(text, pendingFunction) {
    this.utterance = this.utterance || this.initUtterance();

    return new Promise((resolve, reject) => {
      if (text !== this.utterance.text) {
        speechSynthesis.cancel();
        pendingFunction;
        this.utterance.text = text;
        this.utterance.onend = function() {
          this.text = '';
          resolve();
        };
        speechSynthesis.speak(this.utterance);
      } else {
        reject();
      }
    });
  }
};

module.exports = webspeechapi;
