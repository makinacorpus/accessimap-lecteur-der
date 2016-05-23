var React = require('react');

var FilesList = React.createClass({
  changeFile: function(event) {
    this.props.changeDocument(Number(event._targetInst._currentElement.key));
  },

  render: function() {
    return (
      <div className="files-list">
        <h2>Ce document contient plusieurs cartes. Laquelle voulez-vous afficher ?</h2>
        <ul>
          {this.props.files.map(function(file, key) {
            var className = (key === this.props.selectedDocument) ? 'selected' : '';
            return (
              <li key={key} onClick={this.changeFile}><a key={key} className={className}>{file.name.replace('.svg', '')}</a></li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  }
});

module.exports = FilesList;
