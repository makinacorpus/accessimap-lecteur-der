var DerSounds = require('./der.sounds.js');
// var Hammer = require('hammerjs');

var DerSearch = {

    setSearchEvents: function(element, container) {
        this.container = container;
        var elementBoundingBox = element.getBoundingClientRect();
        this.elementCenter = {x: elementBoundingBox.left + elementBoundingBox.width/2, y: elementBoundingBox.top + elementBoundingBox.height/2};

        this.container.addEventListener('mousedown', this, false);
        this.container.addEventListener('touchstart', this, false);
        // this.exploreEvents = new Hammer.Manager(container, {
        //     // inputClass: Hammer.TouchInput
        //     touchAction: 'pan-x'
        // });
        // this.exploreEvents.add( new Hammer.Press({ event: 'press', time: 1 }) );
        // this.exploreEvents.add( new Hammer.Pan({ event: 'panmove', direction: Hammer.DIRECTION_ALL, threshold: 0.1}) );
        //
        // this.exploreEvents.on('press', DerSearch.handlePress.bind(this));
        // console.log(this.exploreEvents);
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

    // handlePress: function(event) {
    //     this.exploreEvents.off('panmove', this.handlePan);
    //
    //     // Horizontal
    //     var pointerX = event.center.x,
    //         elementX = this.elementCenter.x,
    //         distance;
    //
    //     if (pointerX > elementX) {
    //         distance = pointerX - elementX;
    //     } else {
    //         distance = elementX - pointerX;
    //     }
    //
    //     this.sounds = this.getSoundsPositions(distance, pointerX);
    //
    //     this.exploreEvents.on('panmove', this.handlePan.bind(this));
    // },
    //
    // handlePan: function(event) {
    //     console.log(event.center.x);
    //     for (var i = 0; i < this.sounds.length; i++) {
    //         if (event.center.x === this.sounds[i]) {
    //             DerSounds.play(i);
    //         }
    //     }
    // }

    // Allow callback to run at most 1 time per 100ms
    // window.addEventListener("resize", throttle(callback, 100));
    // // Allow callback to run on each resize event
    // window.addEventListener("resize", callback2);
    //
    // function callback ()  { console.count("Throttled");     }
    // function callback2 () { console.count("Not Throttled"); }

    throttle: function(callback, limit) {
        console.log(limit);
        var wait = false;                  // Initially, we're not waiting
        return function () {               // We return a throttled function
            if (!wait) {                   // If we're not waiting
                callback.call();           // Execute users function
                wait = true;               // Prevent future invocations
                setTimeout(function () {   // After a period of time
                    wait = false;          // And allow future invocations
                }, limit);
            }
        }
    },

    playSound() {
        var x =  event.clientX || Math.round(event.touches[0].clientX);

        // console.log(x);
        for (var i = 0; i < DerSearch.sounds.length; i++) {
            if (x === DerSearch.sounds[i]) {
                DerSounds.play(i);
            }
        }
    },

    handleEvent: function(event) {
        // console.log(event.type);
        switch(event.type) {
        case 'mousedown':
        case 'touchstart':
            this.container.removeEventListener('mousemove', this, false);
            this.container.removeEventListener('touchmove', this, false);

            // Horizontal
            var pointerX = event.clientX || event.touches[0].clientX,
                elementX = this.elementCenter.x,
                distance;

            if (pointerX > elementX) {
                distance = pointerX - elementX;
            } else {
                distance = elementX - pointerX;
            }

            this.sounds = this.getSoundsPositions(distance, pointerX);
            console.log(this.sounds);

            this.lastTouchPos = event.clientX;
            this.container.addEventListener('mousemove', this.throttle(DerSearch.playSound, 100), false);
            this.container.addEventListener('touchmove', this.throttle(DerSearch.playSound, 100), false);

            break;

        case 'mousemove':
        case 'touchmove':
            this.container.addEventListener('mouseup', this, false);
            this.container.addEventListener('touchend', this, false);

            this.throttle(function() {

            }, 100);
            break;

        case 'mouseup':
        case 'touchend':
            this.container.removeEventListener('mousemove', this, false);
            this.container.removeEventListener('touchmove', this, false);
            break;
        }

    }
};

module.exports = DerSearch;
