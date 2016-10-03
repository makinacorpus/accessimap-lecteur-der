require('!style!css!sass!./SelectElement.scss');

const React = require('react');
const Menu = require('./../Menu/Menu.js');
const Button = require('./../Button/Button.js');

const SelectElement = React.createClass({

  render: function() {
    return (
      <div>
        <span className="current-element">{this.props.element}</span>
        <Button type="button" value="Choisir un élément à trouver" />
        <Menu
          name="selectSearchableElement"
          content={this.props.content}
          title="Sélectionner un élément à rechercher"
          visibility={this.props.modal}
          ></Menu>
      </div>
    );
  }
});

module.exports = SelectElement;
