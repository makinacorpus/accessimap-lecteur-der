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

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.context.router.push('/');
    }
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
    console.log(this);
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
                items={this.props.route.childRoutes}
                changeIndex={this.changeActiveMenu}
                ></SelectableList>}
            </div>
          </div>
        }>
      </Navigation>
    );
  }
});

module.exports = Menu;
