var React = require('react');

var Message = React.createClass({
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
