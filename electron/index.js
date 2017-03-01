'use strict';

var webspeechapi, vibrateWebApi, DerReader;

try {
  webspeechapi = require('./../modules/tts.webapi/tts.webapi.js');
  vibrateWebApi = require('./../modules/vibrate.webapi/vibrate.webapi.js');
  DerReader = require('./../modules/der-reader/der-reader.js');
} catch(e) {
  webspeechapi = require('tts.webapi');
  vibrateWebApi = require('vibrate.webapi');
  DerReader = require('der-reader');
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
  env: env,
  version: process.env.npm_package_version
};