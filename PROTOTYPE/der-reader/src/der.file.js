var JSZip = require('jszip');
var Utils = require('./der.utils.js');
var TouchEvents = require('./der.events.js');

var Options = {};

var DerFile = {
    getFile: function(file) {
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

    openDerFile: function(file, message) {
        Options.message = message || Options.message;

        return new Promise(function(resolve, reject) {
            if (file.type.split('.').pop() !== 'application/zip') {
                Options.message('Fichier non valide, le fichier envoyé doit être au format ZIP', 'error', 'error');
            }
            var new_zip = new JSZip();
            new_zip.loadAsync(file)
            .then(function(zip) {
                DerFile._extractFiles(zip.files, function(error, der) {
                    if (error === null) {
                        Options.message('');
                        resolve(der);
                    } else {
                        console.log('ici');
                        Options.message(error, 'error');
                    }
                });
            });
        });
    },

    readAudioFile(name) {
        return new Promise(function(resolve, reject) {
            DerFile.audioFiles[name].async('base64')
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

    _extractFiles: function(files, callback) {
        var getJson, getSvg;
        this.audioFiles = {}; // ZipObjects of audio files

        for (var file in files) {
            var ext = file.split('.').pop();

            if(files[file].dir === true) {
                this.dir = files[file].name;
            }

            if (ext === 'xml') {
                getJson = new Promise(function(resolve, reject) {
                    files[file].async('string')
                    .then(function(data) {
                        var node = Utils.parseXml(data);
                        var json = Utils.XML2jsobj(node.documentElement);
                        resolve(json);
                    }, function(error) {
                        reject(error);
                    });
                });
            }

            if (ext === 'svg') {
                getSvg = new Promise(function(resolve, reject) {
                    files[file].async('string')
                    .then(function(data) {
                        resolve({svg: data});
                    }, function(error) {
                        reject(error);
                    });
                });
            }

            if (ext === 'mp3') {
                name = files[file].name.replace(this.dir, '');
                this.audioFiles[name] = files[file];
            }
        }

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

    loadDer(der, container, tts) {
        this.tts = tts || this.tts;
        this.container = container || this.container;

        if (der.svg !== undefined) {
            this.container.innerHTML = der.svg;
        } else {
            Options.message('Aucun SVG trouvé', 'error');
        }

        if (der.pois.poi !== undefined) {
            der.pois.poi.map(function(poi) {
                var id = poi.id.split('-').pop();
                var poiEl = document.querySelectorAll('[data-link="' + id + '"]')[0];
                if (poiEl !== undefined) {
                    TouchEvents.init(poiEl, poi.actions.action, DerFile.readAudioFile, this.tts);
                }
            });
        } else {
            Options.message('Aucun JSON trouvé', 'error');
        }
    }
};

module.exports = DerFile;
