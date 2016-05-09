require('!style!css!sass!./scss/styles.scss');

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
        this.container = options.container || createContainer('container');
        this.derContainer = createDerContainer(this.container);
        this.messageContainer = createMessageContainer(this.container);

        DerForm.init(this.container, this.message);

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

function createContainer(className) {
    var container = document.createElement('div');
    container.setAttribute('class', className);
    document.body.appendChild(container);
    return container;
}

function createDerContainer(container) {
    var derContainer = document.createElement('div');
    derContainer.setAttribute('class', 'der-container');
    container.appendChild(derContainer);
    return derContainer;
}

function createMessageContainer(container) {
    var messageContainer = document.createElement('div');
    messageContainer.setAttribute('id', 'message');
    container.parentNode.insertBefore(messageContainer, container);
    return messageContainer;
}

module.exports = DerReader;
