var Utils = require('./Utils.js');
var JSZip = require('jszip');

var Explore = require('./DerContainer-explore.js');
var Search = require('./DerContainer-search.js');

var React = require('react');

var DerContainer = React.createClass({
  getInitialState: function() {
    return {
      currentSound: null
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
      if (this.state.currentSound) {
        this.state.currentSound.pause();
      }
      this.state.filesByExt.audioFiles[name].async('base64')
      .then(base64string => {
        let sound = new Audio('data:audio/wav;base64,' + base64string);
        this.setState({
          currentSound: sound
        });
        this.state.currentSound.play();
        this.state.currentSound.onended = () => {
          resolve(this.state.currentSound);
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
      this.readFiles(this.state.filesByExt.xml[0], this.state.filesByExt.svg[this.props.selectedDocument]).then(der => {
        resolve(der);
      }, (err) => {
        reject(err);
      });
    });
  },

  readFiles: function(xml, svg) {
    let der = {};

    var getJson = new Promise(function(resolve, reject) {
      xml.async('string')
      .then(function(data) {
        var node = Utils.parseXml(data);
        var json = Utils.XML2jsobj(node.documentElement);

        der['filters'] = json.filters;
        der['pois'] = json.pois;

        resolve();
      }, function(error) {
        reject(error);
      });
    });

    var getSvg = new Promise(function(resolve, reject) {
      svg.async('string')
      .then(function(data) {
        der['svg'] = data;
        resolve();
      }, function(error) {
        reject(error);
      });
    });

    return new Promise((resolve, reject) => {
      Promise.all([getJson, getSvg]).then(function() {
        resolve(der);
      }, function() {
        reject('Fichier non valide, aucun document en relief n\'a été trouvé dans le ZIP');
      });
    });
  },

  changeDocument: function() {
    const {selectedDocument} = this.props;
    this.readFiles(this.state.filesByExt.xml[0], this.state.filesByExt.svg[selectedDocument]).then(der => {
      this.props.setDer(der);
      this.loadDer(der);
    }, err => {
      this.props.message(err, 'error');
    });
  },


  /**
  * Once all files are ready, load DER on DOM
  * @param der: {Object} required
  * @param container: {HTMLElement} required
  * @param tts: {Function}
  */
  loadDer: function(der) {
    if (der.svg && der.svg.length) {
      this.refs.container.innerHTML = der.svg
    } else {
      this.props.message('Aucun SVG trouvé', 'error');
    }
    if (der.pois.poi === undefined) {
      this.props.message('Ce document ne contient aucune interaction', 'error');
    } else {
      this.setDerActions();
    }
  },

  setDerActions: function() {
    const {mode, der, tts, searchableElement, message} = this.props;
    if (der.pois && der.pois.poi) {
      let exploreParams = {
        pois: der.pois.poi,
        readFunction: this.readAudioFile,
        tts: tts,
        filter: this.props.filter
      };
      switch(mode) {
      case 'explore':
        Explore.setExploreEvents(exploreParams);
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
