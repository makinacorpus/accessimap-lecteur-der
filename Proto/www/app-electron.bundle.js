(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/app-electron.js":[function(require,module,exports){
var app = {
    initialize: function () {
        this.env = 'electron';
        this.onReady();
    },

    onReady: function () {
        var logo = document.getElementById('logo');
        logo.innerHTML = '<img src="img/logo-' + app.env + '.png" alt="logo-env">';
    }
};

app.initialize();

},{}]},{},["/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/app-electron.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLWVsZWN0cm9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxNQUFNO0FBQ04sZ0JBQVksWUFBVztBQUNuQixhQUFLLEdBQUwsR0FBVyxVQUFYO0FBQ0EsYUFBSyxPQUFMO0FBQ0gsS0FKSzs7QUFNTixhQUFTLFlBQVc7QUFDaEIsWUFBSSxPQUFPLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFYO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLHdCQUF3QixJQUFJLEdBQTVCLEdBQWtDLHVCQUFuRDtBQUNIO0FBVEssQ0FBVjs7QUFZQSxJQUFJLFVBQUoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFwcCA9IHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbnYgPSAnZWxlY3Ryb24nO1xuICAgICAgICB0aGlzLm9uUmVhZHkoKTtcbiAgICB9LFxuXG4gICAgb25SZWFkeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ28nKTtcbiAgICAgICAgbG9nby5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCJpbWcvbG9nby0nICsgYXBwLmVudiArICcucG5nXCIgYWx0PVwibG9nby1lbnZcIj4nO1xuICAgIH1cbn07XG5cbmFwcC5pbml0aWFsaXplKCk7XG4iXX0=
