import { SET_MESSAGE } from './actions';

const defaultState = {
  config: {},
  message: {
    messageType: '',
    text: ''
  },
};

const appReducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: {
          messageType: action.messageType,
          text: action.text
        }
      };
    default:
      return state;
  }
}

export default appReducer;