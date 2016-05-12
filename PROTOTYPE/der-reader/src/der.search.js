var DerSounds = require('./der.sounds.js');
var Utils = require('./der.utils.js');

var DerSearch = {

    _setEventsListener: function() {
        this.container.addEventListener('mousedown', DerSearch.getInitialPos);
        this.container.addEventListener('touchstart', DerSearch.getInitialPos);

        this.container.addEventListener('mouseup', DerSearch._disableMouseHandler);
        this.container.addEventListener('touchend', DerSearch._disableMouseHandler);

        this.container.addEventListener('mousemove', Utils.throttle(DerSearch.checkCurrentPos));
        this.container.addEventListener('touchmove', Utils.throttle(DerSearch.checkCurrentPos));
    },

    _disableMouseHandler: function() {
        DerSounds.mouseDown = false;
    },

    setSearchEvents: function(element, container) {
        this.container = container;
        this.elementBoundingBox = element.getBoundingClientRect();
        this.elementCenter = {x: this.elementBoundingBox.left + this.elementBoundingBox.width/2, y: this.elementBoundingBox.top + this.elementBoundingBox.height/2};

        this.mouseDown = false;
        this.sounds = [];
        this.lastPos = null;

        DerSearch._setEventsListener();
    },

    getSoundsPositions: function(distance, initialPos) {

        var ref = DerSounds.getNotesLength();

        var array = [];

        for (var i = 0; i < ref; i++) {
            var lastDistance = array[i-1] || initialPos;
            array.push(Math.round(lastDistance + distance/ref));
        }

        return array;
    },

    getInitialPos: function() {
        DerSounds.mouseDown = true;

        // Horizontal
        var pointerX = event.clientX || event.touches[0].clientX,
            elementX = DerSearch.elementCenter.x,
            distance;

        if (pointerX > elementX) {
            distance = pointerX - elementX;
        } else {
            distance = elementX - pointerX;
        }

        if (pointerX > DerSearch.elementBoundingBox.left && pointerX < DerSearch.elementBoundingBox.right) {
            DerSounds.playTarget();
        } else {
            DerSearch.lastPos = pointerX;
            DerSearch.sounds = DerSearch.getSoundsPositions(distance, pointerX);
        }
    },

    checkCurrentPos: function(event) {
        if (!DerSounds.mouseDown) {
            return;
        }
        var x =  event.clientX || Math.round(event.touches[0].clientX);
        for (var i = 0; i < DerSearch.sounds.length; i++) {
            if ((DerSearch.lastPos <= DerSearch.sounds[i] && DerSearch.sounds[i] <= x) ||
            DerSearch.lastPos >= DerSearch.sounds[i] && DerSearch.sounds[i] >= x) {
                DerSounds.play(i);
            }
        }
        DerSearch.lastPos = x;
    }
};

module.exports = DerSearch;
