var Utils = require('./der.utils.js');
var DerFile = require('./der.file.js');

var DerForm = {
    init: function(container, message) {
        this.container = DerForm._createForm(container);
        this.fileInput = DerForm._createInputFile();
        this.submitButton = DerForm._createInputSubmit();

        this._addFormListener(message);
        this._addInputListener();
    },

    _addFormListener: function(message) {
        this.container.addEventListener('submit', function(e) {
            e.preventDefault();
            var file = DerForm.fileInput.files[0];
            if (file !== undefined) {
                DerFile.openDerFile(file).then(function(der) {
                    DerFile.loadDer(der);
                });
            } else {
                message('Aucun fichier seléctionné', 'error');
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

    _createForm: function(container) {
        var aside = document.createElement('aside');
        aside.setAttribute('class', 'menu');
        var form = document.createElement('form');
        aside.appendChild(form);
        container.appendChild(aside);
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
    }
};



module.exports = DerForm;
