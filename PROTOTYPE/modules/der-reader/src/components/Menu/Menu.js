const SelectableList = require('./../SelectableList/SelectableList.js');
const React = require('react');
const Navigation = require('./../Menu/Navigation.js');

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
    return {
      activeMenu: 0
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.context.router.push('/');
    }
  },

  handleAction: function() {
    this.context.router.push('menu/' + menuItems[this.state.activeMenu].id);
  },

  changeActiveMenu: function(index) {
    this.setState({activeMenu: index});
  },

  read: function(text) {
    this.props.options.tts.speak(text);
  },

  render: function() {
    var childrenWithProps;
    if (this.props.children) {
      childrenWithProps = React.cloneElement(this.props.children, {
        options: this.props.options,
        actions: this.props.actions
      });
    }

    return (
      <Navigation
        action={this.handleAction}
        content={
          <div className="modal" ref="mainMenu" id="mainMenu">
            <div className="menu">
              {childrenWithProps ||
              <SelectableList
                read={this.read}
                index={this.state.activeMenu}
                items={menuItems}
                changeIndex={this.changeActiveMenu}
                ></SelectableList>}
            </div>
          </div>
        }>
      </Navigation>
    );
  }
});

module.exports = MenuContainer;
