function cordovaTTS(text) {
    return new Promise(function(resolve) {
        window.TTS
        .speak({
            text: text,
            locale: 'fr-FR',
            rate: 1
        }, function() {
            resolve();
        });
    });
}
module.exports = cordovaTTS;
