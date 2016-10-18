require('!style!css!sass!./der-reader.scss');

const Menu = require('./routes/Menu/Menu.js');
const SelectFile = require('./routes/Menu/SelectFile/SelectFile.js');
const SwitchMode = require('./routes/Menu/SwitchMode/SwitchMode.js');
const SelectDocument = require('./routes/Menu/SelectDocument/SelectDocument.js');
const FastClick = require('fastclick');
// const TouchEmulator = require('hammer-touchemulator');
const App = require('./routes/App');
const React = require('react');
const ReactDOM = require('react-dom');
import { Router, hashHistory } from 'react-router';
let config = null;

var DerReader = {
  /**
  * Initialise DER Reader
  * @param {Object} options
  * {
  *     container: {HTMLElement} required
  *     derFile: (zip file path) {string} required
  *     tts: {Function} required
  *     vibrate: {Function} required
  *     defaultMode: {string}
  *     exit: {Function} required
  * }
  */
  init: function(env_config) {
    config = env_config;
    FastClick.attach(document.body, {});
    // TouchEmulator();

    const routes = {
      path: '/',
      component: App,
      config: config,
      childRoutes: [
        {
          path: 'menu',
          component: Menu,
          name: 'Menu principal',
          childRoutes: [
            { path: 'file', component: SelectFile, name: 'Charger un nouveau document en relief (format zip)' },
            { path: 'doc', component: SelectDocument, name: 'Définir le document à visualiser' },
            { path: 'mode', component: SwitchMode, name: 'Changer le mode de lecture' },
            { path: 'quit', name: 'Quitter l\'application' }
          ]
        },
        {
          path: 'filters',
          component: Menu,
          name: 'Filtres',
          childRoutes: [
            { path: 'name', component: SelectFile, name: 'Filtre par nom' }
          ]
        }
      ]
    };

    ReactDOM.render(
      <Router routes={routes} history={hashHistory} />,
      document.getElementById(config.container)
    );
  }
};

module.exports = DerReader;
