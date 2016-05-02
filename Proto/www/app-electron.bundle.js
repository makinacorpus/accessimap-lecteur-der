(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/app-electron.js":[function(require,module,exports){
var main = require('./commons/main');

const app = {
    initialize: function () {
        this.env = 'electron';
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

},{}]},{},["/home/lellex/Projets/accessimap/accessimap-lecteur-der/Proto/app/app-electron.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLWVsZWN0cm9uLmpzIiwiYXBwL2NvbW1vbnMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksT0FBTyxRQUFRLGdCQUFSLENBQVg7O0FBRUEsTUFBTSxNQUFNO0FBQ1IsZ0JBQVksWUFBVztBQUNuQixhQUFLLEdBQUwsR0FBVyxVQUFYO0FBQ0EsYUFBSyxVQUFMLENBQWdCLEdBQWhCO0FBQ0g7QUFKTyxDQUFaOztBQU9BLElBQUksVUFBSjs7O0FDVEEsTUFBTSxPQUFPO0FBQ1QsZUFBVyxHQUFYLEVBQWdCO0FBQ1osZ0JBQVEsR0FBUixDQUFZLE1BQVo7QUFDQSxnQkFBUSxHQUFSLENBQVksR0FBWjtBQUNBLFlBQUksT0FBTyxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWDtBQUNBLGFBQUssU0FBTCxHQUFpQix3QkFBd0IsSUFBSSxHQUE1QixHQUFrQyx1QkFBbkQ7QUFDSDtBQU5RLENBQWI7O0FBU0EsT0FBTyxPQUFQLEdBQWlCLElBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBtYWluID0gcmVxdWlyZSgnLi9jb21tb25zL21haW4nKTtcblxuY29uc3QgYXBwID0ge1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVudiA9ICdlbGVjdHJvbic7XG4gICAgICAgIG1haW4uaW5pdGlhbGl6ZShhcHApO1xuICAgIH1cbn07XG5cbmFwcC5pbml0aWFsaXplKCk7XG4iLCJjb25zdCBtYWluID0ge1xuICAgIGluaXRpYWxpemUoYXBwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtYWluJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGFwcCk7XG4gICAgICAgIHZhciBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ28nKTtcbiAgICAgICAgbG9nby5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCJpbWcvbG9nby0nICsgYXBwLmVudiArICcucG5nXCIgYWx0PVwibG9nby1lbnZcIj4nO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbWFpbjtcbiJdfQ==
