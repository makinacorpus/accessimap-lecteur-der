var cordovaTTS = {
  initUtterance: function() {
    const utterance = {};
    utterance.locale = 'fr-FR';
    utterance.rate = 1;

    return utterance;
  },

  speak: function(text, pendingFunction) {
    this.utterance = this.utterance || this.initUtterance();

    return new Promise(function(resolve, reject) {
      if (text !== this.utterance.text) {
        this.utterance.text = text;
        pendingFunction;
        var _this = this;

        window.TTS.speak(_this.utterance, function() {
          resolve();
        });
      } else {
        reject();
      }
    });
  }
};
