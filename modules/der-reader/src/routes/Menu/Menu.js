import React, { Component } from 'react';
import MainMenu from './MainMenu.js';

class Menu extends Component {
  render() {
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
}

Menu.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Menu