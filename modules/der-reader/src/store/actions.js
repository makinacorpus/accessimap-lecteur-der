export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_DER_FILE = 'SET_DER_FILE';
export const SET_FILTER = 'SET_FILTER';
export const SET_FILES_LIST = 'SET_FILES_LIST';
export const SET_DER = 'SET_DER';

export const setMessage = message => ({
  type: SET_MESSAGE,
  messageType: message.type,
  text: message.text
});

export const setDerFile = file => ({
  type: SET_DER_FILE,
  derFile: file
});

export const setFilter = filter => ({
  type: SET_FILTER,
  filter: filter
});

export const setFilesList = files => ({
  type: SET_FILES_LIST,
  files: files
});

export const setDer = der => ({
  type: SET_DER,
  der: der
});