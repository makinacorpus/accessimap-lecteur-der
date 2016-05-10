window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext(), currentOsc;

var DerSounds = {
    play: function(distance, direction, size, callback) {
        var o = ctx.createOscillator();
        o.type = direction === 'x' ? 'sine' : 'square';
        o.frequency.value = this._getNote(distance, size);
        o.start(0);
        o.connect(ctx.destination);
        currentOsc = o;

        setTimeout(function() {
            DerSounds.stop();
            if (callback) {
                callback();
            }
        }, 200);
        return;
    },

    stop: function(){
        currentOsc.stop(0);
    },

    _getNote: function(distance, size) {
        var note = Math.round(distance / (size/2) * notes.length);
        note = notes.slice(-Math.abs(note)-1, -Math.abs(note));
        return note;
    }

};

module.exports = DerSounds;

var notes = [
    16.35,
    17.32,
    17.32,
    18.35,
    19.45,
    19.45,
    20.60,
    21.83,
    23.12,
    23.12,
    24.50,
    25.96,
    25.96,
    27.50,
    29.14,
    29.14,
    30.87,
    32.70,
    34.65,
    34.65,
    36.71,
    38.89,
    38.89,
    41.20,
    43.65,
    46.25,
    46.25,
    49.00,
    51.91,
    51.91,
    55.00,
    58.27,
    58.27,
    61.74,
    65.41,
    69.30,
    69.30,
    73.42,
    77.78,
    77.78,
    82.41,
    87.31,
    92.50,
    92.50,
    98.00,
    103.83,
    103.83,
    110.00,
    116.54,
    116.54,
    123.47,
    130.81,
    138.59,
    138.59,
    146.83,
    155.56,
    155.56,
    164.81,
    174.61,
    185.00,
    185.00,
    196.00,
    207.65,
    207.65,
    220.00,
    233.08,
    233.08,
    246.94,
    261.63,
    277.18,
    277.18,
    293.66,
    311.13,
    311.13,
    329.63,
    349.23,
    369.99,
    369.99,
    392.00,
    415.30,
    415.30,
    440.00,
    466.16,
    466.16,
    493.88,
    523.25,
    554.37,
    554.37,
    587.33,
    622.25,
    622.25,
    659.26,
    698.46,
    739.99,
    739.99,
    783.99,
    830.61,
    830.61,
    880.00,
    932.33,
    932.33,
    987.77,
    1046.50,
    1108.73,
    1108.73,
    1174.66,
    1244.51,
    1244.51,
    1318.51,
    1396.91,
    1479.98,
    1479.98,
    1567.98,
    1661.22,
    1661.22,
    1760.00,
    1864.66,
    1864.66,
    1975.53,
    2093.00,
    2217.46,
    2217.46,
    2349.32,
    2489.02,
    2489.02,
    2637.02,
    2793.83,
    2959.96,
    2959.96,
    3135.96,
    3322.44,
    3322.44,
    3520.00,
    3729.31,
    3729.31,
    3951.07,
    4186.01
];
