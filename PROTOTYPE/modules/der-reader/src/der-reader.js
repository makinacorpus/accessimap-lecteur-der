require('!style!css!sass!./der-reader.scss');

const ScreenReader = require('./components/ScreenReader/ScreenReader.js');
const DerContainer = require('./components/DerContainer/DerContainer.js');
const Menu = require('./components/Menu/Menu.js');
const Message = require('./components/Message/Message.js');
const FastClick = require('fastclick');
// const TouchEmulator = require('hammer-touchemulator');

const React = require('react');
const ReactDOM = require('react-dom');


const App = React.createClass({

  getInitialState: function() {
    return {
      message: '',
      mode: DerReader.options.defaultMode,
      derFile: DerReader.options.derFile,
      selectedDocument: 1,
      der: [],
      searchableElement: null,
      currentIndexMenu: null
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

  setSearchableElement: function(searchableElement) {
    this.setState({searchableElement: searchableElement});
  },

  setMenu: function(currentIndexMenu) {
    this.setState({
      currentIndexMenu: currentIndexMenu
    });
  },

  render: function() {

    const {message, der, selectedDocument, mode, derFile, files, searchableElement, currentIndexMenu} = this.state;
    
    return (
      <div className="options.container" ref="app">

        <Message text={message.text} type={message.type} />

        <DerContainer
          setFilesList={this.setFilesList}
          setDer={this.setDer}
          der={der}
          selectedDocument={selectedDocument}
          searchableElement={searchableElement}
          message={this.showMessage}
          tts={DerReader.options.tts}
          mode={mode}
          derFile={derFile} />

        <Menu
          files={files}
          message={this.showMessage}
          mode={mode}
          pois={der.pois}
          setSearchableElement={this.setSearchableElement}
          setMenu={this.setMenu}
          searchableElement={searchableElement}
          currentIndex={currentIndexMenu}
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
  *     container: {HTMLElement} required
  *     derFile: {string (zip file)} required
  *     tts: {Function} required
  *     vibrate: {Function} required
  *     defaultMode: {string}
  * }
  */
  init: function(options) {
    this.options = options;

    ScreenReader.init(this.options.tts, this.options.vibrate);
    FastClick.attach(document.body, {});
    // TouchEmulator();

    ReactDOM.render(
      <App options={options} />,
      document.getElementById(options.container)
    );

  }
};

module.exports = DerReader;