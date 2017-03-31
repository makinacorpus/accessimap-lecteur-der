import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router';
import { setMessage, setDerFile, setFilter, setFilesList, setDer } from '../store/actions';

const DerContainer = require('./../components/DerContainer/DerContainer.js');
const Message = require('./../components/Message/Message.js');
const Button = require('./../components/Button/Button.js');

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.route.config.defaultMode,
      searchableElement: null,
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

  changeDerFile(file) {
    if (file !== null) {
      this.context.router.push('/');
      this.state.tts.speak('Nouveau document sélectionné, fermeture du menu').then(() => {
        this.toggleMenu('menu');
        this.props.setDerFile(file);
      });
    } else {
      this.state.tts.speak('Aucun fichier sélectionné, retour au menu');
      this.context.router.push('/menu');
    }
  }

  changeMode(mode) {
    this.setState({mode: mode});
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
    const { mode, searchableElement } = this.state;
    const { der, selectedDocument, derFile, activeFilter } = this.props;
    let navigation;
    if (this.props.children) {
      navigation = React.cloneElement(this.props.children, {
        options: {
          tts: this.state.tts, 
          der, selectedDocument, derFile, activeFilter
        },
        actions: {
          toggleMenu: this.toggleMenu.bind(this),
          showMessage: (text, type) => this.showMessage(text, type),
          setFilesList: files => this.props.setFilesList(files),
          setDer: der => this.props.setDer(der),
          changeDerFile: file => this.changeDerFile(file),
          changeDocument: this.changeDocument,
          changeMode: this.changeMode,
          changeFilter: filter => this.props.setFilter(filter),
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
          setFilesList={files => this.props.setFilesList(files)}
          setDer={der => this.props.setDer(der)}
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
  return state.appReducer
};

const mapDispatchToProps = dispatch => {
  return {
    setMessage: message => dispatch(setMessage(message)),
    setDerFile: file => dispatch(setDerFile(file)),
    setFilter: filter => dispatch(setFilter(filter)),
    setFilesList: files => dispatch(setFilesList(files)),
    setDer: files => dispatch(setDer(files))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);