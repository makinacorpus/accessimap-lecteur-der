require('!style!css!sass!./scss/styles.scss');

var DerContainer = require('./components/DerContainer/DerContainer.js');
var Menu = require('./components/Menu/Menu.js');
var Message = require('./components/Message/Message.js');
var FastClick = require('fastclick');
var TouchEmulator = require('hammer-touchemulator');

var React = require('react');
var ReactDOM = require('react-dom');


var App = React.createClass({
  getInitialState: function() {
    return {
      message: '',
      mode: DerReader.options.defaultMode,
      derFile: DerReader.options.derFile,
      selectedDocument: 0
    }
  },

  showMessage: function(text, type) {
    this.setState({ message: {text: text, type: type} });
  },

  setFilesList: function(files) {
    this.setState({files: files});
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
    return (
      <div className="container">

        <Message text={this.state.message.text} type={this.state.message.type} />

        <DerContainer
          setFilesList={this.setFilesList}
          selectedDocument={this.state.selectedDocument}
          message={this.showMessage}
          tts={DerReader.options.tts}
          mode={this.state.mode}
          derFile={this.state.derFile} />

        <Menu
          files={this.state.files}
          message={this.showMessage}
          mode={this.state.mode}
          selectedDocument={this.state.selectedDocument}
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
    TouchEmulator();

    ReactDOM.render(
      <App options={options} />,
      document.getElementById(options.container)
    );

  }
};

module.exports = DerReader;
