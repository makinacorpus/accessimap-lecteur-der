'use strict';

var DerReader = require('./der-reader/src/der-reader.js');
DerReader.openFile({
    svgFile: './der/carte_avec_source.svg',
    jsonFile: './der/interactions.json'
});
