// make sure your the code gets executed only after `deviceready`.
document.addEventListener('deviceready', function () {
    // or with more options
    window.TTS
        .speak({
            text: 'Bonjour je suis une voix TTS avec un plugin Cordova',
            locale: 'fr-FR',
            rate: 1
        }, function () {
            alert('success');
        }, function (reason) {
            alert(reason);
        });

    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    console.log(voices);

    function nativeSpeak() {
        console.log('nativeSpeak');
        var msg = new SpeechSynthesisUtterance();
        var voices = speechSynthesis.getVoices();
        msg.voice = voices[0]; // Note: some voices don't support altering params
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = 'Bonjour, je suis une voix native avec API HTML';
        msg.lang = 'fr';
        speechSynthesis.speak(msg);
    }

    var speakButton = document.getElementById('speak');
    speakButton.addEventListener('click', nativeSpeak);

}, false);
