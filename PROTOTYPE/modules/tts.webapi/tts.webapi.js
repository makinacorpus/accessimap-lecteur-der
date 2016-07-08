const voices = speechSynthesis.getVoices();

const webspeechapi = {
  initUtterance: function(text) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.voice = voices[0]; // Note: some voices don't support altering params
    // utterance.voiceURI = 'native';
    utterance.volume = 1; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.lang = 'fr';
    utterance.text = text;
    this.utterance = utterance;
    utterance.onend = () => {
      delete this.utterance;
    };

    speechSynthesis.speak(utterance);
    return utterance;
  },

  speak: function(text, pendingFunction) {
    if (!this.utterance) {
      this.utterance = this.initUtterance(text);
      pendingFunction;
    } else if (text !== this.utterance.text) {
      speechSynthesis.cancel();
      this.utterance = this.initUtterance(text);
      pendingFunction;
    }
  }
};

module.exports = webspeechapi;
