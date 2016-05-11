var DerSounds = require('./der.sounds.js');
var Utils = require('./der.utils.js');

var DerSearch = {

    setSearchEvents: function(element, container) {
        this.container = container;
        var elementBoundingBox = element.getBoundingClientRect();
        this.elementCenter = {x: elementBoundingBox.left + elementBoundingBox.width/2, y: elementBoundingBox.top + elementBoundingBox.height/2};

        this.container.addEventListener('mousedown', DerSearch.getInitialPos, false);
        this.container.addEventListener('touchstart', DerSearch.getInitialPos, false);
        this.sounds = [];
        this.lastPos = null;
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
        DerSearch._removeMoveEvents();

        // Horizontal
        var pointerX = event.clientX || event.touches[0].clientX,
            elementX = DerSearch.elementCenter.x,
            distance;

        if (pointerX > elementX) {
            distance = pointerX - elementX;
        } else {
            distance = elementX - pointerX;
        }

        DerSearch.lastPos = pointerX;
        DerSearch.sounds = DerSearch.getSoundsPositions(distance, pointerX);
        DerSearch._addMoveEvents();
    },

    checkCurrentPos() {
        var x =  event.clientX || Math.round(event.touches[0].clientX);
        for (var i = 0; i < DerSearch.sounds.length; i++) {
            if ((DerSearch.lastPos <= DerSearch.sounds[i] && DerSearch.sounds[i] <= x) || DerSearch.lastPos >= DerSearch.sounds[i] && DerSearch.sounds[i] >= x) {
                DerSounds.play(i);
            }
        }
        DerSearch.lastPos = x;
    },

    _addMoveEvents: function() {
        this.container.addEventListener('mousemove', Utils.throttle(DerSearch.checkCurrentPos, 100), false);
        this.container.addEventListener('touchmove', Utils.throttle(DerSearch.checkCurrentPos, 100), false);
    },

    _removeMoveEvents: function() {
        this.container.removeEventListener('mousemove', DerSearch.getInitialPos, false);
        this.container.removeEventListener('touchmove', DerSearch.getInitialPos, false);
    }
};

module.exports = DerSearch;
