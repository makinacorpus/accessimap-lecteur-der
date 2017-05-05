import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from '../../../components/Navigation/Navigation.js'
import CalibrateCanvas from './Calibrate'

const formats = ['A3', 'A4', 'A5', undefined] // Last item is undefined for return button

class CalibrateMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calibrateMode: false,
      totemMarker: null,
      defaultFormat: props.config.format,
      index: formats.indexOf(props.config.format)
    }
  }

  setTotem(o) {
    this.setState({totemMarker: o})
  }

  handleAction() {
    const format = this.props.config.format
    const index = formats.indexOf(format)
    let path = this.props.route.childRoutes[index].path

    if (path === 'back') {
      this.props.actions.toggleMenu('menu', 'Fermeture du menu')
    }
    else if (format) {
      this.setState({calibrateMode: true})
      switch(format) {
      case 'A3':
        this.setTotem({w:42.0/2.54,h:29.7/2.54, name: 'A3'})
        break
      case 'A4':
        this.setTotem({w:29.7/2.54,h:21.0/2.54, name: 'A4'})
        break
      case 'A5':
        this.setTotem({w:21.0/2.54,h:14.8/2.54, name: 'A5'})
        break
      default:
        break
      }
    } else {
      this.context.router.push('menu/calibrate/' + path)
    }
  }

  changeActiveMenu(index) {
    const format = this.props.route.childRoutes[index].format
    if (format) {
      this.props.actions.setOptionFormat(format)
    } else {
      this.props.actions.setOptionFormat(this.state.defaultFormat)
    }
    this.setState({index: index})
  }

  read(text) {
    this.props.config.tts.speak(text)
  }

  render() {
    if (this.state.calibrateMode) {
      return (
        <CalibrateCanvas totemMarker={this.state.totemMarker}></CalibrateCanvas>
      )
    }
    return (
      <Navigation
        action={() => this.handleAction()}
        index={this.state.index}
        items={this.props.route.childRoutes}
        changeIndex={index => this.changeActiveMenu(index)}
        read={text => this.read(text)}
        >
      </Navigation>
    )
  }
}

CalibrateMenu.contextTypes = {
  router: PropTypes.object.isRequired
}

export default CalibrateMenu