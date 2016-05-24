require('!style!css!sass!./SelectElement.scss');

const React = require('react');
const Modal = require('./../Modal/Modal.js');
const Button = require('./../Button/Button.js');
const SelectableList = require('./../SelectableList/SelectableList.js');

const SelectElement = React.createClass({
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

  render: function() {
    const {pois, searchableElement} = this.props;
    pois.poi.map((poi) => {
      poi.name = poi.name || poi.id;
    });

    const content = (
      <div className="menu">
        <SelectableList items={pois.poi} selectedItem={searchableElement} onClick={this.selectElement}></SelectableList>
      </div>
    );

    const currentElement = searchableElement ?
      'Recherche de : ' + pois.poi[searchableElement].name
      : 'Aucun élément sélectionné' ;

    return (
      <div>
        <span className="current-element">{currentElement}</span>
        <Button type="button" value="Choisir un élément à trouver" onClick={this.openModal} />
        <Modal name="selectSearchableElement" content={content} title="Sélectionner un élément à rechercher" visibility={this.state.modal}></Modal>
      </div>
    );
  },

  selectElement: function(index) {
    this.props.setSearchableElement(index);
  },

  openModal: function() {
    this.setState({
      modal: 'visible'
    })
  }
});

module.exports = SelectElement;
