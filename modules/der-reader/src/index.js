import initOpbeat from 'opbeat-react';
import React from 'react';

initOpbeat({
  orgId: '48eaafd23a8a462184cf7903765ea4a3',
  appId: 'b73624b852'
});

var webspeechapi, vibrateWebApi, DerReader

webspeechapi = require('./../../tts.webapi/tts.webapi.js')
vibrateWebApi = require('./../../vibrate.webapi/vibrate.webapi.js')
DerReader = require('./der-reader.js')


DerReader.init({
  container: 'der-reader',
  derFile: null,
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
el.addEventListener("touchmove", move_handler, { passive: false });
