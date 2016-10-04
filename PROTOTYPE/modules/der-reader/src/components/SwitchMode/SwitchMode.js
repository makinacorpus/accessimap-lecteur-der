require('!style!css!sass!./SwitchMode.scss');

var React = require('react');
var SwitchButton = require('./SwitchButton.js');
var SelectElementContainer = require('./../SelectElement/SelectElement.js');

const choices = [
  {value: 'explore', label: 'Exploration', position: 'left'},
  {value: 'search', label: 'Recherche', position: 'right'}
];

const SwitchMode = React.createClass({
  getInitialState: function() {
    return {
      checkedValue: this.props.options.mode,
      position: this.getModePosition(this.props.options.mode)
    };
  },

  render: function() {
    const {checkedValue, position} = this.state;
    const {pois} = this.props.options;
    const {setSearchableElement, searchableElement} = this.props.actions;
    const onChange = this.onChange;
    const explore = checkedValue === 'search' ?
      <SelectElementContainer pois={pois} setSearchableElement={setSearchableElement} searchableElement={searchableElement}></SelectElementContainer>
    : '';

    const choiceItems = choices.map(choice => {
      const {value, label} = choice;
      const active = value === checkedValue ? ' active-case' : '';

      return (
        <SwitchButton
          key={`radio-button-${value}`}
          label={label}
          value={value}
          active={active}
          onChange={onChange}
        />
      );
    });

    return (
      <aside className="switch">
        <h2 className="switch-title">Mode</h2>
        <div className="switch-button">
          <span className={'active ' + position}></span>
          {choiceItems}
        </div>
        {explore}
      </aside>
    );
  },

  getModePosition: function(value) {
    var position;
    choices.map(function(choice) {
      if (choice.value === value) {
        position = choice.position;
      }
    });
    return position;
  },

  onChange: function(value) {
    this.setState({
      checkedValue: value,
      position: this.getModePosition(value)
    });
    this.props.actions.changeMode(value);
  }
});

module.exports = SwitchMode;
