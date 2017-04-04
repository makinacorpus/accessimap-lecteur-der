const React = require('react');
const MainMenu = require('./MainMenu.js');

const Menu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    var childrenWithProps;
    if (this.props.children) {
      childrenWithProps = React.cloneElement(this.props.children, {
        options: this.props.options,
        actions: this.props.actions,
        config: this.props.config
      });
    }

    return (
      <div>
        {childrenWithProps ||
          <MainMenu
            route={this.props.route}
            options={this.props.options}
            actions={this.props.actions}
            config={this.props.config}
            >
          </MainMenu>
        }
      </div>
    );
  }
});

module.exports = Menu;
