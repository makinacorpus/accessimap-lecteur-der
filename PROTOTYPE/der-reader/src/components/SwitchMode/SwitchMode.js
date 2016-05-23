var React = require('react');

var RadioButtonGroup = require('./../RadioButton/RadioButtonGroup.js');

const SwitchMode = React.createClass({
  getInitialState: function() {
    return {
      checkedValue: this.props.mode
    };
  },

  render: function() {
    const {checkedValue} = this.state;
    const choices = [
      {value: 'explore', label: 'Exploration'},
      {value: 'search', label: 'Recherche'}
    ];

    return (
      <div>
        <RadioButtonGroup
          name="mode"
          checkedValue={checkedValue}
          choices={choices}
          onChange={this.handleChange}
        />
      </div>
    );
  },

  handleChange: function(value) {
    this.setState({
      checkedValue: value
    });
  }
});

module.exports = SwitchMode;
