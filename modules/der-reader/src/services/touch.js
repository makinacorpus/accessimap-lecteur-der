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

  getTouchEvent(e) {
    let eventType;
    var now = new Date().getTime();
    var timesince = now - this.mylatesttap;
    // console.log(`getTouchEvent. now=${now}, mylatesttap=${this.mylatesttap}, timesince=${timesince}, target=${e.target}`, e.type);
    if ( !isNaN(timesince) 
        && timesince < DELTA_DOUBLE_TAP
        && (timesince > 0)
        && this.mylatesttaptype === e.type
    ) {
      eventType = TOUCH_EVENT_DOUBLE_TAP;
    }
    else {
      eventType = TOUCH_EVENT_SIMPLE_TAP;
    }
    return eventType;
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
    if (this.mylatesttaptype === null || this.mylatesttaptype === evt.type) {
      // console.log('Touch, handleTap', evt, this.getTouchEvent(evt));
      evt.stopImmediatePropagation();
      switch(this.getTouchEvent(evt)) {
        case TOUCH_EVENT_DOUBLE_TAP:
          // console.log('Touch, handleTap => onDoubleTap');
          this.onDoubleTap(evt.target);
          break;
        case TOUCH_EVENT_SIMPLE_TAP:
        default:
          // console.log('Touch, handleTap => onTap');
          this.onTap(evt.target);
          break;
      }
      this.mylatesttap = new Date().getTime();
      this.mylatesttaptype = evt.type;
    }
  }
  
  run() {
    // we don't attach touchstart
    // because on devices we have tested, 
    // touchstart event is followed by a click event
    this.element.addEventListener('touchstart', this.handleTap);
    this.element.addEventListener('click', this.handleTap);
  }
  
  destroy() {
    this.element.removeEventListener('touchstart', this.handleTap);
    this.element.removeEventListener('click', this.handleTap);
  }
}
