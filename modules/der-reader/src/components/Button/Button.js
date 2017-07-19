require('!style!css!./Button.css')
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  touchEvent,
  touchStartHandler
} from '../../services/touchevents.js'


class Button extends Component{
  constructor(props) {
    super(props)
    this.state = {
      label: this.props.open ? 'Fermer' : this.props.labelClosed
    }
  }

  componentDidMount() {
    const element = document.getElementById(this.props.id);

    // For touch events (touch screen)
    const dispatchEvents = e => {
      let eventType = touchEvent.getType(e)
      if (eventType === 'click') {
        this.handleClick(e)
      }
      if (eventType === 'dblclick') {
        this.handleDoubleClick(e)
      }
    }
    
    element.ontouchstart = dispatchEvents
    element.onclick = dispatchEvents
  }

  componentWillReceiveProps() {
    this.setState({
      label: this.props.open ? 'Fermer' : this.props.labelClosed
    })
  }

  handleClick = e => {
    const {config} = this.props
    let text = this.props.open ? this.props.labelOpened : e.target.innerText
    config.tts.speak(text)
  }

  handleDoubleClick = () => {
    const {config} = this.props
    config.tts.cancel()
    this.props.toggleMenu(this.props.id)
  }

  render() {
    return (
      <button 
        id={this.props.id} 
        type="button" 
        className="button fill black"
      >
        {this.state.label}
      </button>
    )
  }
}

Button.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Button