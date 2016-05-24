require('!style!css!sass!./FilesList.scss');

var React = require('react');
var SelectableList = require('./../SelectableList/SelectableList.js');

var FilesList = React.createClass({
  changeFile: function(event) {
    this.props.changeDocument(Number(event._targetInst._currentElement.key));
  },

  render: function() {
    const {files, selectedDocument} = this.props;

    return (
      <div className="files-list">
        <h2>Ce document contient plusieurs cartes. Laquelle voulez-vous afficher ?</h2>
        <SelectableList items={files} selectedItem={selectedDocument} handleClick={this.changeFile}></SelectableList>
      </div>
    );
  }
});

module.exports = FilesList;
