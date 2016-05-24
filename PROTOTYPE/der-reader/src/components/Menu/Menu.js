require('!style!css!sass!./Menu.scss');

const MenuItems = require('./MenuItems.js');
const Button = require('./../Button/Button.js');
const Modal = require('./../Modal/Modal.js');
const SelectableList = require('./../SelectableList/SelectableList.js');

const React = require('react');

const Menu = React.createClass({
  getInitialState: function() {
    return {
      modal: 'hidden',
      currentIndex: null
    };
  },

  componentWillReceiveProps: function() {
    this.setState({
      modal: 'hidden'
    }, function() {
      var _this = this;
      setTimeout(function() {
        _this.setState({
          currentIndex: null
        });
      }, 300);
    });
  },

  render: function() {
    const {currentIndex} = this.state;
    const menuItems = [
      {id: 'file', name: 'Charger un nouveau document en relief (format zip)'},
      {id: 'doc', name: 'Définir le document à visualiser'},
      {id: 'mode', name: 'Changer le mode de lecture'}
    ];

    const mainMenu = (
      <div className="menu">
        <SelectableList items={menuItems} onClick={this.openChildMenu}></SelectableList>
        <MenuItems parentProps={this.props} index={currentIndex} menuItems={menuItems}></MenuItems>
      </div>
    );

    return (
      <div>
        <Button type="button" className="fill red open-menu" value="Menu" onClick={this.openModal}/>
        <Modal name="mainMenu" content={mainMenu} title="Menu principal" visibility={this.state.modal}></Modal>
      </div>
    );
  },

  openChildMenu: function(currentIndex) {
    this.setState({
      currentIndex: currentIndex
    });
  },

  openModal: function() {
    this.setState({
      modal: 'visible'
    });
  }
});

module.exports = Menu;
