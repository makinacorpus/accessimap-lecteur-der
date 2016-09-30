'use strict';

// Dev
var webspeechapi = require('./../modules/tts.webapi/tts.webapi.js');
var vibrateWebApi = require('./../modules/vibrate.webapi/vibrate.webapi.js');
var DerReader = require('./../modules/der-reader/der-reader.js');

// Bundle
// var webspeechapi = require('tts.webapi');
// var vibrateWebApi = require('vibrate.webapi');
// var DerReader = require('der-reader');

DerReader.init({
  container: 'der-reader',
  derFile: './der/Londres.zip',
  tts: webspeechapi,
  vibrate: vibrateWebApi,
  defaultMode: 'explore'
});
