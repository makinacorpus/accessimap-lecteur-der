var Utils = require('./der.utils.js');

var DerFile = {
    getSVG: function(file) {
        if (file.type === 'path') {
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
            return null;
        }
        if (file.type === 'path') {
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

    loadDerFile: function(der, container, callback) {
        Promise.all([this.getSVG(der.svg), this.getJSON(der.json)]).then(function(values) {
            container.innerHTML = values[0];
            der.pois = values[1];
            if (callback) {
                callback();
            }
        });
    }
};

module.exports = DerFile;
