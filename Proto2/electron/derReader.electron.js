'use strict';

var DerReader = require('der-reader');

DerReader.openFile({
    svgFile: './der/carte_avec_source.svg',
    jsonFile: './der/interactions.json'
});
