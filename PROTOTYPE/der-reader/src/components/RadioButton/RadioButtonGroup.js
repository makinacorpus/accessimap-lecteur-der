var React = require('react');
const {PropTypes} = React;
var RadioButton = require('./RadioButton.js');

const RadioButtonGroup = React.createClass({
  propTypes: {
    name: PropTypes.string,
    checkedValue: PropTypes.string,
    choices: PropTypes.array,
    onChange: PropTypes.func
  },

  getDefaultProps: function() {
    return {
      checkedValue: ''
    };
  },

  render: function() {
    const {choices, checkedValue, onChange} = this.props;

    const choiceItems = choices.map(choice => {
      const {value, label} = choice;
      const checked = value === checkedValue;

      return (
        <RadioButton
          key={`radio-button-${value}`}
          label={label}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
      );
    });

    return (
      <div>
        {choiceItems}
      </div>
    );
  }
});

module.exports = RadioButtonGroup;
