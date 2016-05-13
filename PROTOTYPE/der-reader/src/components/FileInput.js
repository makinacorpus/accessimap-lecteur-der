var DerFile = require('./../der.file.js');

var React = require('react');
var ReactDOM = require('react-dom');

var FileInput = React.createClass({
    getInitialState: function() {
        return {
            label: 'Choisir un fichier',
            labelClass: ''
        }
    },

    loadNewDer: function(e) {
        e.preventDefault();
        var file = DerForm.fileInput.files[0];
        if (file !== undefined) {
            DerFile.openDerFile(file);
        } else {
            message('Aucun fichier seléctionné', 'error');
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
            <form>
                <input type="file" className="inputfile" id="file" onChange={this.changeInputState} />
                <label htmlFor="file" className={this.state.labelClass}>
                    <span>{this.state.label}</span>
                </label>
                <input type="submit" className="inputsubmit" value="Envoyer" onSubmit={this.loadNewDer} />
            </form>
        );
    }
});

module.exports = FileInput;
