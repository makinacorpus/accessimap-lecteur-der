var Utils = require('./der.utils.js');

var React = require('react');
var ReactDOM = require('react-dom');

var DerMode = React.createClass({
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

module.exports = DerMode;
