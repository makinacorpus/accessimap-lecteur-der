var Utils = require('./der.utils.js');
var DerFile = require('./der.file.js');

var DerForm = {
    init: function(formElement, message) {
        this.formElement = formElement;
        this.fileInput = DerForm._createInputFile();
        this.submitButton = DerForm._createInputSubmit();

        this._addFormListener(message);
        this._addInputListener();
    },

    _addFormListener: function(message) {
        this.formElement.addEventListener('submit', function(e) {
            e.preventDefault();
            var file = DerForm.fileInput.files[0];
            if (file !== undefined) {
                DerFile.openDerFile(file);
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
                label.querySelector('span').innerHTML = fileName;
                label.className = 'fill';
            } else {
                label.innerHTML = labelVal;
                label.className = '';
            }
        });
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
        // var strong = document.createElement('strong');
        // strong.innerHTML = 'Choisir un fichier';
        span.innerHTML = 'Choisir un fichier';
        label.appendChild(span);
        // label.appendChild(strong);
        this.formElement.appendChild(input);
        this.formElement.appendChild(label);
        return input;
    },

    _createInputSubmit: function() {
        var el = document.createElement('input');
        Utils.setAttributes(el, {
            'type': 'submit',
            'class': 'inputsubmit',
            'value': 'Envoyer'
        });
        this.formElement.appendChild(el);
        return el;
    }
};



module.exports = DerForm;
