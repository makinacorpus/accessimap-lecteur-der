require('!style!css!sass!./FilesList.scss');

var React = require('react');
var SelectableList = require('./../SelectableList/SelectableList.js');

var FilesList = React.createClass({
  changeFile: function(index) {
    this.props.actions.changeDocument(index);
  },

  render: function() {
    const {files} = this.props.options;

    return (
      <div className="files-list" onDoubleClick={this.changeFile}>
        <h2>Ce document contient plusieurs cartes. Laquelle voulez-vous afficher ?</h2>
        <SelectableList
          items={files}
          action={this.changeFile}>
        </SelectableList>
      </div>
    );
  }
});

module.exports = FilesList;
