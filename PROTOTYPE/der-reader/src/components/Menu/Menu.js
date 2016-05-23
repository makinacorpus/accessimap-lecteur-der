var FileInput = require('./../Files/FileInput.js');
var SwitchMode = require('./../SwitchMode/SwitchMode.js');
var FilesList = require('./../Files/FilesList.js');

var React = require('react');


var Menu = React.createClass({
  render: function() {
    var files = this.props.files || [];
    return (
      <div className="menu">
        <FileInput message={this.props.message} changeDerFile={this.props.changeDerFile} />
        <FilesList files={files} />
        <SwitchMode />
      </div>
    );
  }
});

module.exports = Menu;
