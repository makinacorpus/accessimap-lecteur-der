var DerForm = {
    init: function() {
        this.container = DerForm._createForm();
        this.fileInput = DerForm._createInputFile();
        this.submitButton = DerForm._createInputSubmit();
    },

    _createForm: function() {
        var el = document.createElement('form');
        document.body.appendChild(el);
        el.addEventListener('submit', function(e) {
            e.preventDefault();
            var file = DerForm.fileInput.files[0];
            if (file !== undefined) {
                loadNewDer(file);
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
    }
};

function loadNewDer(file) {
    console.log(file);
}

module.exports = DerForm;
