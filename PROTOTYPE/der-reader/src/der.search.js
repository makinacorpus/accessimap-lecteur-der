var DerSounds = require('./der.sounds.js');
var Utils = require('./der.utils.js');
var _ = require('lodash');

var x, direction, sounds;

var DerSearch = {

    _setEventsListener: function() {
        this.container.addEventListener('mousedown', DerSearch.getInitialPos);
        this.container.addEventListener('touchstart', DerSearch.getInitialPos);

        this.container.addEventListener('mouseup', DerSearch._disableMouseHandler);
        this.container.addEventListener('touchend', DerSearch._disableMouseHandler);

        this.container.addEventListener('mousemove', _.throttle(DerSearch.checkCurrentPos, 200));
        this.container.addEventListener('touchmove', _.throttle(DerSearch.checkCurrentPos, 200));
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

    getSoundsPositions: function(distance, initialPos, direction) {
        var ref = DerSounds.getNotesLength();

        var sounds = [];

        for (var i = 0; i < ref; i++) {
            var lastSound = sounds[i-1] || initialPos;
            if (i === 0) {
                sounds.push(initialPos);
            } else {
                if (direction === 'right') {
                    sounds.push(Math.round(lastSound + distance/(ref/2)));
                } else {
                    sounds.push(Math.round(lastSound - distance/(ref/2)));
                }
            }
        }

        return sounds;
    },

    getPointer: function(e) {
        return {
            x: e.clientX || e.touches[0].clientX,
            y: e.clientY || e.touches[0].clientY
        }
    },

    isBoundingBoxInAxis: function(x, y) {
        var result = {x: false, y: false};

        if (x > DerSearch.elementBoundingBox.left && x < DerSearch.elementBoundingBox.right) {
            result.x = true;
        }
        if (y > DerSearch.elementBoundingBox.top && y < DerSearch.elementBoundingBox.bottom) {
            result.y = true;
        }

        return result;
    },

    getInitialPos: function(event) {
        DerSounds.mouseDown = true;

        // Horizontal
        var pointer = DerSearch.getPointer(event),
            elementX = DerSearch.elementCenter.x,
            distance;

        if (pointer.x > elementX) {
            distance = pointer.x - elementX;
            direction = 'left';
        } else {
            distance = elementX - pointer.x;
            direction = 'right';
        }

        if (DerSearch.isBoundingBoxInAxis(pointer.x, pointer.x).x) {
            DerSounds.playTarget();
        } else {
            DerSearch.lastPos = pointer;
            DerSearch.sounds = DerSearch.getSoundsPositions(distance, pointer.x, direction);
        }
    },

    checkCurrentPos: function(event) {
        if (!DerSounds.mouseDown) {
            return;
        }

        var pointer =  DerSearch.getPointer(event),
            sounds = DerSearch.sounds;

        if (DerSearch.isBoundingBoxInAxis(pointer.x, pointer.y).x) {
            DerSounds.playTarget();
        } else {
            _.map(sounds, function(sound, key) {
                if(_.inRange(sound, DerSearch.lastPos.x, pointer.x)) {
                    DerSounds.play(key);
                }
            });
            DerSearch.lastPos = pointer;
        }

    }
};

module.exports = DerSearch;
