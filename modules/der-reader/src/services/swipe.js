/**
 * Trigger callbacks on swipe up & down on a Element
 */
export default class Swipe {

  /**
   * Represent the initial y coordinates
   * when the user start swiping
   */
  initialClientY;
  /**
   * Indicate the state of mouse
   * button down or touch down
   */
  mousedown;
  
  /**
   * Trigger callbacks on swipe up & down on a Element
   * 
   * @param {string|Element} element string selector or HTMLElement
   */
  constructor(element) {
    this.element = typeof (element) === 'string' ? document.querySelector(element) : element;
    this._init();
  }

  _init() {
    this.initialClientY = null;
    this.mousedown = false;
  }

  /**
   * Record the beginning of the swipe
   * by storing initialClientY coordinate
   */
  start = (evt) => {
    this.mousedown = true;
    // detect if [targetTouches](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/targetTouches) exist
    // else use the event directly
    let target = evt.targetTouches && evt.targetTouches.length > 0 
      ? evt.targetTouches[evt.targetTouches.length -1] 
      : evt;

    this.initialClientY = target.clientY;
    // console.log(`start. y=${target.y}, screenY=${target.screenY}, clientY=${target.clientY}`);
  }
  
  /**
   * Set callback triggered when swipe up is detected
   */
  onUp = callback => {
    this.onUp = callback;
    return this;
  }
  
  /**
   * Set callback triggered when swipe down is detected
   */
  onDown = callback => {
    this.onDown = callback;
    return this;
  }
  
  handleTouchMove = evt => {
    // setTimeout(() => {
    if (!this.initialClientY) {
      return;
    }
    
    let target = evt.targetTouches && evt.targetTouches.length > 0 
      ? evt.targetTouches[evt.targetTouches.length -1] 
      : evt;
    let yUp = target.clientY;
    let yDiff = yUp - this.initialClientY; // yDiff > 0 means a swipe down, yDiff < 0 means a swipe up
    // console.log(`handleTouchMove. y=${target.y}, screenY=${target.screenY}, clientY=${target.clientY}, yDiff=${yDiff}`);
    
    if (this.mousedown && Math.abs(yDiff) > 0) { // Most significant.
      if (yDiff > 0) {
        this.onDown(evt);
      } else {
        this.onUp(evt);
      }
    }

    this._init();
  }

  /**
   * Add handlers for Swipe element
   */
  run() {
    // touch events
    this.element.addEventListener('touchstart', this.start);
    this.element.addEventListener('touchmove', this.handleTouchMove);
    
    // mouse events
    this.element.addEventListener('mousedown', this.start);
    this.element.addEventListener('mouseup', this.handleTouchMove);
  }

  /**
   * Remove handlers
   */
  destroy() {
    // touch events
    this.element.removeEventListener('touchstart', this.start);
    this.element.removeEventListener('touchmove', this.handleTouchMove);

    // mouse events
    this.element.removeEventListener('mousedown', this.start);
    this.element.removeEventListener('mouseup', this.handleTouchMove);
  }
}
