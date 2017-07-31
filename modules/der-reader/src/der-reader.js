require('!style!css!./der-reader.css')

import Menu from './routes/Menu/Menu.js'
import Filters from './routes/Filters/Filters.js'
import SelectFile from './routes/Menu/SelectFile/SelectFile'
import CalibrateMenu from './routes/Menu/Calibrate/CalibrateMenu'
import FastClick from 'fastclick'
import React from 'react'
import ReactDOM from 'react-dom'

import { combineReducers } from 'redux'
import App from './routes/App.container'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import appReducer from './store/reducers'
import { screenCalibrate } from './middlewares/screen'
import localstorage from './middlewares/localstorage'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import version from 'version'

document.addEventListener('contextmenu', event => event.preventDefault())
window.version = version

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const store = createStore(
  combineReducers({
    appReducer,
    routing: routerReducer
  }),
  composeEnhancers(applyMiddleware(
    localstorage, 
    screenCalibrate
  ))
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

let config = null

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
    config = env_config
    FastClick.attach(document.body, {})

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
                { format: 'A3', name: 'Format A3' },
                { format: 'A4', name: 'Format A4' },
                { format: 'A5', name: 'Format A5' },
                { format: 'format19x13', name: 'Format 19x13' },
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
    }

    if (config.derFile) {
      // routes.splice(2, 0, { path: 'doc', component: SelectDocument, name: 'Définir le document à visualiser' })
    }

    ReactDOM.render(
      <Provider store={store}>    
        <Router routes={routes} history={history} />
      </Provider>,
      document.getElementById(config.container)
    )
  }
}

module.exports = DerReader
