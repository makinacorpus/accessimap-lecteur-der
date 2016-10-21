const ButtonNavigation = require('./ButtonNavigation.js');
const React = require('react');
import { hashHistory } from 'react-router';

const ButtonsNavigation = React.createClass({
  getInitialState: function() {
    return {
      openedMenu: ''
    }
  },

  toggleMenu: function(id, labelOnClose, labelOnOpen) {
    let open = this.state.openedMenu === id;
    this.setState({
      openedMenu: open ? '' : id
    }, () => {
      if (open) {
        hashHistory.push('/');
        this.props.tts.speak(labelOnClose);
      } else {
        hashHistory.push(id);
        this.props.tts.speak(labelOnOpen);
      }
    });
  },

  render: function() {
    return (
      <nav className="nav-buttons" id="nav-buttons">
        <ButtonNavigation
          id="menu"
          tts={this.props.tts}
          labelClosed="Menu"
          labelOnClose="Fermeture du menu"
          labelOpened="Fermer le menu"
          labelOnOpen="Ouverture du menu"
          open={this.state.openedMenu === 'menu'}
          toggleMenu={this.toggleMenu}
           />
        <ButtonNavigation
          id="filters"
          tts={this.props.tts}
          labelClosed="Filtres"
          labelOnClose="Fermeture des filtres"
          labelOpened="Fermer les filtres"
          labelOnOpen="Ouverture des filtres"
          open={this.state.openedMenu === 'filters'}
          toggleMenu={this.toggleMenu}
          />
      </nav>
    );
  }
});

module.exports = ButtonsNavigation;
