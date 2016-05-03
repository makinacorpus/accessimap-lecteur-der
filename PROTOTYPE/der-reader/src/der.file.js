var Utils = require('./der.utils.js');

var DerFile = {
    loadDerFile: function(der, container, callback) {
        var loadSvg = new Promise(function(resolve, reject) {
            Utils.load(der.svgFile)
            .then(function(response) {
                container.innerHTML = response;
                resolve();
            }, function() {
                reject();
            });
        });

        var loadJson = new Promise(function(resolve, reject) {
            Utils.load(der.jsonFile)
            .then(function(response) {
                der.pois = JSON.parse(response).pois;
                resolve(der.pois);
            }, function() {
                reject();
            });
        });

        Promise.all([loadSvg, loadJson]).then(function() {
            if (callback) {
                callback();
            }
        });
    }
};

module.exports = DerFile;
