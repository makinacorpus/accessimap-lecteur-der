require('!style!css!sass!./SelectElement.scss');

const React = require('react');
const SelectableList = require('./../SelectableList/SelectableList.js');
const Button = require('./../Button/Button.js');

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
      <div>
        <span className="current-element">{currentElement}</span>
        <Button type="button" value="Choisir un élément à trouver" />
        <div className="modal" ref="mainMenu" id="mainMenu">
          <h2 className="modal--title">Menu principal</h2>
          <div className="menu">
            <SelectableList
              items={pois.poi}
              action={this.selectElement}
              ></SelectableList>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SelectElementContainer;
