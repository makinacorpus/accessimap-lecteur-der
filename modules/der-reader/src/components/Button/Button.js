require('!style!css!./Button.css')
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Touch
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

    this.touchEvent = new Touch(element);
    this.touchEvent.onTap(this.handleClick);
    this.touchEvent.onDoubleTap(this.handleDoubleClick);
    this.touchEvent.run();
  }

  componentWillUnmount() {
    this.touchEvent.destroy();
  }

  componentWillReceiveProps() {
    this.setState({
      label: this.props.open ? 'Fermer' : this.props.labelClosed
    })
  }

  handleClick = e => {
    e.stopPropagation();
    
    const {config} = this.props
    let text = this.props.open ? this.props.labelOpened : e.target.innerText
    config.tts.speak(text);
  }

  handleDoubleClick = (e) => {
    e.stopPropagation();

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