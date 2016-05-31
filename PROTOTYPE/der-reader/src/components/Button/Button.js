require('!style!css!sass!./Button.scss');

var React = require('react');
var Hammer = require('hammerjs');

var FileInput = React.createClass({
  getInitialState: function() {
    return {
    }
  },

  componentDidMount: function() {
    var mc = new Hammer.Manager(this.refs.button);
    mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
    mc.on('doubletap', this.props.onDoubleClick);
  },

  render: function() {
    const {type, value} = this.props;
    const className = this.props.className || '';
    const id = this.props.id || '';
    // const onDoubleClick = this.props.onDoubleClick || '';
    const buttonClasses = 'button ' + className;

    return (
      <button ref="button" id={id} type={type} className={buttonClasses}>{value}</button>
    );
  }
});

module.exports = FileInput;
