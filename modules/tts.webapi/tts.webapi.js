const voices = speechSynthesis.getVoices();

const webspeechapi = {
  utterance: null,

  initUtterance: function(text) {
    let utterance = new SpeechSynthesisUtterance();
    utterance.voice = voices[0]; // Note: some voices don't support altering params
    utterance.voiceURI = 'native';
    utterance.volume = 1; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.lang = 'fr';
    utterance.text = text;


    return utterance;
  },

  speak: function(text) {

    speechSynthesis.cancel();

    return new Promise((resolve, reject) => {
        this.utterance = this.initUtterance(text);
        speechSynthesis.speak(this.utterance);

        this.utterance.onend = () => {
            resolve();
        };
    });
    
  }
};

module.exports = webspeechapi;
