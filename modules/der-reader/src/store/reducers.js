import { 
  SET_MESSAGE, 
  SET_DER_FILE, 
  SET_FILTER, 
  SET_FILES_LIST, 
  SET_DER, 
  SET_OPTION_FORMAT,
  SET_OPTION_DPI
} from './actions';

const defaultState = {
  config: {
    format: 'A3',
    dpi: 96
  },
  derFile: null,
  der: [],
  files: [],
  selectedDocument: 0,
  activeFilter: null,
  message: {
    messageType: '',
    text: ''
  }
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
      let filters = state.activeFilter === null ? action.der.filters.filter[0] : state.activeFilter;
      return {
        ...state,
        der: action.der,
        activeFilter: filters
      };
    case SET_OPTION_FORMAT:
      return {
        ...state,
        config: {
          ...state.config,
          format: action.format
        }
      }
    case SET_OPTION_DPI:
      return {
        ...state,
        config: {
          ...state.config,
          dpi: action.dpi
        }
      }
    default:
      return state;
  }
}

export default appReducer;