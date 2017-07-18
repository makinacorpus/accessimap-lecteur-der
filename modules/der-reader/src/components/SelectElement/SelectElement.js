require('!style!css!./SelectElement.css');

const React = require('react');
const Navigation = require('./../Navigation/Navigation.js');

const SelectElementContainer = React.createClass({
  getInitialState: function() {
    return {
      modal: 'hidden'
    };
  },

  componentWillReceiveProps: function() {
    this.setState({
      modal: 'hidden'
    })
  },

  selectElement: function(index) {
    this.props.setSearchableElement(index);
  },

  openModal: function() {
    this.setState({
      modal: 'visible'
    })
  },

  render: function() {
    const {pois, searchableElement} = this.props;
    pois.poi.map((poi) => {
      poi.name = poi.name || poi.id;
    });

    const currentElement = searchableElement ?
      'Recherche de : ' + pois.poi[searchableElement].name
      : 'Aucun élément sélectionné' ;

    return (
      <Navigation
        title="Choisir un élément à trouver"
        items={pois.poi}
        action={this.selectElement}
      ></Navigation>
    );
  }
});

module.exports = SelectElementContainer;
