var Utils = require('./utils.js');
var TouchEvents = require('./touch-events.js');
var DerForm = require('./der-form.js');

var DerReader = {
    /* Options :
    {
        container: DOM element
        svgFile: path to SVG file
        jsonFile: path to JSON file
    }
    */
    init: function(options) {
        options = options || {};
        DerForm.init();
        this.container = options.container !== undefined ? options.container : this._createContainer();
        this.der = {
            svgFile: options.svgFile,
            jsonFile: options.jsonFile
        };

        this._loadDerFile(this.der);
        return this;
    },

    _createContainer: function() {
        var container = document.createElement('div');
        document.body.appendChild(container);
        return container;
    },


    _loadDerFile: function(der) {
        var promiseSvg = new Promise(function(resolve, reject) {
            Utils.load(der.svgFile)
            .then(function(response) {
                DerReader.container.innerHTML = response;
                resolve();
            }, function() {
                reject();
            });
        });

        var promiseJson = new Promise(function(resolve, reject) {
            Utils.load(der.jsonFile)
            .then(function(response) {
                der.pois = JSON.parse(response).pois;
                resolve(der.pois);
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
};

module.exports = DerReader;
