require('!style!css!sass!./SelectableList.scss');

var React = require('react');

var SelectableList = React.createClass({
  handleClick: function(event) {
    this.props.onClick(Number(event._targetInst._currentElement.key));
  },

  render: function() {
    const {items, selectedItem} = this.props;
    return (
      <ul className="selectable-list">
        {items.map(function(item, key) {
          const isSelected = (key === selectedItem) ? 'selected' : '';
          return (
            <li key={key} onDoubleClick={this.handleClick} className="selectable-list--item">
              <a key={key} className={isSelected}>{item.name}</a>
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = SelectableList;
