import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hashHistory } from 'react-router'

import DerContainer from './../components/DerContainer/DerContainer.js'
import Message from './../components/Message/Message.js'
import Button from './../components/Button/Button.js'
import Loader from './../components/Loader/Loader.js'

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      mode: this.props.route.config.defaultMode,
      searchableElement: null,
      openedMenu: ''
    }
  }

  componentWillMount() {
    this.props.setOption('tts', this.props.route.config.tts)
    this.props.setOption('exit', {fn: this.props.route.config.exit})
    this.props.initConfig({format: this.props.route.config.format || this.props.config.format})
    if (this.props.derFile === null && this.props.route.config.derFile !== null) {
      this.props.setDerFile(this.props.route.config.derFile)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routes[nextProps.routes.length-1].path === 'file') {
      this.context.router.push('/menu')
    }
  }

  toggleMenu(id) {
    const route = this.props.routes[this.props.routes.length-1].path
    if (route === id) {
      hashHistory.push('/')
    } else {
      hashHistory.push(id)
    }
  }

  showMessage(text, type) {
    this.props.setMessage({text: text, type: type})
    this.read(text)
  }

  changeDerFile(file) {
    if (file !== null) {
      this.props.isLoading(true)
      this.context.router.push('/')
      this.props.setDerFile(file)
      this.read('Chargement du document').then(() => {
        this.props.isLoading(false)
        this.context.router.push('/')
      })
    } else {
      this.context.router.push('/menu')
    }
  }

  changeMode(mode) {
    this.setState({mode: mode})
  }

  setSearchableElement(searchableElement) {
    this.setState({searchableElement: searchableElement})
  }

  getMessage() {
    const {message} = this.props
    if (message && !!message.text) {
      return <Message text={message.text} type={message.messageType} />
    }
  }

  read(text) {
    if (this.props.config.tts) {
      return this.props.config.tts.speak(text)
    }
  }

  render() {
    const { mode, searchableElement } = this.state
    const { config, der, selectedDocument, derFile, activeFilter } = this.props
    // const route = this.props.routes[this.props.routes.length-1].path
    const pathname = this.props.routing.locationBeforeTransitions.pathname

    let navigation
    if (this.props.children) {
      navigation = React.cloneElement(this.props.children, {
        config: config,
        options: {
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
          setSearchableElement: this.setSearchableElement,
          setOptionFormat: (format) => this.props.setOptionFormat(format)
        }
      })
    }

    // console.log(this.props)
    // console.log(route, route.includes('menu'))

    if (this.props.loading || !this.props.config.tts) {
      return <Loader/>
    }
    return (
      <div className="container" ref="app">
        <Button
          id="menu"
          config={config}
          labelClosed="Menu"
          labelOpened="Fermer le menu"
          open={pathname.includes('menu')}
          toggleMenu={this.toggleMenu.bind(this)}
           />
        {
          this.props.der !== null 
          ? <Button
              id="filters"
              config={config}
              labelClosed="Filtres"
              labelOpened="Fermer les filtres"
              open={pathname.includes('filters')}
              toggleMenu={this.toggleMenu.bind(this)}
            /> 
          : null
        }
          
        {this.getMessage()}

        {
          pathname === '/' 
          ? <DerContainer
              setFilesList={files => this.props.setFilesList(files)}
              setDer={der => this.props.setDer(der)}
              der={der}
              selectedDocument={selectedDocument}
              searchableElement={searchableElement}
              message={(text, type) => this.showMessage(text, type)}
              tts={config.tts}
              mode={mode}
              filter={activeFilter}
              derFile={derFile} 
            /> 
          : null
        }

        { navigation || '' }

      </div>
    )
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
}

export default App