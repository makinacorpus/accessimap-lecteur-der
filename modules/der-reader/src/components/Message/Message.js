require('!style!css!sass!./Message.scss');

const React = require('react');

const Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        <span className={this.props.type}>
          {this.props.text}
        </span>
      </div>
    );
  }
});

module.exports = Message;
