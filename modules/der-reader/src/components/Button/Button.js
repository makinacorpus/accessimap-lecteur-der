require('!style!css!sass!./Button.scss');

const React = require('react');
const Hammer = require('hammerjs');

const Button = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      label: ''
    }
  },

  componentWillReceiveProps: function() {
    this.setState({
      label: this.props.open ? 'Fermer' : this.props.labelClosed
    });
  },

  componentDidMount: function() {
    const buttons = document.getElementById(this.props.id);
    const tts = this.props.tts;

    var mc = new Hammer.Manager(buttons);
    mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
    mc.add( new Hammer.Tap({ event: 'singletap' }) );
    mc.get('doubletap').recognizeWith('singletap');
    mc.get('singletap').requireFailure('doubletap');

    mc.on('singletap', (e) => {
      if (this.props.open) {
        tts.speak(this.props.labelOpened);
      }
      else {
        tts.speak(e.target.innerText);
      }
    });
    mc.on('doubletap', () => {
      this.props.toggleMenu(this.props.id, this.props.labelOnClose, this.props.labelOnOpen);
    });
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
