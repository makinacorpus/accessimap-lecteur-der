require('!style!css!sass!./SelectFile.scss');
var React = require('react');

var SelectFile = React.createClass({
  getInitialState: function() {
    return {
      file: null
    };
  },

  componentDidMount: function() {
    document.body.onfocus = () => {
      if (this.state.file === null) {
        this.props.options.tts.speak('Aucun fichier sélectionné, retour au menu');
      }
    }
    this.refs.inputfile.click();
  },

  changeFile: function() {
    if (this.refs.inputfile) {
      let file = this.refs.inputfile.files[0];
      if (file !== undefined) {
        this.props.actions.changeDerFile(file);
        this.props.actions.changeFilter(null);
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
