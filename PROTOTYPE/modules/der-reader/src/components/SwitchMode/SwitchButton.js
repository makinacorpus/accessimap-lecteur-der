var React = require('react');

const SwitchButton = React.createClass({
  render: function() {
    const {value, active, label} = this.props;

    return (
        <button
          className={'switch-button-case' + active}
          value={value}
          onDoubleClick={this.handleClick}>
          {label}
        </button>
    );
  },

  handleClick: function() {
    this.props.onChange(this.props.value);
  }
});

module.exports = SwitchButton;
