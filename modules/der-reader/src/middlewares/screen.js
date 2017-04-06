import { LOCATION_CHANGE } from 'react-router-redux';
import {
  SET_OPTION,
  INIT_CONFIG
} from '../store/actions';
import {
  defaultState
} from '../store/reducers';

let Reader = null;

/**
 * Middleware for resize application container to fit with DER.
 */
export const screenCalibrate = () => next => action => {
  switch (action.type) {
  case SET_OPTION:
    if (action.name === 'format') {
      document.getElementById('der-reader').className = action.value;
    }

    if (action.name === 'dpi') {
      document.body.style.fontSize = action.value + 'px';
    }

    if (action.name === 'tts') {
      Reader = action.value;
    }
    break;
  case INIT_CONFIG:
    var { format, dpi } = action.value;
    document.getElementById('der-reader').className = format ? format : action.default.format;
    document.body.style.fontSize = dpi ? dpi + 'px' : defaultState.config.dpi + 'px';
    break;
  default:
    break;
  }
  next(action);
};

/**
 * Middleware for resize application container to fit with DER.
 */
export const screenReader = () => next => action => {
  if (action.type === LOCATION_CHANGE && Reader) {
    switch (action.payload.pathname) {
    case 'menu':
      Reader.speak('Ouverture du menu');
      break;
    case 'filters':
      Reader.speak('Ouverture des filtres');
      break;
    default:
      break;
    }
  }
  next(action);
};