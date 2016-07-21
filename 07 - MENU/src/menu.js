require('!style!css!sass!./menu.scss');

const React = require('react');
const ReactDOM = require('react-dom');

const MENU = document.getElementById('a11y-menu');
const DATA = [
  {
    'title': 'Parent 1',
    'submenu': [
      {'title': 'Item 1'},
      {'title': 'Item 2'},
      {'title': 'Item 3'},
      {'title': 'Item 4'}
    ]
  },
  {
    'title': 'Parent 2'
  },
  {
    'title': 'Parent 3',
    'submenu': [
      {'title': 'Item 1'},
      {'title': 'Item 2'}
    ]
  }
];

const MenuList = React.createClass({
  getInitialState: function() {
    return {
      a11yItemIndex: 0,
      lastItemIndex: 0,
      isSubmenu: false,
      data: this.props.submenu || DATA
    };
  },

  setActiveItem: function(direction) {
    if (direction) {
      var len = this.state.data.length - 1;
      var index = this.state.a11yItemIndex;
      var newIndex = index;

      switch (direction) {
      case 'swipeup':
        newIndex = index === 0 ? 0 : index - 1;
        this.setState({
          a11yItemIndex: newIndex
        });
        break;
      case 'swipedown':
        newIndex = index === len ? len : index + 1;
        this.setState({
          a11yItemIndex: newIndex
        });
        break;
      case 'swiperight':
        this.goToSubmenu(index);
        return;
      case 'swipeleft':
        if (this.state.isSubmenu) {
          this.setState({
            data: DATA,
            a11yItemIndex: this.state.lastItemIndex
          });
        }
        break;
      }
    }
  },

  goToSubmenu: function() {
    var index = this.state.a11yItemIndex;
    if (this.state.data[index].submenu !== undefined) {
      this.setState({
        data: this.state.data[index].submenu,
        isSubmenu: true
      });
      this.setState({
        a11yItemIndex: 0,
        lastItemIndex: index
      });
    }
  },

  componentDidMount: function() {
    var nav = new window.Hammer(MENU, {});
    nav.get('swipe').set({ direction: window.Hammer.DIRECTION_ALL });
    nav.get('tap').set({ taps: 2 });

    nav.on('swipeleft swiperight swipeup swipedown', (event) => {
      this.setActiveItem(event.type);
    });

    nav.on('tap', () => {
      this.goToSubmenu();
    });
  },

  render: function() {
    return (
      <ul>
      {this.state.data.map((item, index) =>
        <li key={index} className={this.state.a11yItemIndex === index ? 'active' : ''}>
          {item.title}
        </li>
      )}
      </ul>
    );
  }
});

ReactDOM.render(
  <MenuList />, MENU
);
