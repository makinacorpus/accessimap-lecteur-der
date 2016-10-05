const voices = speechSynthesis.getVoices();
const utterance = new SpeechSynthesisUtterance();

const webspeechapi = {
  initUtterance: function(text) {
    utterance.voice = voices[0]; // Note: some voices don't support altering params
    utterance.voiceURI = 'native';
    utterance.volume = 1; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.lang = 'fr';
    utterance.text = text;
    this.utterance = utterance;
    // utterance.onend = () => {
    //   delete this.utterance;
    // };

    return utterance;
  },

  speak: function(text) {
    speechSynthesis.cancel();
    delete this.utterance;

    this.utterance = this.initUtterance(text);
    console.log(text, this.utterance);
    speechSynthesis.speak(utterance);
  }
};

module.exports = webspeechapi;
