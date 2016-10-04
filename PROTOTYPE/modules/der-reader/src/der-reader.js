require('!style!css!sass!./der-reader.scss');

const ScreenReader = require('./components/ScreenReader/ScreenReader.js');
const DerContainer = require('./components/DerContainer/DerContainer.js');
const Message = require('./components/Message/Message.js');
const Button = require('./components/Button/Button.js');
const MenuContainer = require('./components/Menu/Menu.container.js');
const FastClick = require('fastclick');
// const TouchEmulator = require('hammer-touchemulator');

const React = require('react');
const ReactDOM = require('react-dom');

import { Router, hashHistory } from 'react-router';


const App = React.createClass({

  getInitialState: function() {
    return {
      message: '',
      mode: DerReader.options.defaultMode,
      derFile: DerReader.options.derFile,
      selectedDocument: 1,
      der: [],
      searchableElement: null
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

  render: function() {
    const {message, der, selectedDocument, mode, derFile, searchableElement} = this.state;
    var childrenWithProps
    if (this.props.children) {
      childrenWithProps = React.cloneElement(this.props.children, {options: this.state}); 
    }

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

        { childrenWithProps || '' }

        <Button
          id="menuButton"
          type="button"
          className="fill red open-menu"
          value="Menu"
          onDoubleClick={() => hashHistory.push('menu')} />

      </div>
    );
  }
});
const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'menu', component: MenuContainer },
  ]
};

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

    console.log(location);

    ScreenReader.init(this.options.tts, this.options.vibrate);
    FastClick.attach(document.body, {});
    // TouchEmulator();

    ReactDOM.render(
      <Router routes={routes} history={hashHistory} />,
      document.getElementById(options.container)
    );

  }
};

module.exports = DerReader;
