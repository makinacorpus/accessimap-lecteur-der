const GESTURES = {
  'click': 'tap',
  'dblclick': 'double_tap'
}

var Explore = {

  currentLinksElement: [],

  /**
  * add event listener to DER elements
  * @param {HTMLElement} element
  * @param {Object} actions
  * @param {readAudioFile} tts
  * @param {Function} tts
  */
  setExploreEvents: function(params) {
    this.readFunction = params.readFunction;
    this.tts = params.tts;
    this.filter = params.filter;
    this.pois = [];
    this.actions = {};

    params.pois.map(function(poi) {
      var id = poi.id.split('-').pop();
      var elements = document.querySelectorAll('[data-link="' + id + '"]');

      Object.keys(elements).forEach((index) => {
        if (elements[index] !== undefined) {
          Explore.pois.push(elements[index]);
          Explore.actions[id] = poi.actions.action;
          Object.keys(GESTURES).map(function(gesture) {
            elements[index].addEventListener(gesture, Explore.initAction);
          });
        }
      });
    });
  },

  removeExploreEvents: function() {
    Explore.pois.map(function(poiEl) {
      Object.keys(GESTURES).map(function(gesture) {
        poiEl.removeEventListener(gesture, Explore.initAction);
      });
    });
  },

  initAction: function(event) {
    let element = event.target;
    let actions = Explore.actions[element.getAttribute('data-link')]; 
    let action = Explore._getAction(actions, event.type);
    if (action !== undefined && GESTURES[event.type] === action.gesture) {
      if (Explore.currentLinksElement) {
        Explore.currentLinksElement.forEach(function(element) {
          Explore._onEventEnded(element);
        });
      }

      Explore.currentLinksElement = [].slice.call(document.querySelectorAll('[data-link="' + element.getAttribute('data-link') + '"]'));

      Explore.currentLinksElement.forEach(function(element) {
        Explore._onEventStarted(element);
      });
            
      if (action.protocol === 'mp3') {
        Explore.readFunction(action.value).then(() => {
          Explore.currentLinksElement.forEach(function(element) {
            Explore._onEventEnded(element);
          });
        });
      }

      if (action.protocol === 'tts') {
        Explore.tts.speak(action.value).then(function() {
          Explore.currentLinksElement.forEach(function(element) {
            Explore._onEventEnded(element);
          });
        });
      }
    }
  },

  _getAction: function(actions, type) {
    if (!Array.isArray(actions)) {
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
  },

  _onEventStarted: function(element) {
    element.initialColor = element.style.fill;
    element.style.fill = 'red';
  },

  _onEventEnded: function(element) {
    element.style.fill = element.initialColor;
  }

};

module.exports = Explore;
