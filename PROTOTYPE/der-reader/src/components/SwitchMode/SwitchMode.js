require('!style!css!sass!./SwitchMode.scss');

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
      <aside className="change-mode">
        <h2 className="title">Mode</h2>
        <RadioButtonGroup
          name="mode"
          checkedValue={checkedValue}
          choices={choices}
          onChange={this.handleChange}
        />
        <button className="choose-element">Choisir un élément à trouver</button>
      </aside>
    );
  },

  handleChange: function(value) {
    this.setState({
      checkedValue: value
    });
    this.props.changeMode(value);
  }
});

module.exports = SwitchMode;
