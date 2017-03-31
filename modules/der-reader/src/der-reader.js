require('!style!css!sass!./der-reader.scss');

const Menu = require('./routes/Menu/Menu.js');
const Filters = require('./routes/Filters/Filters.js');
const SelectFile = require('./routes/Menu/SelectFile/SelectFile.js');
const SwitchMode = require('./routes/Menu/SwitchMode/SwitchMode.js');
const CalibrateMenu = require('./routes/Menu/Calibrate/CalibrateMenu.js');
const SelectDocument = require('./routes/Menu/SelectDocument/SelectDocument.js');
const FastClick = require('fastclick');
// const TouchEmulator = require('hammer-touchemulator');
const React = require('react');
const ReactDOM = require('react-dom');

import { combineReducers } from 'redux';
import App from './routes/App.container';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';  
import { Router, Route, hashHistory } from 'react-router';
import appReducer from './store/reducers';

const store = createStore(
  combineReducers({appReducer}),
  // applyMiddleware(combineReducers({appReducer})),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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

    let routes = {
      path: '/',
      component: App,
      config,
      childRoutes: [
        {
          path: 'menu',
          component: Menu,
          name: 'Menu principal',
          childRoutes: [
            { path: 'menu', component: SelectFile, name: 'Charger un nouveau document en relief' },
            { 
              path: 'calibrate', 
              component: CalibrateMenu,
              name: 'Calibrer l\'écran',
              childRoutes: [
                { format: 'a3', name: 'Format A3' },
                { format: 'a4', name: 'Format A4' },
                { format: 'a5', name: 'Format A5' },
              ]
             },
            // { path: 'mode', component: SwitchMode, name: 'Changer le mode de lecture' },
            { path: 'quit', name: 'Quitter l\'application' }
          ]
        },
        {
          path: 'filters',
          component: Filters,
          name: 'Filtres'
        }
      ]
    };

    if (config.derFile) {
      routes.splice(2, 0, { path: 'doc', component: SelectDocument, name: 'Définir le document à visualiser' });
    }

    ReactDOM.render(
      <Provider store={store}>    
        <Router routes={routes} history={hashHistory} />
      </Provider>,
      document.getElementById(config.container)
    );
  }
};

module.exports = DerReader;
