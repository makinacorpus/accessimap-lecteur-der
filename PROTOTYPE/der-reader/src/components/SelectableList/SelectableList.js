require('!style!css!sass!./SelectableList.scss');

var React = require('react');

var SelectableList = React.createClass({
  changeFile: function(event) {
    this.props.changeDocument(Number(event._targetInst._currentElement.key));
  },

  render: function() {
    const {items, selectedItem, handleClick} = this.props;
    return (
      <ul className="selectable-list">
        {items.map(function(file, key) {
          const isSelected = (key === selectedItem) ? 'selected' : '';
          return (
            <li key={key} onClick={handleClick} className="selectable-list--item"><a key={key} className={isSelected}>{file.name.replace('.svg', '')}</a></li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = SelectableList;
