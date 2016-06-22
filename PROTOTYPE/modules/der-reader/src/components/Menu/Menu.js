require('!style!css!sass!./Menu.scss');

const MenuItems = require('./MenuItems.js');
const Button = require('./../Button/Button.js');
const Modal = require('./../Modal/Modal.js');
const SelectableList = require('./../SelectableList/SelectableList.js');

const React = require('react');

const Menu = React.createClass({
  getInitialState: function() {
    return {
      open: false,
      modal: 'hidden'
    };
  },

  componentDidMount: function() {
    const button = document.getElementById('menuButton');
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

    const content = (
      <div className="menu">
        <SelectableList items={menuItems} onDoubleClick={setMenu}></SelectableList>
        <MenuItems parentProps={this.props} index={currentIndex} menuItems={menuItems}></MenuItems>
      </div>
    );

    const menu = this.state.open ?
      <Modal name="mainMenu" content={content} title="Menu principal" visibility={this.state.modal} onCloseModal={this.closeModal}></Modal>
      : '';

    return (
      <div>
        <Button id="menuButton" type="button" className="fill red open-menu" value="Menu" onDoubleClick={this.openModal} />
        {menu}
      </div>
    );
  },

  openModal: function() {
    this.setState({
      open: true,
      modal: 'visible'
    });
  },

  closeModal: function() {
    this.setState({
      open: false,
      modal: 'hidden'
    }, function() {
      if (this.props.currentIndex) {
        this.props.setMenu(null);
      }
    });
  }
});

module.exports = Menu;
