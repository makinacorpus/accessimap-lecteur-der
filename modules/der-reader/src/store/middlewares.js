import _ from 'lodash';
import {
    SET_OPTION,
    INIT_CONFIG
} from './actions';
import { defaultState } from './reducers';

/**
 * Middleware for resize application container to fit with DER.
 * 
 * @param {Object} timer - Options for action timer
 * @param {Number} timer.duration - Duration for setTimeout
 * @param {Object} timer.action - Action to dispatch after timeout
 */
export const screenCalibrate = state => next => action => {
    switch (action.type) {
        case SET_OPTION:
            console.log(action)
            if (action.name === 'format') {
                document.getElementById('der-reader').className = action.value;
            }

            if (action.name === 'dpi') {
                document.body.style.fontSize = action.value + 'px';
            }
            break;
        case INIT_CONFIG:
            let { format, dpi } = action.value;
            document.getElementById('der-reader').className = format ? format : defaultState.config.format;
            document.body.style.fontSize = dpi ? dpi + 'px' : defaultState.config.dpi + 'px';
            break;
    }
    next(action);
};

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
export const localstorage = state => next => action => {
    const getItem = (name) => {
        let item;
        try {
            item = JSON.parse(window.localStorage.getItem(name));
        } catch(e) {
            try {
                item = window.localStorage.getItem(name) || null;
            } catch(e) {
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
            } catch(e) {}
            return array;
        } catch(e) {
            try {
                window.localStorage.setItem(name, JSON.stringify([value]));
            } catch(e) {}
            return [value];
        }
    }

    if (action.localStorage) {
        const { type, name, names, value } = action.localStorage;
        switch (type) {
            case 'setItem':
                try {
                    window.localStorage.setItem(name, JSON.stringify(value));
                } catch(e) {}
                break;
            case 'addItem':
                action.value = addItem(name, value);
                break;
            case 'removeItem':
                try {
                    window.localStorage.removeItem(name);
                } catch(e) {}
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