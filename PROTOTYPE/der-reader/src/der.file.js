var Utils = require('./der.utils.js');
var TouchEvents = require('./der.events.js');

var DerFile = {
    getSVG: function(file) {
        if (file === undefined) {
            return;
        }
        else if (file.type === 'path') {
            return new Promise(function(resolve, reject) {
                Utils.load(file.src)
                .then(function(response) {
                    resolve(response);
                }, function() {
                    reject();
                });
            });
        }
        return file.src;
    },

    getJSON: function(file) {
        if (file === undefined) {
            return;
        }
        else if (file.type === 'path') {
            return new Promise(function(resolve, reject) {
                Utils.load(file.src)
                .then(function(response) {
                    resolve(JSON.parse(response).pois);
                }, function() {
                    reject();
                });
            });
        }
        return file.src
    },

    loadDerFile: function(der, container, tts) {
        Promise.all([this.getSVG(der.svg), this.getJSON(der.json)]).then(function(values) {
            if (values[0] !== undefined) {
                container.innerHTML = values[0];
            } else {
                console.log('Aucun SVG trouvé');
            }

            if (values[1] !== undefined) {
                der.pois = values[1];
                der.pois.map(function(poi) {
                    var poiEl = document.getElementById(poi.id);
                    if (poiEl !== null) {
                        TouchEvents.init(poiEl, poi.actions, tts);
                    }
                });
            } else {
                console.log('Aucun JSON trouvé');
            }
        });
    }
};

module.exports = DerFile;
