require('!style!css!sass!./SelectFile.scss');
var React = require('react');

var SelectFile = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      newFile: null
    };
  },

  handleChange: function(file) {
    if (file) {
      this.props.actions.changeDerFile(file);
      this.props.actions.changeFilter(null);
    } else {
      this.props.options.tts.speak('Aucun fichier sélectionné, retour au menu');
      this.context.router.push('/menu');
    }
  },

  componentDidMount: function() {
    // document.body.onfocus = (e) => {
    //   if (this.isMounted()) {
    //     this.setState({
    //       file: null
    //     }, () => {
    //       this.handleChange();
    //     });
    //   }
    // }
    this.refs.inputfile.click();
  },

  changeFile: function() {
    console.log('changeFile');
    if (this.refs.inputfile) {
      let file = this.refs.inputfile.files[0];
      if (file !== undefined) {
        this.setState({file: file}, () => {
          this.handleChange(file);
        });
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
