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

  componentDidMount: function() {
    const buttons = document.getElementById(this.props.id);
    buttons.addEventListener('click', this.handleClick);
    buttons.addEventListener('dblclick', this.handleDoubleClick);
  },

  componentWillUnmount: function() {
    const buttons = document.getElementById(this.props.id);
    buttons.removeEventListener('click', this.handleClick);
    buttons.removeEventListener('dblclick', this.handleDoubleClick);
  },

  handleClick: function(e) {
    const {config} = this.props;
    if (this.props.open) {
      config.tts.speak(this.props.labelOpened);
    }
    else {
      config.tts.speak(e.target.innerText);
    }
  },

  handleDoubleClick: function() {
    this.props.toggleMenu(this.props.id);
  },

  render: function() {
    return (
      <button id={this.props.id} type="button" className="button fill black">
        {this.state.label}
      </button>
    );
  }
});

module.exports = Button;
