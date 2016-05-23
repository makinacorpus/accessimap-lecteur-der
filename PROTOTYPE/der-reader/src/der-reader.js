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
      derFile: DerReader.options.derFile
    }
  },

  showMessage: function(text, type) {
    this.setState({ message: {text: text, type: type} });
  },

  setFilesList: function(files) {
    this.setState({files: files});
  },

  changeDerFile: function(file) {
    this.setState({derFile: file});
    // console.log(this.state);
  },

  render: function() {
    return (
      <div className="container">

        <Message text={this.state.message.text} type={this.state.message.type} />

        <DerContainer
          setFilesList={this.setFilesList}
          message={this.showMessage}
          tts={DerReader.options.tts}
          mode={this.state.mode}
          derFile={this.state.derFile} />

        <Menu files={this.state.files} message={this.showMessage} changeDerFile={this.changeDerFile} />

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

  },
  //
  //         this.layout = DerLayout.getLayout(options.container);
  //
  //         DerForm.init(this.layout.formContainer, this.message);
  //         // DerMode.init(this.layout.switchModeContainer, this.mode, this.changeMode);
  //
  //         Utils.getFileObject(this.derFile, function (file) {
  //             DerFile.init({
  //                 message: DerReader.message,
  //                 layout: DerReader.layout,
  //                 tts: DerReader.tts,
  //                 mode: DerReader.mode
  //             });
  //             DerFile.openDerFile(file);
  //         });
  //
  //         ReactDOM.render(
  //           <DerReader />,
  //           document.body
  //         );
  //
  //         return this;
  //     },
  //

  //
  //     changeMode: function(mode) {
  //         this.mode = mode;
  //     },
  //
  // _setOptions(options) {
  //     options = options || {};
  //     this.container = options.container;
  //     this.derFile = options.derFile;
  //     this.tts = options.tts;
  //     this.mode = options.defaultMode || 'explore';
  // }
};

module.exports = DerReader;
