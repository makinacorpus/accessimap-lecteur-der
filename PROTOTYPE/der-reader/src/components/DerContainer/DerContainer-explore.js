const GESTURES = {
  'click': 'tap',
  'dblclick': 'double_tap'
}

var Explore = {

  /**
  * add event listener to DER elements
  * @param {HTMLElement} element
  * @param {Object} actions
  * @param {readAudioFile} tts
  * @param {Function} tts
  */
  setExploreEvents: function(pois, readFunction, tts) {
    this.readFunction = readFunction;
    this.tts = tts;
    this.pois = [];
    this.actions = {};

    pois.poi.map(function(poi) {
      var id = poi.id.split('-').pop();
      var poiEl = document.querySelectorAll('[data-link="' + id + '"]')[0];
      if (poiEl !== undefined) {
        Explore.pois.push(poiEl);
        Explore.actions[id] = poi.actions.action;
        Object.keys(GESTURES).map(function(gesture) {
          poiEl.addEventListener(gesture, Explore.action);
        });
      }
    });
  },

  removeExploreEvents: function() {
    Explore.pois.map(function(poiEl) {
      Object.keys(GESTURES).map(function(gesture) {
        poiEl.removeEventListener(gesture, Explore.action);
      });
    });
  },

  action: function(event) {
    let element = event.target;
    let actions = Explore.actions[element.getAttribute('data-link')];

    let action = Explore._getGestureAction(actions, event.type);

    // console.log(e);
    if (action !== undefined) {
      Explore._onEventStarted(element);

      if (action.protocol === 'mp3') {
        Explore.readFunction(action.value).then(function() {
          Explore._onEventEnded(element);
        });
      }

      if (action.protocol === 'tts') {
        Explore.tts(action.value).then(function() {
          Explore._onEventEnded(element);
        });
      }
    }
  },

  _getGestureAction: function(actions, type) {
    if (actions.length === undefined) {
      return actions;
    } else {
      for (var i = 0; i < actions.length; i++) {
        if (GESTURES[type] === actions[i].gesture && actions[i].protocol !== undefined) {
          return actions[i];
        }
      }
    }
    return;
  },

  _onEventStarted: function(element) {
    this.initialColor = element.style.fill;
    element.style.fill = 'red';
  },

  _onEventEnded: function(element) {
    element.style.fill = this.initialColor;
  }

};

module.exports = Explore;
