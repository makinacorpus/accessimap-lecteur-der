(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/app-cordova.js":[function(require,module,exports){
var main = require('./commons/main');

const app = {
    initialize: function () {
        this.env = 'cordova';
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
        main.initialize(app);
    }
};

app.initialize();

},{"./commons/main":"/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/commons/main.js"}],"/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/commons/main.js":[function(require,module,exports){
const main = {
    initialize(app) {
        console.log('main');
        console.log(app);
        var logo = document.getElementById('logo');
        logo.innerHTML = '<img src="img/logo-' + app.env + '.png" alt="logo-env">';
    }
};

module.exports = main;

},{}]},{},["/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/app-cordova.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLWNvcmRvdmEuanMiLCJhcHAvY29tbW9ucy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxPQUFPLFFBQVEsZ0JBQVIsQ0FBWDs7QUFFQSxNQUFNLE1BQU07QUFDUixnQkFBWSxZQUFXO0FBQ25CLGFBQUssR0FBTCxHQUFXLFNBQVg7QUFDQSxpQkFBUyxnQkFBVCxDQUEwQixhQUExQixFQUF5QyxLQUFLLGFBQTlDLEVBQTZELEtBQTdEO0FBQ0gsS0FKTzs7QUFNUixtQkFBZSxZQUFXO0FBQ3RCLGFBQUssVUFBTCxDQUFnQixHQUFoQjtBQUNIO0FBUk8sQ0FBWjs7QUFXQSxJQUFJLFVBQUo7OztBQ2JBLE1BQU0sT0FBTztBQUNULGVBQVcsR0FBWCxFQUFnQjtBQUNaLGdCQUFRLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDQSxZQUFJLE9BQU8sU0FBUyxjQUFULENBQXdCLE1BQXhCLENBQVg7QUFDQSxhQUFLLFNBQUwsR0FBaUIsd0JBQXdCLElBQUksR0FBNUIsR0FBa0MsdUJBQW5EO0FBQ0g7QUFOUSxDQUFiOztBQVNBLE9BQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbWFpbiA9IHJlcXVpcmUoJy4vY29tbW9ucy9tYWluJyk7XG5cbmNvbnN0IGFwcCA9IHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbnYgPSAnY29yZG92YSc7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgdGhpcy5vbkRldmljZVJlYWR5LCBmYWxzZSk7XG4gICAgfSxcblxuICAgIG9uRGV2aWNlUmVhZHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBtYWluLmluaXRpYWxpemUoYXBwKTtcbiAgICB9XG59O1xuXG5hcHAuaW5pdGlhbGl6ZSgpO1xuIiwiY29uc3QgbWFpbiA9IHtcbiAgICBpbml0aWFsaXplKGFwcCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbWFpbicpO1xuICAgICAgICBjb25zb2xlLmxvZyhhcHApO1xuICAgICAgICB2YXIgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvJyk7XG4gICAgICAgIGxvZ28uaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiaW1nL2xvZ28tJyArIGFwcC5lbnYgKyAnLnBuZ1wiIGFsdD1cImxvZ28tZW52XCI+JztcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1haW47XG4iXX0=
