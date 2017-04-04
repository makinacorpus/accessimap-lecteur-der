const React = require('react');
const Navigation = require('./../../components/Navigation/Navigation.js');

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
    let path = this.props.route.childRoutes[this.state.activeMenu].path;

    if (path === 'quit') {
      this.props.options.exit();
    }
    if (path === 'back') {
      this.props.actions.toggleMenu('menu', 'Fermeture du menu');
    }

    else {
      this.context.router.push('menu/' + path);
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
        index={this.state.activeMenu}
        items={this.props.route.childRoutes || []}
        changeIndex={this.changeActiveMenu}
        read={this.read}
        >
      </Navigation>
    );
  }
});

module.exports = Menu;
