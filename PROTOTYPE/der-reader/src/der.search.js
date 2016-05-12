var DerSounds = require('./der.sounds.js');
var _ = require('lodash');

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
        this.soundsX = [];
        this.soundsY = [];
        this.lastPos = null;
        this.positionFromElement = {};
        this.isXfound = false;
        this.isYfound = false;

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
        };
    },

    isInAxis: function(pointer, axis) {
        if (axis === 'x') {
            if (pointer.x > DerSearch.elementBoundingBox.left && pointer.x < DerSearch.elementBoundingBox.right) {
                return true;
            }
        }
        if (axis === 'y') {
            if (pointer.y > DerSearch.elementBoundingBox.top && pointer.y < DerSearch.elementBoundingBox.bottom) {
                return true;
            }
        }

        return false;
    },

    getPositionFromElement: function(pointer) {
        var element = DerSearch.elementCenter;
        var x = {},
            y = {};

        if (pointer.x > element.x) {
            x.distance = pointer.x - element.x;
            x.direction = 'left';
        } else {
            x.distance = element.x - pointer.x;
            x.direction = 'right';
        }

        if (pointer.y > element.y) {
            y.distance = pointer.y - element.y;
            y.direction = 'top';
        } else {
            y.distance = element.y - pointer.y;
            y.direction = 'bottom';
        }

        return {
            x: x,
            y: y
        };
    },

    getInitialPos: function(event) {
        DerSounds.mouseDown = true;
        DerSearch.isXfound = false;
        DerSearch.isYfound = false;

        var pointer = DerSearch.getPointer(event);

        DerSearch.initXaxis(pointer);
        DerSearch.findX(pointer);
    },

    checkCurrentPos: function(event) {
        if (!DerSounds.mouseDown) {
            return;
        }

        var pointer =  DerSearch.getPointer(event);

        if (!DerSearch.isXfound) {
            DerSearch.findX(pointer);
        } else {
            if (!DerSearch.isYfound) {
                DerSearch.findY(pointer);
            }
        }

        DerSearch.lastPos = pointer;
    },

    initXaxis: function(pointer) {
        this.positionFromElement = DerSearch.getPositionFromElement(pointer);

        var x = pointer.x,
            distance = this.positionFromElement.x.distance,
            direction = this.positionFromElement.x.direction;

        DerSearch.soundsX = DerSearch.getSoundsPositions(distance, x, direction);
    },

    initYaxis: function(pointer) {
        this.positionFromElement = DerSearch.getPositionFromElement(pointer);

        var y = pointer.y,
            distance = this.positionFromElement.y.distance,
            direction = this.positionFromElement.y.direction;

        DerSearch.soundsY = DerSearch.getSoundsPositions(distance, y, direction);
    },

    findX: function(pointer) {
        var sounds = DerSearch.soundsX;

        if (DerSearch.isInAxis(pointer, 'x')) {
            DerSearch.isXfound = true;
            DerSearch.initYaxis(pointer);
            DerSounds.playTarget();
        } else if (DerSearch.lastPos === null) {
            DerSounds.play(0);
            DerSearch.lastPos = pointer;
        }
        else {
            _.map(sounds, function(sound, key) {
                if(_.inRange(sound, DerSearch.lastPos.x, pointer.x)) {
                    DerSounds.play(key);
                }
            });
        }
    },

    findY: function(pointer) {
        var sounds = DerSearch.soundsY;

        if (DerSearch.isInAxis(pointer, 'y')) {
            DerSearch.isYfound = true;
            DerSounds.playTarget();
        } else {
            _.map(sounds, function(sound, key) {
                if(_.inRange(sound, DerSearch.lastPos.y, pointer.y)) {
                    DerSounds.play(key);
                }
            });
        }
    }
};

module.exports = DerSearch;
