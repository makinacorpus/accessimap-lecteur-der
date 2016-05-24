require('!style!css!sass!./SelectElement.scss');

var React = require('react');
var Modal = require('./../Modal/Modal.js');
var Button = require('./../Button/Button.js');
var SelectableList = require('./../SelectableList/SelectableList.js');

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
        <SelectableList items={pois.poi} selectedItem={searchableElement} handleClick={this.selectElement}></SelectableList>
    );

    const currentElement = searchableElement ?
      'Recherche de : ' + pois.poi[searchableElement].name
      : 'Aucun élément sélectionné' ;

    return (
      <div>
        <span className="current-element">{currentElement}</span>
        <Button type="button" value="Choisir un élément à trouver" onClick={this.closeModal} />
        <Modal name="selectElement" content={content} title="Sélectionner un élément à rechercher" visibility={this.state.modal}></Modal>
      </div>
    );
  },

  selectElement: function(event) {
    this.props.setSearchableElement(Number(event._targetInst._currentElement.key));
  },

  closeModal: function() {
    this.setState({
      modal: 'visible'
    })
  }
});

module.exports = SelectElement;
