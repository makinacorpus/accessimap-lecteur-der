import {
  touchEvent,
  touchStartHandler
} from '../../services/touchevents.js'

const GESTURES = {
  'click': 'tap',
  'dblclick': 'double_tap'
}

class exploreDer {
  constructor () {
    this.currentLinksElement = [];

    this.readFunction;
    this.tts;
    this.filter;
    this.pois = [];
    this.actions = {};
  }

    _getAction(actions, type) {
    if (!Array.isArray(actions) && this.filter !== null) {
      if (actions.filter === this.filter.id) {
        return actions;
      }
    } else {
      for (var i = 0; i < actions.length; i++) {
        let a = actions[i];
        if (this.filter) {
          if (a.filter === this.filter.id) {
            return a;
          }
        }
      }
    }
    return;
  }

  _onEventStarted = element => {
    element.initialColor = element.style.fill;
    element.style.fill = 'red';
  }

  _onEventEnded = element => {
    element.style.fill = element.initialColor;
  }

  /**
  * add event listener to DER elements
  * @param {HTMLElement} element
  * @param {Object} actions
  * @param {readAudioFile} tts
  * @param {Function} tts
  */
  setExploreEvents(params) {
    this.readFunction = params.readFunction;
    this.tts = params.tts;
    this.filter = params.filter;
    this.pois = [];
    this.actions = {};

    params.pois.map((poi) => {
      var id = poi.id.split('-').pop();
      var elements = document.querySelectorAll('[data-link="' + id + '"]');

      Object.keys(elements).map((index) => {
        if (elements[index] !== undefined) {
          this.pois.push(elements[index]);
          this.actions[id] = poi.actions.action;
          Object.keys(GESTURES).map((gesture) => {
            elements[index].addEventListener(gesture, this.initAction); // For click (mouse)
            elements[index].ontouchstart = e => touchStartHandler(e, this.initAction); // For touch events (touch screen)
          });
        }
      });
    });
  }

  removeExploreEvents() {
    this.pois.map((poiEl) => {
      Object.keys(GESTURES).map((gesture) => {
        poiEl.removeEventListener(gesture, this.initAction);
      });
    });
  }

  initAction = e => {
    let element = e.target;
    let actions = this.actions[element.getAttribute('data-link')]; 
    let eventType = e.type;

    if (e.type === 'touchstart') {
      eventType = touchEvent.getType(e)
    }

    let action = this._getAction(actions, eventType);

    if (action !== undefined && GESTURES[eventType] === action.gesture) {
      if (this.currentLinksElement) {
        this.currentLinksElement.map(element => {
          this._onEventEnded(element);
        });
      }

      this.currentLinksElement = [].slice.call(document.querySelectorAll('[data-link="' + element.getAttribute('data-link') + '"]'));

      this.currentLinksElement.map(element => {
        this._onEventStarted(element);
      });
            
      if (action.protocol === 'mp3') {
        this.readFunction(action.value).then(() => {
          this.currentLinksElement.map(element => {
            this._onEventEnded(element);
          });
        });
      }

      if (action.protocol === 'tts') {
        this.tts.speak(action.value).then(() => {
          this.currentLinksElement.map(element => {
            this._onEventEnded(element);
          });
        });
      }
    }
  }
}

export default new exploreDer()