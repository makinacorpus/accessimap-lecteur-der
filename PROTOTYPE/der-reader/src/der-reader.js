var DerLayout = require('./der.layout.js');
var DerFile = require('./der.file.js');
var DerForm = require('./der.form.js');
var DerMode = require('./der.mode.js');
var Utils = require('./der.utils.js');

var DerReader = {
    /**
	 * Initialise DER Reader
	 * @param {Object} options
     * {
     *     derFile: {string (zip file)} required
     *     tts: {Function} required
     *     defaultMode: {string}
     *     container: {HTMLElement}
     * }
	 */
    init: function(options) {
        this._setOptions(options);
        this.layout = DerLayout.getLayout(options.container);

        DerForm.init(this.layout.formContainer, this.message);
        DerMode.init(this.layout.switchModeContainer, this.mode, this.changeMode);

        Utils.getFileObject(this.derFile, function (file) {
            DerFile.init({
                message: DerReader.message,
                layout: DerReader.layout,
                tts: DerReader.tts,
                mode: DerReader.mode
            });
            DerFile.openDerFile(file);
        });

        return this;
    },

    message: function(message, type) {
        Utils.message(message, type, DerReader.layout.messageContainer);
    },

    changeMode: function(mode) {
        this.mode = mode;
    },

    _setOptions(options) {
        options = options || {};
        this.derFile = options.derFile;
        this.tts = options.tts;
        this.mode = options.defaultMode || 'explore';
    }
};

module.exports = DerReader;
