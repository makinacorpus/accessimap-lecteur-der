import _ from 'lodash';

/**
 * Middleware to manage localStorage on actions
 * 
 * @param {Object} type - Action type
 * @param {Object} localStorage - Object that define function and data to use to modify localStorage
 * @param {string} localStorage.type - localStorage actions : 'setItem' | 'removeItem' | 'getItem' | 'addItem'
 * @param {string} localStorage.name - Item name for storage
 * @param {array} localStorage.names - Items names for storage, only for getItem type
 * @param {(string|Number|Object)} localStorage.value - Item value (if localStorage.type is 'setItem')
 */
const localstorage = () => next => action => {
  const getItem = (name) => {
    let item;
    try {
      item = JSON.parse(window.localStorage.getItem(name));
    } catch (e) {
      try {
        item = window.localStorage.getItem(name) || null;
      } catch (e) {
        item = null;
      }
    }
    return item;
  }

  const getMultipleItems = (names) => {
    if (names instanceof Array) {
      let items = {};
      names.map(name => {
        items[name] = getItem(name);
      });
      return items;
    }

    return null
  }

  const addItem = (name, value) => {
    let array = getItem(name, value);
    try {
      array.unshift(value);
      array = _.uniqWith(array, _.isEqual);
      try {
        window.localStorage.setItem(name, JSON.stringify(array));
      } catch (e) { return false; }
      return array;
    } catch (e) {
      try {
        window.localStorage.setItem(name, JSON.stringify([value]));
      } catch (e) { return false; }
      return [value];
    }
  }

  if (action.localStorage) {
    const {
            type,
      name,
      names,
      value
        } = action.localStorage;
    switch (type) {
    case 'setItem':
      try {
        window.localStorage.setItem(name, JSON.stringify(value));
      } catch (e) { return false; }
      break;
    case 'addItem':
      action.value = addItem(name, value);
      break;
    case 'removeItem':
      try {
        window.localStorage.removeItem(name);
      } catch (e) { return false; }
      break;
    case 'getItem':
      if (name) {
        action.value = getItem(name);
      } else if (names) {
        action.value = getMultipleItems(names);
      }
      break;
    default:
      break;
    }
  }
  next(action);
};

export default localstorage;