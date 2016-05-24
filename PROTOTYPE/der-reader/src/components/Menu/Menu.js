var FileInput = require('./../Files/FileInput.js');
var SwitchMode = require('./../SwitchMode/SwitchMode.js');
var FilesList = require('./../Files/FilesList.js');

var React = require('react');


var Menu = React.createClass({
  render: function() {
    const {
      message,
      changeDerFile,
      changeDocument,
      selectedDocument,
      mode,
      changeMode,
      pois,
      setSearchableElement,
      searchableElement
    } = this.props;
    const files = this.props.files || [];

    return (
      <div className="menu">
        <FileInput
          message={message}
          changeDerFile={changeDerFile}
          />
        <FilesList
          files={files}
          changeDocument={changeDocument}
          selectedDocument={selectedDocument}
          />
        <SwitchMode
          mode={mode}
          changeMode={changeMode}
          pois={pois}
          setSearchableElement={setSearchableElement}
          searchableElement={searchableElement}
          />
      </div>
    );
  }
});

module.exports = Menu;
