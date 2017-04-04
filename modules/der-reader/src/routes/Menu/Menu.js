const React = require('react');
const MainMenu = require('./MainMenu.js');

const Menu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    // if (nextProps.options !== this.props.options) {
    //   this.context.router.push('/');
    // } else {
    //   if (nextProps.routes[nextProps.routes.length-1].path === 'file') {
    //     this.context.router.push('/menu');
    //   }
    // }
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
            >
          </MainMenu>
        }
      </div>
    );
  }
});

module.exports = Menu;
