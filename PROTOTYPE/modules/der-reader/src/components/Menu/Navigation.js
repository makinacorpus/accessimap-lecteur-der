require('!style!css!sass!./Menu.scss');

const Hammer = require('hammerjs');
const React = require('react');

const Navigation = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    const nav = document.getElementById('navigation');
    this.hammer = new Hammer(nav, {});
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.get('tap').set({ taps: 2 });
    this.hammer.on('swipeleft', () => {
      this.context.router.goBack();
    });

    if (this.props.action) {
      this.hammer.on('swiperight', () => {
        this.props.action();
      });
      this.hammer.get('tap').set({ taps: 2 });
      this.hammer.on('tap', () => {
        this.props.action();
      });
    }
  },

  componentWillUnmount: function() {
    this.hammer.off('swipeleft', () => {
      this.context.router.goBack();
    });
    this.hammer.off('swiperight', () => {
      this.props.action();
    });
    this.hammer.off('tap', () => {
      this.props.action();
    });
  },

  render: function() {
    return (
      <div id="navigation">
        <div className="modal" ref="mainMenu" id="mainMenu">
          <div className="menu">
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navigation;
