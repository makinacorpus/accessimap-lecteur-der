var Utils = require('./utils.js');
var TouchEvents = require('./touch-events.js');

function Der(options) {
    this.options = Object.assign({}, DerReader.defaults, options || {});
    this.pois = {};
    this.element = document.createElement('div');

    loadData(this);
    document.body.appendChild(this.element);
}

function loadData(der) {
    var promiseSvg = new Promise(function(resolve, reject) {
        Utils.load('./../der/carte_avec_source.svg')
        .then(function(response) {
            der.element.innerHTML = response;
            resolve();
        }, function() {
            reject();
        });
    });

    var promiseJson = new Promise(function(resolve, reject) {
        Utils.load('./../der/interactions.json')
        .then(function(response) {
            var pois = JSON.parse(response).pois;
            der.pois = pois;
            resolve(pois);
        }, function() {
            reject();
        });
    });

    Promise.all([promiseSvg, promiseJson]).then(function() {
        der.pois.map(function(poi, key) {
            var poiEl = document.getElementById(poi.id);
            if (poiEl !== null) {
                TouchEvents.init(poiEl, poi);
            }
        });
    });
}

module.exports = Der;
