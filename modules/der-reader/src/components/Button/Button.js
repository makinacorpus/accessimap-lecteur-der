require('!style!css!./Button.css')
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Touch from '../../services/touch.js'

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

  componentWillReceiveProps(nextProps) {
    this.setState({
      label: nextProps.open ? 'Fermer' : nextProps.labelClosed
    })
  }

  handleClick = (target) => {
    const {config} = this.props
    let text = this.props.open ? this.props.labelOpened : target.innerText
    config.tts.speak(text);
  }

  handleDoubleClick = (target) => {
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