/**
 * Middleware for resize application container to fit with DER.
 */
const reader = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const state = store.getState()
    
    switch (action.payload.pathname) {
    case '/':
      if (state.appReducer && state.appReducer.config.tts) {
        const currentRoute = state.routing.locationBeforeTransitions.pathname.slice(1)
        let closeVoice = ''

        if (currentRoute === 'menu') {
          closeVoice = 'fermeture du menu'
        } 
        if (currentRoute === 'filters') {
          closeVoice = 'fermeture des filtres'
        }

        state.appReducer.config.tts.speak(closeVoice, () => {
          next(action);  
        });
      } else {
        next(action);
      }
      break;
    default:
      next(action);
      break;
    }
  } else {
    next(action);
  }
};

export default reader;