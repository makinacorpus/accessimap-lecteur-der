require('!style!css!sass!./SelectFile.scss');
var React = require('react');

var SelectFile = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleChange: function(file) {
    if (file) {
      this.props.actions.changeDerFile(file);
      this.props.actions.changeFilter(null);
    } else {
      this.props.config.tts.speak('Aucun fichier sélectionné, retour au menu');
      this.context.router.push('/menu');
    }
  },

  componentDidMount: function() {
    this.refs.inputfile.click();
  },

  changeFile: function() {
    if (this.refs.inputfile) {
      let file = this.refs.inputfile.files[0];
      if (file !== undefined) {
        this.handleChange(file);
      } else {
        this.props.options.message('Aucun fichier seléctionné', 'error');
      }
    }
  },

  render: function() {
    return (
      <input ref="inputfile" id="file" type="file" className="inputfile" onChange={e => this.changeFile(e)} />
    );
  }
});

module.exports = SelectFile;
