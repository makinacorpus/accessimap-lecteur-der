const Button = require('./Button.js');
const React = require('react');

const ButtonsNavigation = React.createClass({
  render: function() {
    return (
      <nav className="nav-buttons" id="nav-buttons">
        <Button
          id="menu"
          tts={this.props.tts}
          labelClosed="Menu"
          labelOnClose="Fermeture du menu"
          labelOpened="Fermer le menu"
          labelOnOpen="Ouverture du menu"
          open={this.props.openedMenu === 'menu'}
          toggleMenu={this.props.toggleMenu}
           />
        <Button
          id="filters"
          tts={this.props.tts}
          labelClosed="Filtres"
          labelOnClose="Fermeture des filtres"
          labelOpened="Fermer les filtres"
          labelOnOpen="Ouverture des filtres"
          open={this.props.openedMenu === 'filters'}
          toggleMenu={this.props.toggleMenu}
          />
      </nav>
    );
  }
});

module.exports = ButtonsNavigation;
