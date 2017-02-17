require('!style!css!sass!./Navigation.scss');

const Hammer = require('hammerjs');
const React = require('react');

const Navigation = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.read && this.props.index !== nextProps.index) {
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
      let newIndex = this.props.index-1;
      if (this.props.index === 0) {
        newIndex = this.props.items.length-1;
      }
      this.props.changeIndex(newIndex);
    });
    this.hammer.on('swipedown', () => {
      let newIndex = this.props.index+1;
      if (this.props.index === this.props.items.length-1) {
        newIndex = 0;
      }
      this.props.changeIndex(newIndex);
    });

    const nav = document.getElementById('navigation');
    var mc = new Hammer.Manager(nav);
    mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
    mc.add( new Hammer.Tap({ event: 'singletap' }) );
    mc.get('doubletap').recognizeWith('singletap');
    mc.get('singletap').requireFailure('doubletap');

    mc.on('singletap', () => {
      this.props.read(this.props.items[this.props.index].name);
    });

    if (this.props.action) {
      mc.on('doubletap', () => {
        if (this.props.index === this.props.items.length-1) {
          this.context.router.goBack();
        }
        this.props.action();
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
                    <a className={isSelected}>{item.name}</a>
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
