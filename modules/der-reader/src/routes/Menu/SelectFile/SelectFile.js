require('!style!css!sass!./SelectFile.scss');
var React = require('react');
var Button = require('./../../../components/Button/Button.js');
const Navigation = require('./../../../components/Navigation/Navigation.js');

var SelectFile = React.createClass({
  getInitialState: function() {
    return {
      label: 'Choisir un fichier',
      labelClass: ''
    }
  },

  loadNewDer: function(e) {
    e.preventDefault();
    var file = document.getElementById('file').files[0];
    if (file !== undefined) {
      this.props.actions.changeDerFile(file);
    } else {
      this.props.options.message('Aucun fichier seléctionné', 'error');
    }
  },

  changeInputState: function(e) {
    var fileName = '';
    if( this.files && this.files.length > 1 ) {
      fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    } else {
      fileName = e.target.value.split( '\\' ).pop();
    }

    this.setState({
      label: fileName ? fileName : 'Choisir un fichier',
      labelClass: fileName ? 'fill' : ''
    });
  },

  render: function() {
    return (
      <Navigation
        content={
          <form id="fileform">
            <input type="file" className="inputfile" id="file" onChange={this.changeInputState} />
            <label htmlFor="file" className={this.state.labelClass}>
              <span>{this.state.label}</span>
            </label>
            <Button type="button" onDoubleClick={this.loadNewDer} className="fill" value="Envoyer"/>
          </form>
        }>
      </Navigation>
    );
  }
});

module.exports = SelectFile;
