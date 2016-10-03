const React = require('react');
const SelectableList = require('./../SelectableList/SelectableList.js');
const SelectElement = require('./SelectElement.js');

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

    const content = (
      <div className="menu">
        <SelectableList items={pois.poi} selectedItem={searchableElement} onDoubleClick={this.selectElement}></SelectableList>
      </div>
    );

    const currentElement = searchableElement ?
      'Recherche de : ' + pois.poi[searchableElement].name
      : 'Aucun élément sélectionné' ;

    return (
      <SelectElement
        element={currentElement}
        content={content}
        modal={this.state.modal}
        openModal={this.openModal} />
    );
  }
});

module.exports = SelectElementContainer;
