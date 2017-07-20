require('!style!css!./Message.css');
import React, { Component } from 'react'

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className={this.props.type}>
          {this.props.text}
        </span>
      </div>
    );
  }
}

export default Message