(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/app-cordova.js":[function(require,module,exports){
var app = {
    initialize: function () {
        this.env = 'cordova';
        this.bindEvents();
    },

    bindEvents: function () {
        if (app.env === 'cordova') {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }
        if (app.env === 'electron') {
            this.onDeviceReady();
        }
    },

    onDeviceReady: function () {
        var logo = document.getElementById('logo');
        logo.innerHTML = '<img src="img/logo-' + app.env + '.png" alt="logo-env">';
    }
};

app.initialize();

},{}]},{},["/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/app-cordova.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLWNvcmRvdmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLE1BQU07QUFDTixnQkFBWSxZQUFXO0FBQ25CLGFBQUssR0FBTCxHQUFXLFNBQVg7QUFDQSxhQUFLLFVBQUw7QUFDSCxLQUpLOztBQU1OLGdCQUFZLFlBQVc7QUFDbkIsWUFBSSxJQUFJLEdBQUosS0FBWSxTQUFoQixFQUEyQjtBQUN2QixxQkFBUyxnQkFBVCxDQUEwQixhQUExQixFQUF5QyxLQUFLLGFBQTlDLEVBQTZELEtBQTdEO0FBQ0g7QUFDRCxZQUFJLElBQUksR0FBSixLQUFZLFVBQWhCLEVBQTRCO0FBQ3hCLGlCQUFLLGFBQUw7QUFDSDtBQUNKLEtBYks7O0FBZU4sbUJBQWUsWUFBVztBQUN0QixZQUFJLE9BQU8sU0FBUyxjQUFULENBQXdCLE1BQXhCLENBQVg7QUFDQSxhQUFLLFNBQUwsR0FBaUIsd0JBQXdCLElBQUksR0FBNUIsR0FBa0MsdUJBQW5EO0FBQ0g7QUFsQkssQ0FBVjs7QUFxQkEsSUFBSSxVQUFKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSB7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZW52ID0gJ2NvcmRvdmEnO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9LFxuXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChhcHAuZW52ID09PSAnY29yZG92YScpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgdGhpcy5vbkRldmljZVJlYWR5LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFwcC5lbnYgPT09ICdlbGVjdHJvbicpIHtcbiAgICAgICAgICAgIHRoaXMub25EZXZpY2VSZWFkeSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGV2aWNlUmVhZHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvJyk7XG4gICAgICAgIGxvZ28uaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiaW1nL2xvZ28tJyArIGFwcC5lbnYgKyAnLnBuZ1wiIGFsdD1cImxvZ28tZW52XCI+JztcbiAgICB9XG59O1xuXG5hcHAuaW5pdGlhbGl6ZSgpO1xuIl19
