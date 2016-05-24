require('!style!css!sass!./der-reader.scss');

var DerContainer = require('./components/DerContainer/DerContainer.js');
var Menu = require('./components/Menu/Menu.js');
var Message = require('./components/Message/Message.js');
var FastClick = require('fastclick');
// var TouchEmulator = require('hammer-touchemulator');

var React = require('react');
var ReactDOM = require('react-dom');


var App = React.createClass({
  getInitialState: function() {
    return {
      message: '',
      mode: DerReader.options.defaultMode,
      derFile: DerReader.options.derFile,
      selectedDocument: 0,
      der: []
    }
  },

  showMessage: function(text, type) {
    this.setState({ message: {text: text, type: type} });
  },

  setFilesList: function(files) {
    this.setState({files: files});
  },

  setDer: function(der) {
    this.setState({der: der});
  },

  changeDerFile: function(file) {
    this.setState({derFile: file, selectedDocument: 0});
  },

  changeDocument: function(fileIndex) {
    this.setState({selectedDocument: fileIndex});
  },

  changeMode: function(mode) {
    this.setState({mode: mode});
  },

  render: function() {
    const {message, der, selectedDocument, mode, derFile, files} = this.state;

    return (
      <div className="container">

        <Message text={message.text} type={message.type} />

        <DerContainer
          setFilesList={this.setFilesList}
          setDer={this.setDer}
          der={der}
          selectedDocument={selectedDocument}
          message={this.showMessage}
          tts={DerReader.options.tts}
          mode={mode}
          derFile={derFile} />

        <Menu
          files={files}
          message={this.showMessage}
          mode={mode}
          der={der}
          selectedDocument={selectedDocument}
          changeDerFile={this.changeDerFile}
          changeDocument={this.changeDocument}
          changeMode={this.changeMode} />

      </div>
    );
  }
});


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
    this.options = options;
    FastClick.attach(document.body, {});
    // TouchEmulator();

    ReactDOM.render(
      <App options={options} />,
      document.getElementById(options.container)
    );

  }
};

module.exports = DerReader;
