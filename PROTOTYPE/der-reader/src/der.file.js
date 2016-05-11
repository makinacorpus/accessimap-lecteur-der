var JSZip = require('jszip');
var Utils = require('./der.utils.js');
var DerExplore = require('./der.explore.js');
var DerSearch = require('./der.search.js');
var FilesList = require('./der.filesList.js');


var DerFile = {

    /**
	 * Open ZIP and get DER files
     * @param {Object} options
     * {
     *     message: {Function} required
     *     layout: {Object} required
     *     tts: {Function} required
     *     mode: {string} required
     * }
	 */
    init: function(options) {
        for (var option in options) {
            this[option] = options[option] || this[option];
        }
        this.selectedSVG = 0;
    },

    openDerFile: function(file) {
        if (file.type.split('.').pop() !== 'application/zip') {
            DerFile.message('Fichier non valide, le fichier envoyé doit être au format ZIP', 'error', 'error');
        }
        var new_zip = new JSZip();
        new_zip.loadAsync(file)
        .then(function(zip) {
            DerFile._extractFiles(zip.files, DerFile.layout.listContainer, function(error, der) {
                if (error === null) {
                    DerFile.message('');
                    DerFile.loadDer(der);
                } else {
                    DerFile.message(error, 'error');
                }
            });
        });
    },


    /**
	 * Read MP3 contained in ZIP file
	 * @param name: {string} required
	 */
    readAudioFile(name) {
        return new Promise(function(resolve, reject) {
            DerFile.filesByExt.audioFiles[name].async('base64')
            .then(function(base64string) {
                var sound = new Audio('data:audio/wav;base64,' + base64string);
                sound.play();
                sound.onended = function() {
                    resolve();
                };
            }, function() {
                reject();
            });
        });
    },


    /**
	 * Extract files contained in ZIP file
	 * @param files: {Object} required
	 * @param listContainer: {HTMLElement} required
	 * @param callback: {Function}
	 */
    _extractFiles: function(files, listContainer, callback) {
        this.filesByExt = Utils.orderFilesByExt(files);

        if (DerFile.filesByExt.svg.length > 1) {
            FilesList.init({
                files: DerFile.filesByExt.svg,
                container: listContainer,
                actions: DerFile.changeSvg,
                selectedDocument: DerFile.selectedSVG
            });
        }
        DerFile.readFiles(DerFile.filesByExt.xml[0], DerFile.filesByExt.svg[DerFile.selectedSVG], callback);
    },

    readFiles: function(xml, svg, callback) {
        var getJson = new Promise(function(resolve, reject) {
            xml.async('string')
            .then(function(data) {
                var node = Utils.parseXml(data);
                var json = Utils.XML2jsobj(node.documentElement);
                resolve(json);
            }, function(error) {
                reject(error);
            });
        });

        var getSvg = new Promise(function(resolve, reject) {
            svg.async('string')
            .then(function(data) {
                resolve({svg: data});
            }, function(error) {
                reject(error);
            });
        });

        Promise.all([getJson, getSvg]).then(function(values) {
            var der = {};
            Object.assign(der, values[0], values[1]);
            if (callback) {
                callback(null, der);
            }
        }, function() {
            if (callback) {
                callback('Fichier non valide, aucun document en relief n\'a été trouvé dans le ZIP');
            }
        });
    },

    changeSvg: function(index) {
        DerFile.selectedSVG = index;
        FilesList.changeFile(index);
        DerFile.readFiles(DerFile.filesByExt.xml[0], DerFile.filesByExt.svg[index], function(error, der) {
            DerFile.loadDer(der);
        });
    },


    /**
	 * Once all files are ready, load DER on DOM
	 * @param der: {Object} required
	 * @param container: {HTMLElement} required
	 * @param tts: {Function}
	 */
    loadDer: function(der) {
        if (der.svg !== undefined) {
            var svg = document.createElement('div');

            DerFile.layout.derContainer.innerHTML = der.svg;
        } else {
            DerFile.message('Aucun SVG trouvé', 'error');
        }

        if (der.pois.poi !== undefined) {
            if (DerFile.mode === 'explore') {
                this.attachPoiActions(der.pois.poi);
            } else {
                var poi = der.pois.poi[1]
                var id = poi.id.split('-').pop();
                var elementToFind = document.querySelectorAll('[data-link="' + id + '"]')[0];
                DerSearch.setSearchEvents(elementToFind, DerFile.layout.derContainer, DerFile.tts);
            }
        } else {
            DerFile.message('Aucun JSON trouvé', 'error');
        }
    },

    attachPoiActions: function(pois) {
        pois.map(function(poi) {
            var id = poi.id.split('-').pop();
            var poiEl = document.querySelectorAll('[data-link="' + id + '"]')[0];
            if (poiEl !== undefined) {
                DerExplore.setExploreEvents(poiEl, poi.actions.action, DerFile.readAudioFile, DerFile.tts);
            }
        });
    }
};

module.exports = DerFile;
