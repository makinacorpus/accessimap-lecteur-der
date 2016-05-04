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
                alert('Aucun fichier seléctionné');
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

    _loadNewDer: function(zip, reader) {
        var new_zip = new JSZip();
        new_zip.loadAsync(zip)
        .then(function(zip) {
            for (var file in zip.files) {
                var ext = file.split('.').pop();
                if (ext === 'svg') {
                    zip.files[file].async("string")
                    .then(function(data) {
                        reader.changeDer({
                            der: {
                                svg: {src: data}
                            }
                        })
                        console.log(res);
                    });
                }
            }
        });
    }
};



module.exports = DerForm;
