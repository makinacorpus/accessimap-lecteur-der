var JSZip = require('jszip');
var Utils = require('./der.utils.js');

var DerForm = {
    init: function(reader) {
        this.reader = reader;
        this.container = DerForm._createForm();
        this.fileInput = DerForm._createInputFile();
        this.submitButton = DerForm._createInputSubmit();

        this._addFormListener();
        this._addInputListener();
    },

    _addFormListener: function() {
        console.log(this);
        this.container.addEventListener('submit', function(e) {
            e.preventDefault();
            var file = DerForm.fileInput.files[0];
            if (file !== undefined) {
                DerForm._loadNewDer(file, DerForm.reader);
            } else {
                DerForm.reader.message('Aucun fichier seléctionné', 'error');
            }
        });
    },

    _addInputListener: function() {
        var label	 = this.fileInput.nextElementSibling,
            labelVal = label.innerHTML;

        this.fileInput.addEventListener( 'change', function( e ) {
            var fileName = '';
            if( this.files && this.files.length > 1 ) {
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            } else {
                fileName = e.target.value.split( '\\' ).pop();
            }

            if (fileName) {
                label.querySelector( 'span' ).innerHTML = fileName;
            } else {
                label.innerHTML = labelVal;
            }
        });
    },

    _createForm: function() {
        var aside = document.createElement('aside');
        aside.setAttribute('class', 'menu');
        var form = document.createElement('form');
        aside.appendChild(form);
        this.reader.container.appendChild(aside);
        return form;
    },

    _createInputFile: function() {
        var input = document.createElement('input');
        Utils.setAttributes(input, {
            'type': 'file',
            'id': 'file',
            'class': 'inputfile'
        });
        var label = document.createElement('label');
        label.setAttribute('for', 'file');
        var span = document.createElement('span');
        var strong = document.createElement('strong');
        strong.innerHTML = 'Choisir un fichier';
        label.appendChild(span);
        label.appendChild(strong);
        this.container.appendChild(input);
        this.container.appendChild(label);
        return input;
    },

    _createInputSubmit: function() {
        var el = document.createElement('input');
        Utils.setAttributes(el, {
            'type': 'submit',
            'class': 'inputsubmit',
            'value': 'Envoyer'
        });
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

    _readFile: function(file) {
        return new Promise(function(resolve) {
            file.async('string')
            .then(function(data) {
                resolve(data);
            });
        });
    },

    _extractFiles: function(files, reader) {
        var newDer = {};

        var svg, xml;

        for (var file in files) {
            var ext = file.split('.').pop();
            if (ext === 'svg') {
                svg = files[file];
            }
            if (ext === 'xml') {
                xml = files[file];
            }
        }

        Promise.all([this._readFile(svg), this._readFile(xml)]).then(function(values) {
            Object.assign(newDer, {svg: {src: values[0]}});

            // TODO read xml file
            reader.message('');
            reader.changeDer({
                der: newDer
            });
        }, function() {
            reader.message('Fichier non valide, aucun document en relief n\'a été trouvé dans le ZIP', 'error');
        });
    }
};



module.exports = DerForm;
