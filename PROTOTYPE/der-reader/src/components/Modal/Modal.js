require('!style!css!sass!./Modal.scss');

var React = require('react');
var Button = require('./../Button/Button.js');

const Modal = React.createClass({
  getInitialState: function() {
    return {
      visibility: this.props.visibility
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      visibility: nextProps.visibility
    })
  },

  render: function() {
    const {name, title, content} = this.props;
    const {visibility} = this.state;

    return (
      <div className={'modal ' + visibility} ref={name} id={name}>
        <Button className="modal--close-button width-auto" onDoubleClick={this.closeModal} value="Retour" />
        <h2 className="modal--title">{title}</h2>
        {content}
      </div>
    );
  },

  closeModal: function() {
    const {onCloseModal} = this.props;
    if (onCloseModal) {
      this.props.onCloseModal();
    }
    this.setState({
      visibility: 'hidden'
    });
  }
});

module.exports = Modal;
