export const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = message => ({
  type: SET_MESSAGE,
  messageType: message.type,
  text: message.text
});