require('./css/styles.css');

var DerFile = require('./der.file.js');
var DerForm = require('./der.form.js');

var DerReader = {
    /**
	 * Initialise DER Reader
	 * @param {Object} options
     * {
     *     container: {HTMLElement}
     *     der: {
     *         svg: {src: {string}, type: 'path' or 'src' (default src)},
     *         json: {src: {string}, type: 'path' or 'src' (default src)},
     *     } required
     *     tts: {Function} required
     * }
	 */
    init: function(options) {
        this.setOptions(options);
        this.container = options.container || createContainer('container');
        DerForm.init(this);
        DerFile.loadDerFile(this.der, this.container, this.tts);
        return this;
    },

    setOptions(options) {
        options = options || {};
        this.der = options.der;
        this.tts = options.tts;
    },

    changeDer: function(options) {
        this.setOptions(options);
        DerFile.loadDerFile(this.der, this.container, this.tts);
    }
};

function createContainer(id) {
    var container = document.createElement('div');
    container.setAttribute('id', id);
    document.body.appendChild(container);
    return container;
}

module.exports = DerReader;
