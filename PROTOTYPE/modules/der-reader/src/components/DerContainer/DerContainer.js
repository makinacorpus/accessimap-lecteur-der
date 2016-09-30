var Utils = require('./Utils.js');
var JSZip = require('jszip');

var Explore = require('./DerContainer-explore.js');
var Search = require('./DerContainer-search.js');

var React = require('react');

var DerContainer = React.createClass({
  getInitialState: function() {
    return {
    }
  },

  componentWillMount: function() {
    this.setDerFile();
  },

  componentWillReceiveProps: function(nextProps) {
    const oldProps = this.props;
    this.props = nextProps;
    if (oldProps.derFile !== nextProps.derFile) {
      this.setDerFile();
    }
    if (oldProps.selectedDocument !== nextProps.selectedDocument) {
      this.changeDocument();
    }
    this.setDerActions();
  },

  setDerFile: function() {
    const {derFile} = this.props;
    if (typeof derFile === 'string') {
      Utils.getFileObject(derFile, file => {
        this.openDerFile(file);
      });
    } else {
      this.openDerFile(derFile);
    }
  },

  openDerFile: function(file) {
    if (file.type.split('.').pop() !== 'application/zip') {
      this.props.message('Fichier non valide, le fichier envoyé doit être au format ZIP', 'error');
    }
    var new_zip = new JSZip();
    new_zip.loadAsync(file)
    .then(zip => {
      this._extractFiles(zip.files).then((der) => {
        this.props.message('');
        this.props.setDer(der);
        this.loadDer(der);
      }, (error) => {
        this.props.message(error, 'error');
      });
    });
  },


  /**
  * Read MP3 contained in ZIP file
  * @param name: {string} required
  */
  readAudioFile: function(name) {
    return new Promise((resolve, reject) => {
      this.state.filesByExt.audioFiles[name].async('base64')
      .then(function(base64string) {
        var sound = new Audio('data:audio/wav;base64,' + base64string);
        sound.play();
        sound.onended = function() {
          resolve();
        };
      }, function() {
        reject();
      });
    });
  },


  /**
  * Extract files contained in ZIP file
  * @param files: {Object} required
  * @param listContainer: {HTMLElement} required
  * @param callback: {Function}
  */
  _extractFiles: function(files) {
    this.setState({filesByExt: Utils.orderFilesByExt(files)});

    if (this.state.filesByExt.svg.length > 1) {
      this.props.setFilesList(this.state.filesByExt.svg);
    }
    return new Promise((resolve, reject) => {
      this.readFiles(this.state.filesByExt.xml[0], this.state.filesByExt.svg[this.props.selectedDocument]).then(res => {
        var der = Object.assign(res[0], res[1]);
        resolve(der);
      }, (err) => {
        reject(err);
      });
    });
  },

  readFiles: function(xml, svg) {
    var getJson = new Promise(function(resolve, reject) {
      xml.async('string')
      .then(function(data) {
        var node = Utils.parseXml(data);
        var json = Utils.XML2jsobj(node.documentElement);
        resolve(json);
      }, function(error) {
        reject(error);
      });
    });

    var getSvg = new Promise(function(resolve, reject) {
      svg.async('string')
      .then(function(data) {
        resolve({svg: data});
      }, function(error) {
        reject(error);
      });
    });

    return new Promise((resolve, reject) => {
      Promise.all([getJson, getSvg]).then(function(values) {
        resolve([values[0], values[1]]);
      }, function() {
        reject('Fichier non valide, aucun document en relief n\'a été trouvé dans le ZIP');
      });
    });
  },

  changeDocument: function() {
    const {selectedDocument} = this.props;
    this.readFiles(this.state.filesByExt.xml[0], this.state.filesByExt.svg[selectedDocument], (error, der) => {
      this.props.setDer(der);
      this.loadDer(der);
    });
  },


  /**
  * Once all files are ready, load DER on DOM
  * @param der: {Object} required
  * @param container: {HTMLElement} required
  * @param tts: {Function}
  */
  loadDer: function(der) {
    if (der.svg !== undefined) {
      this.refs.container.innerHTML = der.svg
    } else {
      this.props.message('Aucun SVG trouvé', 'error');
    }

    if (der.pois.poi === undefined) {
      this.props.message('Aucun JSON trouvé', 'error');
    } else {
      this.setDerActions();
    }
  },

  setDerActions: function() {
    const {mode, der, tts, searchableElement, message} = this.props;
    if (der.pois) {
      switch(mode) {
      case 'explore':
        Explore.setExploreEvents(der.pois, this.readAudioFile, tts);
        Search.removeEventsListener(this.refs.container);
        break;
      case 'search':
        Search.setSearchEvents(searchableElement, this.refs.container, der.pois, message);
        Explore.removeExploreEvents();
      }
    }
  },

  render: function() {
    return (
      <div className="der-container" ref="container">
      </div>
    );
  }
});

module.exports = DerContainer;
