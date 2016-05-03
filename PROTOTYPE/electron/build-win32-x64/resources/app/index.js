'use strict';

// Dev
// var webspeechapi = require('../tts-webspeechapi/tts-webspeechapi.js');
// var DerReader = require('../der-reader/src/der-reader.js');

// Bundle
var webspeechapi = require('tts-webspeechapi');
var DerReader = require('der-reader');

DerReader.init({
    der: {
        svgFile: './der/carte_avec_source.svg',
        jsonFile: './der/interactions.json'
    },
    tts: webspeechapi
});
