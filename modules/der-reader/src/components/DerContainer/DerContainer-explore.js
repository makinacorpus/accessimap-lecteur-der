import Touch from '../../services/touch.js'

const GESTURE_SIMPLE_TAP = 'tap';
const GESTURE_DOUBLE_TAP = 'double_tap';

class exploreDer {

  readFunction = null;
  tts = null;
  filter = null;
  pois = [];
  actions = {};
  currentLinksElement = [];
  touchEvents = [];

  /**
   * Return actions filtered by this.filter.id
   * @param {Array | Object} actions actions to filter
   * @returns actions
   */
  _getAction(actions, gesture) {
    if (!Array.isArray(actions) && this.filter) {
      if (actions.filter === this.filter.id) {
        return actions;
      }
    } else if (this.filter) {
      return actions.find(currentAction => currentAction.filter === this.filter.id && currentAction.gesture === gesture);
    }
    return null;
  }

  /**
   * Change fill color of an element in red
   * Useful when this item is in TTS / MP3 playing
   */
  _onEventStarted = element => {
    element.initialColor = element.style.fill;
    element.style.fill = 'red';
  }
  
  /**
   * Reset fill color of an element
   * Useful when TTS / MP3 end
   */
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
  attachExploreEvents({ readFunction, tts, filter, pois }) {
    this.readFunction = readFunction;
    this.tts = tts;
    this.filter = filter;
    this.pois = [];
    this.actions = {};
    this.touchEvents = [];

    pois.map((poi) => {
      var id = poi.id.split('-').pop();
      var elements = document.querySelectorAll('[data-link="' + id + '"]');

      Object.keys(elements).map((index) => {
        if (elements[index] !== undefined) {
          let currentElement = elements[index];
          currentElement.style.cursor = 'pointer';
          
          this.pois.push(currentElement);

          this.actions[id] = poi.actions.action;

          let touchEvent = new Touch(currentElement)
          touchEvent.onTap((element) => {
            this.initAction(element, GESTURE_SIMPLE_TAP);
          })
          touchEvent.onDoubleTap((element) => {
            this.initAction(element, GESTURE_DOUBLE_TAP);
          })
          touchEvent.run()
          this.touchEvents.push(touchEvent);
        }
      });
    });
  }
  
  /**
   * Destroy every Touch Events for the current DER
   */
  destroyExploreEvents() {
    this.touchEvents.forEach(currentTouchEvent => {
      currentTouchEvent.destroy();
    })
  }

  initAction = (target, gesture) => {
    // console.log('DerContainer-explore > initAction');
    let id = target.getAttribute('data-link');
    let action = this._getAction(this.actions[id], gesture);

    if (action) {
      if (this.currentLinksElement) {
        this.currentLinksElement.forEach(element => {
          this._onEventEnded(element);
        });
      }

      this.currentLinksElement = [].slice.call(document.querySelectorAll(`[data-link="${id}"]`));

      this.currentLinksElement.forEach(element => {
        this._onEventStarted(element);
      });
            
      if (action.protocol === 'mp3') {
        this.readFunction(action.value).then(() => {
          this.currentLinksElement.forEach(element => {
            this._onEventEnded(element);
          });
        });
      }

      if (action.protocol === 'tts') {
        this.tts.speak(action.value, () => {
          this.currentLinksElement.forEach(element => {
            this._onEventEnded(element);
          });
        });
      }
    }
  }
}

export default new exploreDer()