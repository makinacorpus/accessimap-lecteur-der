require('!style!css!sass!./Menu.scss');

const MenuItems = require('./MenuItems.js');
const Button = require('./../Button/Button.js');
const Modal = require('./../Modal/Modal.js');
const SelectableList = require('./../SelectableList/SelectableList.js');

const React = require('react');

const Menu = React.createClass({
  getInitialState: function() {
    return {
      modal: 'hidden'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.mode === nextProps.mode && this.props.currentIndex === nextProps.currentIndex) {
      this.closeModal();
    }
  },

  render: function() {
    const {currentIndex, setMenu} = this.props;
    const menuItems = [
      {id: 'file', name: 'Charger un nouveau document en relief (format zip)'},
      {id: 'doc', name: 'Définir le document à visualiser'},
      {id: 'mode', name: 'Changer le mode de lecture'}
    ];

    const mainMenu = (
      <div className="menu">
        <SelectableList items={menuItems} onClick={setMenu}></SelectableList>
        <MenuItems parentProps={this.props} index={currentIndex} menuItems={menuItems}></MenuItems>
      </div>
    );

    return (
      <div>
        <Button type="button" className="fill red open-menu" value="Menu" onClick={this.openModal}/>
        <Modal name="mainMenu" content={mainMenu} title="Menu principal" visibility={this.state.modal} onCloseModal={this.closeModal}></Modal>
      </div>
    );
  },

  openModal: function() {
    this.setState({
      modal: 'visible'
    });
  },

  closeModal: function() {
    this.setState({
      modal: 'hidden'
    }, function() {
      if (this.props.currentIndex) {
        this.props.setMenu(null);
      }
    });
  }
});

module.exports = Menu;
