// make sure your the code gets executed only after `deviceready`.
document.addEventListener('deviceready', function () {
    // basic usage
    window.TTS
        .speak('hello, world!', function () {
            alert('success');
        }, function (reason) {
            alert(reason);
        });

    // or with more options
    window.TTS
        .speak({
            text: 'hello, world!',
            locale: 'en-GB',
            rate: 0.75
        }, function () {
            alert('success');
        }, function (reason) {
            alert(reason);
        });
}, false);
