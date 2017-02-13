require('!style!css!sass!./SwitchMode.scss');
const _ = require('lodash');
const React = require('react');
const SelectElementContainer = require('./../../../components/SelectElement/SelectElement.js');
const Navigation = require('./../../../components/Navigation/Navigation.js');

const modes = [
  {id: 1, name: 'Exploration'},
  {id: 2, name: 'Recherche'}
];

const SwitchMode = React.createClass({
  getInitialState: function() {
    return {
      index: this.props.options.mode
    };
  },

  handleAction: function(index) {
    this.setState({index});
  },

  changeMode: function() {
    this.props.actions.changeMode(this.state.index);
    this.props.actions.toggleMenu('menu', 'Fermeture du menu');
  },
  
  read: function(text) {
    this.props.options.tts.speak(text);
  },

  render: function() {
    const {pois} = this.props.options;
    const {setSearchableElement, searchableElement} = this.props.actions;
    const explore = this.state.index === 2 ?
      <SelectElementContainer pois={pois} setSearchableElement={setSearchableElement} searchableElement={searchableElement}></SelectElementContainer>
    : '';
    return (

      <Navigation
        action={this.changeMode}
        index={this.state.index}
        read={this.read}
        items={modes}
        changeIndex={this.handleAction}
        content={explore}>
      ></Navigation>
    );
  }
});

module.exports = SwitchMode;
