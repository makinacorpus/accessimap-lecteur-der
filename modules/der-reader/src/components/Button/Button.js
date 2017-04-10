require('!style!css!sass!./Button.scss');
const React = require('react');

const Button = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      label: this.props.open ? 'Fermer' : this.props.labelClosed
    }
  },

  componentWillReceiveProps: function() {
    this.setState({
      label: this.props.open ? 'Fermer' : this.props.labelClosed
    });
  },

  handleClick: function(e) {
    const {config} = this.props;
    let text = this.props.open ? this.props.labelOpened : e.target.innerText;
    config.tts.speak(text);
  },

  handleDoubleClick: function() {
    this.props.toggleMenu(this.props.id);
  },

  render: function() {
    return (
      <button id={this.props.id} type="button" className="button fill black" onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
        {this.state.label}
      </button>
    );
  }
});

module.exports = Button;
