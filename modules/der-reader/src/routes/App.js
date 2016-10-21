const DerContainer = require('./../components/DerContainer/DerContainer.js');
const Message = require('./../components/Message/Message.js');
const ButtonsNavigation = require('./../components/Button/ButtonsNavigation.js');
const React = require('react');

const App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      message: '',
      mode: this.props.route.config.defaultMode,
      derFile: this.props.route.config.derFile,
      selectedDocument: 0,
      der: [],
      files: [],
      searchableElement: null,
      activeFilter: null,
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
    this.setState({der: der}, () => {
      if (this.state.activeFilter === null) {
        this.changeFilter(der.filters.filter[0]);
      }
    });
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

  changeFilter: function(filter) {
    this.setState({activeFilter: filter});
  },

  setSearchableElement: function(searchableElement) {
    this.setState({searchableElement: searchableElement});
  },

  render: function() {
    const {message, der, selectedDocument, mode, derFile, searchableElement, activeFilter} = this.state;
    let navigation;

    if (this.props.children) {
      navigation = React.cloneElement(this.props.children, {
        options: this.state,
        actions: {
          showMessage: this.showMessage,
          setFilesList: this.setFilesList,
          setDer: this.setDer,
          changeDerFile: this.changeDerFile,
          changeDocument: this.changeDocument,
          changeMode: this.changeMode,
          changeFilter: this.changeFilter,
          setSearchableElement: this.setSearchableElement
        }
      });
    }

    return (
      <div className="container" ref="app">
        <ButtonsNavigation tts={this.state.tts} />
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
          filter={activeFilter}
          derFile={derFile} />

        { navigation || '' }

      </div>
    );
  }
});

module.exports = App;
