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

  handleAction = () => {
    if (this.props.route.childRoutes[this.state.activeMenu]) {
      let path = this.props.route.childRoutes[this.state.activeMenu].path

      if (path === 'quit') {
        this.props.config.exit.fn()
      } else if (path === 'file') {
        // open dialog
        console.log('file')
      } else {
        this.context.router.push('menu/' + path)
      }
    }
  }

  changeActiveMenu = (index) => {
    this.setState({activeMenu: index})
  }

  read = (text) => {
    this.props.config.tts.speak(text)
  }

  render() {
    return (
      <Navigation
        action={this.handleAction}
        actions={this.props.actions}
        index={this.state.activeMenu}
        items={this.props.route.childRoutes || []}
        changeIndex={this.changeActiveMenu}
        read={this.read}
      />
    )
  }
}

MainMenu.contextTypes = {
  router: PropTypes.object.isRequired
}

export default MainMenu
