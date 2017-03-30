import React from 'react';
import Navigation from '../../../components/Navigation/Navigation.js';
import CalibrateCanvas from './Calibrate';

var CalibrateMenu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      activeMenu: 0,
      calibrateMode: false,
      /** @type {{w: number, h: (number|undefined)}} */
      totemMarker: null
    };
  },

  setTotem: function(o) {
    this.setState({totemMarker: o});
  },

  handleAction: function() {
    let path = this.props.route.childRoutes[this.state.activeMenu].path;
    let format = this.props.route.childRoutes[this.state.activeMenu].format;
    if (path === 'back') {
      this.props.actions.toggleMenu('menu', 'Fermeture du menu');
    }

    else if (format) {
      this.setState({calibrateMode: true});
      switch(format) {
        case 'a3':
          this.setTotem({w:21.0/2.54,h:29.7/2.54,name:'a4 paper'});
          break;
        case 'a4':
          this.setTotem({w:21.0/2.54,h:29.7/2.54,name:'a4 paper'});
          break;
        case 'a5':
          break;
        default:
          break;
      }
    } else {
      this.context.router.push('menu/calibrate/' + path);
    }
  },

  changeActiveMenu: function(index) {
    this.setState({activeMenu: index});
  },

  read: function(text) {
    this.props.options.tts.speak(text);
  },

  render: function() {
    if (this.state.calibrateMode) {
      return (
        <CalibrateCanvas totemMarker={this.state.totemMarker}></CalibrateCanvas>
      );
    }
    return (
      <Navigation
        action={this.handleAction}
        index={this.state.activeMenu}
        items={this.props.route.childRoutes}
        changeIndex={this.changeActiveMenu}
        read={this.read}
        >
      </Navigation>
    );
  }
});

module.exports = CalibrateMenu;