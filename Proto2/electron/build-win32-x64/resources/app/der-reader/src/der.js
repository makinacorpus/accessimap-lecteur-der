var Utils = require('./utils.js');
var TouchEvents = require('./touch-events.js');

function Der(options) {
    this.options = Object.assign({}, DerReader.defaults, options || {});
    this.svgFile = options.svgFile;
    this.jsonFile = options.jsonFile;
    this.pois = {};
    this.element = document.createElement('div');

    loadData(this);
    document.body.appendChild(this.element);
}

function loadData(der) {
    var promiseSvg = new Promise(function(resolve, reject) {
        Utils.load(der.svgFile)
        .then(function(response) {
            der.element.innerHTML = response;
            resolve();
        }, function() {
            reject();
        });
    });

    var promiseJson = new Promise(function(resolve, reject) {
        Utils.load(der.jsonFile)
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
