require('!style!css!sass!./SwitchMode.scss');
const _ = require('lodash');
const React = require('react');
const SelectElementContainer = require('./../SelectElement/SelectElement.js');
const SelectableList = require('./../SelectableList/SelectableList.js');
const Navigation = require('./../Menu/Navigation.js');

const modes = [
  {id: 'explore', name: 'Exploration'},
  {id: 'search', name: 'Recherche'}
];

const SwitchMode = React.createClass({
  getInitialState: function() {
    var i = parseInt(_.findKey(modes, {id: this.props.options.mode}));

    return {
      index: i
    };
  },

  handleAction: function(index) {
    this.setState({index});
  },

  changeMode: function(index) {
    this.props.actions.changeMode({index});
  },

  render: function() {
    const {pois} = this.props.options;
    const {setSearchableElement, searchableElement} = this.props.actions;
    const explore = this.state.index === 'search' ?
      <SelectElementContainer pois={pois} setSearchableElement={setSearchableElement} searchableElement={searchableElement}></SelectElementContainer>
    : '';
    return (

      <Navigation
        action={this.changeMode}
        content={
          <div>
            <SelectableList
              index={this.state.index}
              items={modes}
              changeIndex={this.handleAction}>
            </SelectableList>
            {explore}
          </div>
        }></Navigation>
    );
  }
});

module.exports = SwitchMode;
