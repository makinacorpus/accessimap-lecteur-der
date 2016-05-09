var DerLayout = require('./der.layout.js');
var DerFile = require('./der.file.js');
var DerForm = require('./der.form.js');
var Utils = require('./der.utils.js');

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
        this._setOptions(options);
        this.container = options.container || DerLayout.createContainer('container');
        this.derContainer = DerLayout.createDerContainer(this.container);
        this.messageContainer = DerLayout.createMessageContainer(this.container);
        this.formContainer = DerLayout.createForm(this.container);

        DerForm.init(this.formContainer, this.message);

        Utils.getFileObject(this.derFile, function (file) {
            DerFile.openDerFile(file, DerReader.message).then(function(der) {
                DerFile.loadDer(der, DerReader.derContainer, DerReader.tts);
            });
        });
        return this;
    },

    message: function(message, type) {
        Utils.message(message, type, DerReader.messageContainer);
    },

    _setOptions(options) {
        options = options || {};
        this.derFile = options.derFile;
        this.tts = options.tts;
    }
};

module.exports = DerReader;
