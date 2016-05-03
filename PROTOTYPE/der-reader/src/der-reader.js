require('./css/styles.css');

var DerFile = require('./der.file.js');
var DerForm = require('./der.form.js');
var TouchEvents = require('./der.events.js');

var DerReader = {
    /**
	 * Initialise DER Reader
	 * @param {Object} options
     * {
     *     container: {HTMLElement}
     *     der: {Object} required
     *     tts: {Function} required
     * }
	 */
    init: function(options) {
        options = options || {};
        this.container = options.container || createContainer('container');
        this.der = options.der;
        this.tts = options.tts;

        DerForm.init();
        DerFile.loadDerFile(this.der, this.container, function() {
            DerReader.der.pois.map(function(poi) {
                var poiEl = document.getElementById(poi.id);
                if (poiEl !== null) {
                    TouchEvents.init(poiEl, poi.actions, DerReader.tts);
                }
            });
        });

        return this;
    }
};

function createContainer(id) {
    var container = document.createElement('div');
    container.setAttribute('id', id);
    document.body.appendChild(container);
    return container;
}

module.exports = DerReader;
