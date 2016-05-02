var Utils = require('./utils.js');
var TouchEvents = require('./touch-events.js');
var DerForm = require('./der-form.js');

var DerReader = {
    /* Options :
    {
        container: DOM element
    }
    */
    init: function(options) {
        options = options || {};
        this.form = new DerForm();
        this.container = options.container !== undefined ? options.container : this.createContainer();
        this.der = {};
    },

    createContainer: function() {
        var container = document.createElement('div');
        document.body.appendChild(container);
        return container;
    },

    /* Options :
    {
        svgFile: path to SVG file
        jsonFile: path to JSON file
    }
    */
    openFile: function(options) {
        this.der.svgFile = options.svgFile;
        this.der.jsonFile = options.jsonFile;

        this._loadDerFile(this.der);
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

DerReader.init();

module.exports = DerReader;
