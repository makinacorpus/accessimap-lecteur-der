import {
  SET_OPTION,
  INIT_CONFIG
} from '../store/actions';
import {
  defaultState
} from '../store/reducers';

/**
 * Middleware for resize application container to fit with DER.
 */
const screenCalibrate = () => next => action => {
  switch (action.type) {
  case SET_OPTION:
    if (action.name === 'format') {
      document.getElementById('der-reader').className = action.value;
    }

    if (action.name === 'dpi') {
      document.body.style.fontSize = action.value + 'px';
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

export default screenCalibrate;