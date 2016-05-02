var DerForm = function() {

    this._createForm = function() {
        var el = document.createElement('form');
        document.body.appendChild(el);
        el.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('ok');
        });
        return el;
    };

    this._createInputFile = function() {
        var el = document.createElement('input');
        el.setAttribute('type', 'file');
        this.container.appendChild(el);
        return el;
    };

    this._createInputSubmit = function() {
        var el = document.createElement('input');
        el.setAttribute('type', 'submit');
        el.setAttribute('value', 'Envoyer');
        this.container.appendChild(el);
        return el;
    };

    this.container = this._createForm();
    this.file = this._createInputFile();
    this.submit = this._createInputSubmit();


    return this;
};

module.exports = DerForm;
