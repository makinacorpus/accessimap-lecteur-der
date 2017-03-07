import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router';
import { setMessage } from '../store/actions';

const DerContainer = require('./../components/DerContainer/DerContainer.js');
const Message = require('./../components/Message/Message.js');
const Button = require('./../components/Button/Button.js');

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      mode: this.props.route.config.defaultMode,
      derFile: this.props.route.config.derFile,
      selectedDocument: 0,
      der: [],
      files: [],
      searchableElement: null,
      activeFilter: null,
      tts: this.props.route.config.tts,
      exit: this.props.route.config.exit,
      openedMenu: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routes[nextProps.routes.length-1].path === 'file') {
      this.context.router.push('/menu');
    }
  }

  toggleMenu(id, labelOnClose, labelOnOpen) {
    let open = this.state.openedMenu === id;
    this.setState({
      openedMenu: open ? '' : id
    }, () => {
      if (open && labelOnClose) {
        hashHistory.push('/');
        this.state.tts.speak(labelOnClose);
      } else if (labelOnOpen) {
        hashHistory.push(id);
        this.state.tts.speak(labelOnOpen);
      }
    });
  }

  showMessage(text, type) {
    this.props.setMessage({text: text, type: type});
    this.state.tts.speak(text);
  }

  setFilesList(files) {
    this.setState({files: files});
  }

  setDer(der) {
    this.setState({der: der}, () => {
      if (this.state.activeFilter === null) {
        this.changeFilter(der.filters.filter[0]);
      }
    });
  }

  changeDerFile(file) {
    if (file !== null) {
      this.setState({derFile: file, selectedDocument: 0}, () => {
        this.toggleMenu('menu', 'Nouveau document sélectionné, fermeture du menu');
        this.context.router.push('/menu');
      });
    } else {
      this.state.tts.speak('Aucun fichier sélectionné, retour au menu');
      this.context.router.push('/menu');
    }
  }

  changeDocument(fileIndex) {
    this.setState({selectedDocument: fileIndex});
  }

  changeMode(mode) {
    this.setState({mode: mode});
  }

  changeFilter(filter) {
    this.setState({activeFilter: filter});
  }

  setSearchableElement(searchableElement) {
    this.setState({searchableElement: searchableElement});
  }

  getMessage() {
    const {message} = this.props;
    if (message) {
      return <Message text={message.text} type={message.messageType} />
    }
  }

  render() {
    const {der, selectedDocument, mode, derFile, searchableElement, activeFilter} = this.state;
    let navigation;
    if (this.props.children) {
      navigation = React.cloneElement(this.props.children, {
        options: this.state,
        actions: {
          toggleMenu: this.toggleMenu.bind(this),
          showMessage: (text, type) => this.showMessage(text, type),
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
        <Button
          id="menu"
          tts={this.state.tts}
          labelClosed="Menu"
          labelOnClose="Fermeture du menu"
          labelOpened="Fermer le menu"
          labelOnOpen="Ouverture du menu"
          open={this.state.openedMenu === 'menu'}
          toggleMenu={this.toggleMenu.bind(this)}
           />
        <Button
          id="filters"
          tts={this.state.tts}
          labelClosed="Filtres"
          labelOnClose="Fermeture des filtres"
          labelOpened="Fermer les filtres"
          labelOnOpen="Ouverture des filtres"
          open={this.state.openedMenu === 'filters'}
          toggleMenu={this.toggleMenu.bind(this)}
          />
          
        {this.getMessage()}

        <DerContainer
          setFilesList={this.setFilesList}
          setDer={this.setDer}
          der={der}
          selectedDocument={selectedDocument}
          searchableElement={searchableElement}
          message={(text, type) => this.showMessage(text, type)}
          tts={this.state.tts}
          mode={mode}
          filter={activeFilter}
          derFile={derFile} />

        { navigation || '' }

      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.appReducer.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setMessage: message => dispatch(setMessage(message))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);