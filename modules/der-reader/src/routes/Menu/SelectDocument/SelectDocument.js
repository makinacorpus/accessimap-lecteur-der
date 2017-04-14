require('!style!css!sass!./SelectDocument.scss')

import React, { Component } from 'react'
import Navigation from '../../../components/Navigation/Navigation.js'

class SelectDocument extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: this.props.options.selectedDocument
    }
  }

  handleAction(index) {
    this.setState({index})
  }

  changeDocument() {
    this.props.actions.changeDocument(this.state.index)
    this.props.actions.toggleMenu('menu', 'Fermeture du menu')
  }

  read(text) {
    this.props.config.tts.speak(text)
  }

  render() {
    const {files} = this.props.options

    return (
      <Navigation
        action={this.changeDocument}
        title="Ce document contient plusieurs cartes. Laquelle voulez-vous afficher ?"
        read={this.read}
        index={this.state.index}
        items={files}
        changeIndex={this.handleAction}
      ></Navigation>
    )
  }
}

export default SelectDocument