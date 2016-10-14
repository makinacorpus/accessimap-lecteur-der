const SelectableList = require('./../SelectableList/SelectableList.js');
const React = require('react');
const Navigation = require('./../Menu/Navigation.js');

const Menu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      activeMenu: 0
    };
  },

  handleAction: function() {
    if (this.props.route.childRoutes[this.state.activeMenu].path === 'quit') {
      this.props.options.exit();
    } else {
      this.context.router.push('menu/' + this.props.route.childRoutes[this.state.activeMenu].path);
    }
  },

  changeActiveMenu: function(index) {
    this.setState({activeMenu: index});
  },

  read: function(text) {
    this.props.options.tts.speak(text);
  },

  render: function() {
    return (
      <Navigation
        action={this.handleAction}
        content={
          <SelectableList
            read={this.read}
            index={this.state.activeMenu}
            items={this.props.route.childRoutes}
            changeIndex={this.changeActiveMenu}
            ></SelectableList>
        }>
      </Navigation>
    );
  }
});

module.exports = Menu;
