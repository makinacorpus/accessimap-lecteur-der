/**
 * Middleware for resize application container to fit with DER.
 * 
 * @param {Object} timer - Options for action timer
 * @param {Number} timer.duration - Duration for setTimeout
 * @param {Object} timer.action - Action to dispatch after timeout
 */
const screenCalibrate = state => next => action => {
    if (action.type === 'SET_OPTION_FORMAT') {
        document.getElementById('der-reader').className = action.format;
    }
    if (action.type === 'SET_OPTION_DPI') {
        document.body.style.fontSize = action.dpi + 'px';        
    }
    next(action);
};

export default screenCalibrate;