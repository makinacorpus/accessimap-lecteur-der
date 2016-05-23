var React = require('react');

const RadioButton = React.createClass({
  render: function() {
    const {name, value, checked, label} = this.props;

    return (
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={this.handleChange}
        />
        {label}
      </label>
    );
  },

  handleChange: function() {
    const {value, onChange} = this.props;
    onChange(value);
  }
});

module.exports = RadioButton;
