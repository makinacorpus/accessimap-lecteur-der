var _ = require('lodash');

var Speaker = {

  setEventsListener: function(container) {
    console.log(container);
    container.addEventListener('mouseover', _.throttle(Speaker.speak, 300));
  },

  speak: function(event) {
    var delegationSelector = '.button, li.selectable-list--item a, .modal--title';
    var target = event.target,
        related = event.relatedTarget,
        match;

    // search for a parent node matching the delegation selector
    while ( target && target != document && !( match = Speaker.matchesSelector( target, delegationSelector ) ) ) {
      target = target.parentNode;
    }

    // exit if no matching node has been found
    if ( !match ) { return; }

    // loop through the parent of the related target to make sure that it's not a child of the target
    while ( related && related != target && related != document ) {
      related = related.parentNode;
    }

    // exit if this is the case
    if ( related == target ) { return; }
    Speaker.tts(target.textContent);
  },

  matchesSelector: function(element, selector) {
    var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
    var i = 0;

    while (matches[i] && matches[i] !== element) {
      i++;
    }

    return matches[i] ? true : false;
  },

  setTTS: function(tts) {
    Speaker.tts = tts;
  }
};

module.exports = Speaker;
