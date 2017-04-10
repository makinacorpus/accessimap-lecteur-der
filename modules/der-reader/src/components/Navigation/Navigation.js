require('!style!css!sass!./Navigation.scss');

const Hammer = require('hammerjs');
const React = require('react');

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

const Navigation = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },


  handleAction: function() {
    if (this.props.index === this.props.items.length-1) {
      this.context.router.goBack();
    }
    this.props.action();  
  },

  read: function(e) {
    let reader; 
    if (e && e.type === 'click') {
      reader = setTimeout(() => {
        this.props.read(this.props.items[this.props.index].name);
      }, 300);
    } else {
      clearTimeout(reader);
    }
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
    this.props.read(this.props.items[this.props.index].name);
    const modal = document.getElementById('mainMenu');
    this.hammer = new Hammer(modal, {});
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.on('swipeup', debounce(() => {
      this.read(false);
      let newIndex = this.props.index-1;
      if (this.props.index === 0) {
        newIndex = this.props.items.length-1;
      }
      this.props.changeIndex(newIndex);
    }, 250));

    this.hammer.on('swipedown', debounce(() => {
      this.read(false);
      let newIndex = this.props.index+1;
      if (this.props.index === this.props.items.length-1) {
        newIndex = 0;
      }
      this.props.changeIndex(newIndex);
    }, 250));

    const nav = document.getElementById('navigation');
    nav.addEventListener('click', this.read);

    if (this.props.action) {
      nav.addEventListener('dblclick', this.handleAction);
    }
  },

  componentWillUnmount: function() {
    const nav = document.getElementById('navigation');
    nav.removeEventListener('dblclick', this.handleAction);
    nav.removeEventListener('click', this.read);

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
              {items ? items.map(function(item, key) {
                const isSelected = (key === index) ? 'selected' : '';
                return (
                  <li key={key} className="selectable-list--item">
                    <a className={isSelected}>{item.name}</a>
                  </li>
                );
              }.bind(this)) : null}
            </ul>

            {content}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navigation;
