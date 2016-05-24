require('!style!css!sass!./SelectElement.scss');

var React = require('react');
var Modal = require('./../Modal/Modal.js');
var Button = require('./../Button/Button.js');

const SelectElement = React.createClass({
  getInitialState: function() {
    return {
      modal: 'hidden'
    };
  },

  componentWillReceiveProps: function() {
    this.setState({
      modal: 'hidden'
    })
  },

  render: function() {
    const elementList = ['element1', 'element2'].map((element, key) => {
      return (
        <li className="select-element--item" key={key}>{element}</li>
      );
    });

    const content = (
        <ul className="select-element">
          {elementList}
        </ul>
    );

    console.log(this.props);

    return (
      <div>
        <Button type="button" value="Choisir un élément à trouver" onClick={this.handleClick} />
        <Modal name="selectElement" content={content} title="Sélectionner un élément à rechercher" visibility={this.state.modal}></Modal>
      </div>
    );
  },

  handleClick: function() {
    console.log('click');
    this.setState({
      modal: 'visible'
    })
  }
});

module.exports = SelectElement;
