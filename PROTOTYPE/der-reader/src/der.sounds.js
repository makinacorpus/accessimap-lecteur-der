window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext(), currentOsc;

var DerSounds = {
    play: function(index) {
        console.log(index);
        this.stop();
        var o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = notes[index];
        o.start(0);
        o.connect(ctx.destination);
        currentOsc = o;
        // console.log(o.frequency.value);
        setTimeout(function() {
            DerSounds.stop();
        }, 100);
        return;
    },

    stop: function(){
        if (currentOsc) {
            currentOsc.stop(0);
        }
    },

    getNotesLength: function() {
        return notes.length;
    }
};

module.exports = DerSounds;

var notes = [
    261.63, // 'C4'
    293.66, // 'D4'
    329.63, // 'E4'
    349.23, // 'F4'
    392.00, // 'G4'
    440.00, // 'A4'
    493.88, // 'B4'
    523.25 // 'C5'
];
