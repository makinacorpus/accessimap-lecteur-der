require('!style!css!sass!./Navigation.scss');

const Hammer = require('hammerjs');
const React = require('react');

const Navigation = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.read) {
      this.props.read(nextProps.items[nextProps.index].name);
    }
  },

  componentWillMount: function() {
    this.props.items.push({path: 'back', name: 'Retour'});
  },

  componentDidMount: function() {
    const modal = document.getElementById('mainMenu');
    this.hammer = new Hammer(modal, {});
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
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

    const nav = document.getElementById('navigation');
    this.hammer = new Hammer(nav, {});
    this.hammer.get('tap').set({ taps: 2 });

    if (this.props.action) {
      this.hammer.get('tap').set({ taps: 2 });
      this.hammer.on('tap', () => {
        if (this.props.index === this.props.items.length-1) {
          this.context.router.goBack();
        } else {
          this.props.action();
        }
      });
    }
  },

  componentWillUnmount: function() {
    this.hammer.off('tap', () => {
      this.props.action();
    });

    this.props.items.pop();
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
    const content = this.props.content || '';

    return (
      <div id="navigation">
        <div className="modal" ref="mainMenu" id="mainMenu">
          <div className="menu">
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

            {content}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navigation;
