require('!style!css!sass!./SelectableList.scss');

var React = require('react');

var SelectableList = React.createClass({
  handleClick: function(event) {
    console.log(Number(event._targetInst._currentElement.key));
    // this.props.onClick(Number(event._targetInst._currentElement.key));
  },
  handleDoubleClick: function(event) {
    console.log(this.props);
    this.props.openChidMenu(Number(event._targetInst._currentElement.key));
    // this.props.onDoubleClick(Number(event._targetInst._currentElement.key));
  },
  render: function() {
    const {items, selectedItem} = this.props;
    return (
      <ul className="selectable-list">
        {items.map(function(item, key) {
          const isSelected = (key === selectedItem) ? 'selected' : '';
          return (
            <li key={key} className="selectable-list--item">
              <a key={key} className={isSelected} onDoubleClick={this.handleDoubleClick}>{item.name}</a>
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = SelectableList;
