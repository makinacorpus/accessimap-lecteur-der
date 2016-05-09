'use strict';

// Dev
var webspeechapi = require('../tts-webspeechapi/tts-webspeechapi.js');
var DerReader = require('../der-reader/der-reader.js');

// Bundle
// var webspeechapi = require('tts-webspeechapi');
// var DerReader = require('der-reader');

DerReader.init({
    derFile: './der/Londres.zip',
    tts: webspeechapi
});
