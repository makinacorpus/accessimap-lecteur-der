var DerSounds = require('./DerContainer-sounds.js');
var _ = require('lodash');

var pressTimer,
  lastPos;
var mouseDown = false;

var DerSearch = {

  _setEventsListener: function() {
    this.container.addEventListener('mousedown', DerSearch.getInitialPos);
    this.container.addEventListener('touchstart', DerSearch.getInitialPos);

    this.container.addEventListener('mouseup', DerSearch._disableMouseHandler);
    this.container.addEventListener('touchend', DerSearch._disableMouseHandler);

    this.container.addEventListener('mousemove', _.throttle(DerSearch.checkCurrentPos, 200));
    this.container.addEventListener('touchmove', _.throttle(DerSearch.checkCurrentPos, 200));
  },

  removeEventsListener: function(container) {
    this.container = container;
    this.container.removeEventListener('mousedown', DerSearch.getInitialPos);
    this.container.removeEventListener('touchstart', DerSearch.getInitialPos);

    this.container.removeEventListener('mouseup', DerSearch._disableMouseHandler);
    this.container.removeEventListener('touchend', DerSearch._disableMouseHandler);

    this.container.removeEventListener('mousemove', _.throttle(DerSearch.checkCurrentPos, 200));
    this.container.removeEventListener('touchmove', _.throttle(DerSearch.checkCurrentPos, 200));
  },

  _disableMouseHandler: function() {
    mouseDown = false;
    clearTimeout(pressTimer);
  },

  setSearchEvents: function(searchableElement, container, pois, message) {
    this.message = message;
    if (searchableElement) {
      var poi = pois.poi[searchableElement];
      var id = poi.id.split('-').pop();
      var elementToFind = document.querySelectorAll('[data-link="' + id + '"]')[0];

      this.container = container;
      this.elementBoundingBox = elementToFind.getBoundingClientRect();
      this.elementCenter = {x: this.elementBoundingBox.left + this.elementBoundingBox.width/2, y: this.elementBoundingBox.top + this.elementBoundingBox.height/2};

      this.soundsX = [];
      this.soundsY = [];
      this.positionFromElement = {};
      this.isXfound = false;
      this.isYfound = false;

      DerSearch._setEventsListener();

    }
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
    mouseDown = true;
    lastPos = null;
    DerSearch.isXfound = false;
    DerSearch.isYfound = false;

    var pointer = DerSearch.getPointer(event);

    DerSearch.initXaxis(pointer);
    DerSearch.findX(pointer);
  },

  checkCurrentPos: function(event) {
    if (!mouseDown) {
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

    lastPos = pointer;
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

    if (lastPos === null || lastPos === undefined) {
      DerSounds.play(0);
      lastPos = pointer;
    } else {
      for (var i = 1; i < sounds.length; i++) {
        if(_.inRange(sounds[i], lastPos.x, pointer.x)) {
          DerSounds.play(i);
        }
      }
      if (DerSearch.isInAxis(pointer, 'x')) {
        pressTimer = setTimeout(function() {
          if (mouseDown && !DerSearch.isXfound) {
            console.log('Axe X trouvé');
            DerSearch.message('Axe X trouvé');
            DerSearch.isXfound = true;
            DerSearch.initYaxis(pointer);
            DerSounds.playTarget();
          }
        }, 1000);
      } else {
        clearTimeout(pressTimer);
      }
    }
  },

  findY: function(pointer) {
    var sounds = DerSearch.soundsY;

    for (var i = 1; i < sounds.length; i++) {
      if(_.inRange(sounds[i], lastPos.y, pointer.y)) {
        DerSounds.play(i);
      }
    }

    if (DerSearch.isInAxis(pointer, 'y')) {
      pressTimer =  setTimeout(function() {
        if (mouseDown && !DerSearch.isYfound) {
          console.log('Axe Y trouvé');
          DerSearch.message('Axe Y trouvé');
          DerSearch.isYfound = true;
          DerSounds.playTarget();
        }
      }, 1000);
    } else {
      clearTimeout(pressTimer);
    }
  }
};

module.exports = DerSearch;
