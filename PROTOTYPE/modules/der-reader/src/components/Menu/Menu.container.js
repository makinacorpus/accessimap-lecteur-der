require('!style!css!sass!./Menu.scss');

const MenuItemsContainer = require('./MenuItems.container.js');
const Menu = require('./Menu.js');
const SelectableList = require('./../SelectableList/SelectableList.js');
const React = require('react');
const Button = require('./../Button/Button.js');

const menuItems = [
  {id: 'file', name: 'Charger un nouveau document en relief (format zip)'},
  {id: 'doc', name: 'Définir le document à visualiser'},
  {id: 'mode', name: 'Changer le mode de lecture'}
];

const MenuContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    console.log(this);
    return {
      open: false,
      modal: 'hidden',
      selectedItem: 0,
      currentIndex: null
    };
  },

  closeChidMenu: function() {
    this.setState({
      currentIndex: null
    });
  },

  openChidMenu: function() {
    this.setState({
      currentIndex: this.state.selectedItem
    });
  },

  openMenu: function() {
    this.setState({
      open: true,
      modal: 'visible'
    });
  },

  closeMenu: function() {
    this.context.router.push('/');
  },

  navigateMenu: function(direction) {
    const currentItem = this.state.selectedItem;
    let newItem = null;
    switch (direction) {
    case 'up':
      newItem = currentItem === 0 ? 0 : currentItem-1;
      break;
    case 'down':
      newItem = currentItem === menuItems.length-1 ? menuItems.length-1 : currentItem+1;
      break;
    default:
    }
    this.setState({selectedItem: newItem});
  },

  render: function() {
    const {selectedItem, currentIndex} = this.state;
    const content = (
      <div className="menu">
        <SelectableList items={menuItems} selectedItem={selectedItem}></SelectableList>
        <MenuItemsContainer
          parentProps={this.props.options}
          index={currentIndex}
          menuItems={menuItems}
          closeMenu={this.closeChidMenu}
          ></MenuItemsContainer>
      </div>
    );
    return (
      <div>
        <Menu
          openChidMenu={this.openChidMenu}
          name="mainMenu"
          navigateMenu={this.navigateMenu}
          content={content}
          title="Menu principal"
          closeMenu={this.closeMenu}
          />
      </div>
    );
  }
});

module.exports = MenuContainer;
