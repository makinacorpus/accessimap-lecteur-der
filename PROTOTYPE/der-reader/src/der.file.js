var JSZip = require('jszip');
var Utils = require('./der.utils.js');
var TouchEvents = require('./der.events.js');
var FilesList = require('./der.filesList.js');

var Options = {};

var DerFile = {

    /**
	 * Open ZIP and get DER files
	 * @param file: {FileObject} required
     * @param message: {Function} required
     * @param listContainer: {HTMLElement} required
	 */
    openDerFile: function(file, message, listContainer) {
        Options.message = message || Options.message;
        Options.listContainer = listContainer || Options.listContainer;
        Options.selectedSVG = 0;

        return new Promise(function(resolve) {
            if (file.type.split('.').pop() !== 'application/zip') {
                Options.message('Fichier non valide, le fichier envoyé doit être au format ZIP', 'error', 'error');
            }
            var new_zip = new JSZip();
            new_zip.loadAsync(file)
            .then(function(zip) {
                DerFile._extractFiles(zip.files, Options.listContainer, function(error, der) {
                    if (error === null) {
                        Options.message('');
                        resolve(der);
                    } else {
                        Options.message(error, 'error');
                    }
                });
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
                selectedDocument: Options.selectedSVG
            });
        }
        DerFile.readFiles(DerFile.filesByExt.xml[0], DerFile.filesByExt.svg[Options.selectedSVG], callback);
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
        Options.selectedSVG = index;
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
    loadDer(der, container, tts) {
        Options.tts = tts || Options.tts;
        Options.container = container || Options.container;

        if (der.svg !== undefined) {
            Options.container.innerHTML = der.svg;
        } else {
            Options.message('Aucun SVG trouvé', 'error');
        }

        if (der.pois.poi !== undefined) {
            der.pois.poi.map(function(poi) {
                var id = poi.id.split('-').pop();
                var poiEl = document.querySelectorAll('[data-link="' + id + '"]')[0];
                if (poiEl !== undefined) {
                    TouchEvents.init(poiEl, poi.actions.action, DerFile.readAudioFile, Options.tts);
                }
            });
        } else {
            Options.message('Aucun JSON trouvé', 'error');
        }
    }
};

module.exports = DerFile;
