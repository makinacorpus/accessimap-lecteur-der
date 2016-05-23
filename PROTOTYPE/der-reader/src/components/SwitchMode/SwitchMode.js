var React = require('react');

var SwitchMode = React.createClass({
  render: function() {
    return (
      <aside className="change-mode">
          <label htmlFor="explore">Exploration</label>
          <input type="radio" name="mode" id="explore" />
          <label htmlFor="search">Recherche</label>
          <input type="radio" name="mode" id="search" />
          <button className="choose-element">Choisir un élément à trouver</button>
      </aside>
    );
  }
});

module.exports = SwitchMode;
