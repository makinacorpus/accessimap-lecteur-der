/**
 * Delta in milliseconds between two tap|click events
 * indicating we are in a double tap|click event
 */
const DELTA_DOUBLE_TAP = 500;

const TOUCH_EVENT_DOUBLE_TAP = 'doubletap';
const TOUCH_EVENT_SIMPLE_TAP = 'simpletap';

export default class Touch {
  
  mylatesttaptype = null;
  mylatesttap = null;
  
  /**
   * Trigger callbacks on tap & double tap on a Element
   * 
   * @param {string|Element} element string selector or HTMLElement
   */
  constructor(element) {
    this.element = typeof (element) === 'string' ? document.querySelector(element) : element;
  }

  weAreInDoubleTapInterval() {
    var now = new Date().getTime();
    var timesince = now - this.mylatesttap;
    return ( 
      !isNaN(timesince) &&
      timesince < DELTA_DOUBLE_TAP &&
      timesince > 0
    );
  }

  /**
   * Set the latest tap type for a specific event,
   * ONLY IF WE NEED IT.
   * We need the latest tap type for analyzing double tap.
   * The double tap will be recognized under the DELTA_DOUBLE_TAP
   * If we are out of this interval, 
   * we can set mylatesttype of the current e.type.
   * 
   * @param {Touch|MouseEvent} e event triggered by touch/click
   */
  setLatestTap(e) {
    if (! this.weAreInDoubleTapInterval()) {
      this.mylatesttaptype = e.type;
    }
    this.mylatesttap = new Date().getTime();
  }
  
  onTap = (callback) => {
    this.onTap = callback;
    return this;
  }
  
  onDoubleTap = (callback) => {
    this.onDoubleTap = callback;
    return this;
  }
  
  handleTap = evt => {
    evt.stopImmediatePropagation(); // stop other listeners to be called
    // BE CAREFUL
    // Touch Screen used for Accessimap project = IIYAMA ProLite T2735MSC
    // This device is touch/click based
    // It fires first a Touch event, then a MouseEvent
    // We have to take care of the first event
    // Scenario is, for example
    // User make a double tap on the screen
    // Device trigger Touch + MouseEvent + Touch + MouseEvent
    // We have to detect only both Touch events
    // Nevertheless, if user use only mouse, we have to memorize MouseEvent
    // And so, with this specific device, the handleTap is called twice
    // because it's the same listener, so stopImmediatePropagation won't have effects on this listener
    // cf https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
    // if there wasn't any latesttaptype, 
    // or we'are out of double tap interval
    // it's a simple tap
    if (
      !this.mylatesttaptype ||
      !this.weAreInDoubleTapInterval()
    ) {
      this.onTap(evt.target);
    } else 
    // if we are in double tap interval, 
    // and we have same latesttaptype
    // it's a double tap
    if (
      this.weAreInDoubleTapInterval() &&
      evt.type === this.mylatesttaptype
    ) {
      this.onDoubleTap(evt.target);
    }
    this.setLatestTap(evt);
  }
  
  run() {
    this.element.addEventListener('touchstart', this.handleTap);
    this.element.addEventListener('click', this.handleTap);
  }
  
  destroy() {
    this.element.removeEventListener('touchstart', this.handleTap);
    this.element.removeEventListener('click', this.handleTap);
  }
}
