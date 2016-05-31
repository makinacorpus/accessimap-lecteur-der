require('!style!css!sass!./Button.scss');

var React = require('react');
var Speaker = require('./../Speaker/Speaker.js');

var FileInput = React.createClass({
  getInitialState: function() {
    return {
    }
  },

  componentDidMount: function() {
    Speaker.setEventsListener(this.refs.button);
  },

  render: function() {
    const {type, value} = this.props;
    const className = this.props.className || '';
    const form = this.props.form || '';
    const id = this.props.id || '';
    const onClick = this.props.onClick || '';
    const onDoubleClick = this.props.onDoubleClick || '';
    const buttonClasses = 'button ' + className;

    return (
      <button ref="button" id={id} type={type} form={form} className={buttonClasses} onClick={onClick} onDoubleClick={onDoubleClick}>{value}</button>
    );
  }
});

module.exports = FileInput;
