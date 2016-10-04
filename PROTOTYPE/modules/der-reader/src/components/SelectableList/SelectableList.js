require('!style!css!sass!./SelectableList.scss');
const Navigation = require('./../Menu/Navigation.js');
var React = require('react');
const Hammer = require('hammerjs');

var SelectableList = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    const modal = document.getElementById('mainMenu');
    this.hammer = new Hammer(modal, {});
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.get('tap').set({ taps: 2 });
    this.hammer.on('swipeup', () => {
      if (this.props.index !== 0) {
        this.props.changeIndex(this.props.index-1);
      }
    });
    this.hammer.on('swipedown', () => {
      if (this.props.index !== this.props.items.length-1) {
        this.props.changeIndex(this.props.index+1);
      }
    });
  },

  componentWillUnmount: function() {
    this.hammer.off('swipeup', () => {
      if (this.props.index !== 0) {
        this.props.changeIndex(this.props.index-1);
      }
    });
    this.hammer.off('swipedown', () => {
      if (this.props.index !== this.props.items.length-1) {
        this.props.changeIndex(this.props.index+1);
      }
    });
  },

  render: function() {
    const {items, index} = this.props;

    return (
      <ul className="selectable-list">
        {items.map(function(item, key) {
          const isSelected = (key === index) ? 'selected' : '';
          return (
            <li key={key} className="selectable-list--item">
              <a key={key} className={isSelected}>{item.name}</a>
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = SelectableList;
