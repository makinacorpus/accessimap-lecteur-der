require('!style!css!sass!./SwitchMode.scss');
const _ = require('lodash');
const React = require('react');
const SelectElementContainer = require('./../../../components/SelectElement/SelectElement.js');
const Navigation = require('./../../../components/Navigation/Navigation.js');

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

  changeMode: function() {
    this.props.actions.changeMode(this.state.index);
    this.props.actions.toggleMenu('menu', 'Fermeture du menu');
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
        index={this.state.index}
        items={modes}
        changeIndex={this.handleAction}
        content={explore}>
      ></Navigation>
    );
  }
});

module.exports = SwitchMode;
