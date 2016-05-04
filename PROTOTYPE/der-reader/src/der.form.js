var JSZip = require('jszip');

var DerForm = {
    init: function(reader) {
        this.container = DerForm._createForm(reader);
        this.fileInput = DerForm._createInputFile();
        this.submitButton = DerForm._createInputSubmit();
    },

    _createForm: function(reader) {
        var el = document.createElement('form');
        document.body.appendChild(el);
        el.addEventListener('submit', function(e) {
            e.preventDefault();
            var file = DerForm.fileInput.files[0];
            if (file !== undefined) {
                DerForm._loadNewDer(file, reader);
            } else {
                reader.showMessage('Aucun fichier seléctionné', 'error');
            }
        });
        return el;
    },

    _createInputFile: function() {
        var el = document.createElement('input');
        el.setAttribute('type', 'file');
        this.container.appendChild(el);
        return el;
    },

    _createInputSubmit: function() {
        var el = document.createElement('input');
        el.setAttribute('type', 'submit');
        el.setAttribute('value', 'Envoyer');
        this.container.appendChild(el);
        return el;
    },

    _loadNewDer: function(file, reader) {
        if (file.type.split('.').pop() !== 'application/zip') {
            reader.message('Fichier non valide, le fichier envoyé doit être au format ZIP', 'error');
        }
        var new_zip = new JSZip();
        new_zip.loadAsync(file)
        .then(function(zip) {
            DerForm._extractFiles(zip.files, reader);
        });
    },

    _extractFiles: function(files, reader) {
        for (var file in files) {
            var ext = file.split('.').pop();
            if (ext === 'svg') {
                files[file].async('string')
                .then(function(data) {
                    reader.changeDer({
                        der: {
                            svg: {src: data}
                        }
                    });
                    reader.message('');
                });
                return;
            }
        }
        reader.message('Fichier non valide, aucun document en relief n\'a été trouvé dans le ZIP', 'error');
    }
};



module.exports = DerForm;
