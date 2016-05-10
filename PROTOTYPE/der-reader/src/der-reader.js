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
     *     derFile: {string (zip file)} required
     *     tts: {Function} required
     * }
	 */
    init: function(options) {
        this._setOptions(options);
        this.layout = DerLayout.getLayout(options.container);

        DerForm.init(DerReader.layout.formContainer, this.message);

        Utils.getFileObject(this.derFile, function (file) {
            DerFile.openDerFile(file, DerReader.message).then(function(der) {
                DerFile.loadDer(der, DerReader.layout.derContainer, DerReader.tts);
            });
        });
        return this;
    },

    message: function(message, type) {
        Utils.message(message, type, DerReader.layout.messageContainer);
    },

    _setOptions(options) {
        options = options || {};
        this.derFile = options.derFile;
        this.tts = options.tts;
    }
};

module.exports = DerReader;
