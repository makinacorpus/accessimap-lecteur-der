require('!style!css!sass!./Button.scss');

var React = require('react');

var FileInput = React.createClass({
  getInitialState: function() {
    return {
    }
  },

  render: function() {
    const {type, value} = this.props;
    const className = this.props.className || '';
    const form = this.props.form || '';
    const onClick = this.props.onClick || '';
    const buttonClasses = 'button ' + className;

    return (
      <button type={type} form={form} className={buttonClasses} onClick={onClick}>{value}</button>
    );
  }
});

module.exports = FileInput;
