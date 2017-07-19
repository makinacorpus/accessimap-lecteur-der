'use strict'

var webspeechapi, vibrateWebApi, DerReader

webspeechapi = require('./../../tts.webapi/tts.webapi.js')
vibrateWebApi = require('./../../vibrate.webapi/vibrate.webapi.js')
DerReader = require('./der-reader.js')


DerReader.init({
  container: 'der-reader',
  derFile: './Android.zip',
  tts: webspeechapi,
  vibrate: vibrateWebApi,
  defaultMode: 0,
  format: 'A4',
  exit: function () {}
})

function move_handler(ev) {
  ev.preventDefault();
}

const el = document.getElementById('der-reader');
el.ontouchmove = move_handler;
