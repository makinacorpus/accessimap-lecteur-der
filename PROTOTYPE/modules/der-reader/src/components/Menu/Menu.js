require('!style!css!sass!./Menu.scss');

var React = require('react');
const Hammer = require('hammerjs');

const Menu = React.createClass({
  getInitialState: function() {
    return {
      visibility: this.props.visibility
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      visibility: nextProps.visibility
    });
  },

  componentDidMount: function() {
    const modal = document.getElementById(this.props.name);
    var hammertime = new Hammer(modal, {});
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on('swipeleft', () => {
      this.props.closeMenu();
    });
    hammertime.on('swiperight', () => {
      this.props.openChidMenu();
    });
    hammertime.on('swipeup', () => {
      this.props.navigateMenu('up');
    });
    hammertime.on('swipedown', () => {
      this.props.navigateMenu('down');
    });

    hammertime.get('tap').set({ taps: 2 });
    hammertime.on('tap', () => {
      this.props.selectMenu();
    });
  },


  render: function() {
    const {name, title, content, visibility} = this.props;

    return (
        <div className={'modal ' + visibility} ref={name} id={name}>
          <h2 className="modal--title">{title}</h2>
          {content}
        </div>
    );
  }
});

module.exports = Menu;
