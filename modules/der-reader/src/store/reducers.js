import { SET_MESSAGE, SET_DER_FILE, SET_FILTER, SET_FILES_LIST, SET_DER } from './actions';

const defaultState = {
  config: {},
  derFile: null,
  der: [],
  files: [],
  selectedDocument: 0,
  activeFilter: null,
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
    case SET_DER_FILE:
      return {
        ...state,
        derFile: action.derFile,
        selectedDocument: 0
      };
    case SET_FILTER:
      return {
        ...state,
        activeFilter: action.filter
      };
    case SET_FILES_LIST:
      return {
        ...state,
        files: action.files
      };
    case SET_DER:
      console.log(action)
      let filters = state.activeFilter === null ? action.der.filters.filter[0] : state.activeFilter;
      return {
        ...state,
        der: action.der,
        activeFilter: filters
      };
    default:
      return state;
  }
}

export default appReducer;