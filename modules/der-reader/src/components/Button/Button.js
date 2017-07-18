require('!style!css!./Button.css')
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component{
  constructor(props) {
    super(props)
    this.state = {
      label: this.props.open ? 'Fermer' : this.props.labelClosed
    }
  }

  componentWillReceiveProps() {
    this.setState({
      label: this.props.open ? 'Fermer' : this.props.labelClosed
    })
  }

  handleClick(e) {
    console.log('menu: handleClick')
    const {config} = this.props
    let text = this.props.open ? this.props.labelOpened : e.target.innerText
    config.tts.speak(text)
  }

  handleDoubleClick() {
    console.log('menu: handleDoubleClick')
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
        onClick={e => this.handleClick(e)} 
        onDoubleClick={() => this.handleDoubleClick()}
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