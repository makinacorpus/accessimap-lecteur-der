import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from '../../components/Navigation/Navigation.js'

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMenu: 0
    }
  }

  handleAction() {
    if (this.props.route.childRoutes[this.state.activeMenu]) {
      let path = this.props.route.childRoutes[this.state.activeMenu].path

      if (path === 'quit') {
        this.props.config.exit.fn()
      }

      else {
        this.context.router.push('menu/' + path)
      }
    }
  }

  changeActiveMenu(index) {
    this.setState({activeMenu: index})
  }

  read(text) {
    this.props.config.tts.speak(text)
  }

  render() {
    return (
      <Navigation
        action={() => this.handleAction()}
        index={this.state.activeMenu}
        items={this.props.route.childRoutes || []}
        changeIndex={index => this.changeActiveMenu(index)}
        read={text => this.read(text)}
        >
      </Navigation>
    )
  }
}

MainMenu.contextTypes = {
  router: PropTypes.object.isRequired
}

export default MainMenu
