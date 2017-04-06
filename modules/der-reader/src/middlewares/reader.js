// import {
//   SET_OPTION,
//   INIT_CONFIG
// } from '../store/actions';
// import {
//   defaultState
// } from '../store/reducers';

/**
 * Middleware for resize application container to fit with DER.
 */
const reader = state => next => action => {
  console.log(action)
  if (action.type === '@@router/LOCATION_CHANGE') {
    switch (action.payload.pathname) {
    case '/menu':
      console.log('MENUUUU', state.appReducer)
      if (state.appReducer && state.appReducer.config.tts) {
        console.log('oo')
        state.appReducer.config.tts.speak('une voie qui annonce le menu')
      }
      break;
    default:
      break;
    }

  }
  next(action);
};

export default reader;