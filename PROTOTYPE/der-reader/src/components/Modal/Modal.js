require('!style!css!sass!./Modal.scss');

var React = require('react');

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
      <div className={'modal ' + visibility} ref={name}>
        <button className="modal--close-button" onClick={this.closeModal}>Retour</button>
        <h2 className="modal--title">{title}</h2>
        {content}
      </div>
    );
  },

  closeModal: function() {
    this.setState({
      visibility: 'hidden'
    });
  }
});

module.exports = Modal;
