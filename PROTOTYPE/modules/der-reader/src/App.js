require('!style!css!sass!./der-reader.scss');

const DerContainer = require('./components/DerContainer/DerContainer.js');
const Message = require('./components/Message/Message.js');
const Button = require('./components/Button/Button.js');
const React = require('react');
import { hashHistory } from 'react-router';
const App = React.createClass({

  getInitialState: function() {
    return {
      message: '',
      mode: this.props.route.config.defaultMode,
      derFile: this.props.route.config.derFile,
      selectedDocument: 1,
      der: [],
      files: [],
      searchableElement: null,
      tts: this.props.route.config.tts,
      exit: this.props.route.config.exit
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
    var menuLabel = 'Menu';
    var filtresLabel = 'Filtres';
    var childrenWithProps
    if (this.props.children) {
      childrenWithProps = React.cloneElement(this.props.children, {
        options: this.state,
        actions: {
          showMessage: this.showMessage,
          setFilesList: this.setFilesList,
          setDer: this.setDer,
          changeDerFile: this.changeDerFile,
          changeDocument: this.changeDocument,
          changeMode: this.changeMode,
          setSearchableElement: this.setSearchableElement
        }
      });
    }

    return (
      <div className="options.container" ref="app">
        <nav className="nav-buttons">
          <Button
            id="menuButton"
            type="button"
            className="fill black open-menu"
            value={menuLabel}
            onDoubleClick={() => hashHistory.push('menu')} />

          <Button
            id="menuButton"
            type="button"
            className="fill black open-filters"
            value={filtresLabel}
            onDoubleClick={() => hashHistory.push('filters')} />
        </nav>

        <Message text={message.text} type={message.type} />

        <DerContainer
          setFilesList={this.setFilesList}
          setDer={this.setDer}
          der={der}
          selectedDocument={selectedDocument}
          searchableElement={searchableElement}
          message={this.showMessage}
          tts={this.state.tts}
          mode={mode}
          derFile={derFile} />

        { childrenWithProps || '' }

      </div>
    );
  }
});

module.exports = App;
