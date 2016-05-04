'use strict';

// Dev
var webspeechapi = require('../tts-webspeechapi/tts-webspeechapi.js');
var DerReader = require('../der-reader/der-reader.js');

// Bundle
// var webspeechapi = require('tts-webspeechapi');
// var DerReader = require('der-reader');

DerReader.init({
    der: {
        svg: {src: './der/carte_avec_source.svg', type: 'path'},
        json: {src: './der/interactions.json', type: 'path'}
    },
    tts: webspeechapi
});
