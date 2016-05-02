var Der = require('./der.js');

function DerReader(options) {
    options = options || {};
    return new Der(options);
}

module.exports = DerReader;
