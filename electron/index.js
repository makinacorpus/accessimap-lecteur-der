'use strict';
const env = process.env.NODE_ENV !== 'prod' ? 'dev' : 'prod';

if (env === 'prod') {
  // Bundle
  var webspeechapi = require('tts.webapi');
  var vibrateWebApi = require('vibrate.webapi');
  var DerReader = require('der-reader');
} else {
  // Dev
  var webspeechapi = require('./../modules/tts.webapi/tts.webapi.js');
  var vibrateWebApi = require('./../modules/vibrate.webapi/vibrate.webapi.js');
  var DerReader = require('./../modules/der-reader/der-reader.js');
}

var remote = require('electron').remote;

window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;


function exit() {
  var window = remote.getCurrentWindow();
  window.close();
}

DerReader.init({
  container: 'der-reader',
  derFile: './der/Londres.zip',
  tts: webspeechapi,
  vibrate: vibrateWebApi,
  defaultMode: 0,
  exit: exit
});

window.app = {
  env: env
};