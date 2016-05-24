require('!style!css!sass!./Menu.scss');

const Button = require('./../Button/Button.js');
const Modal = require('./../Modal/Modal.js');
const FileInput = require('./../Files/FileInput.js');
const SwitchMode = require('./../SwitchMode/SwitchMode.js');
const FilesList = require('./../Files/FilesList.js');

const React = require('react');


const Menu = React.createClass({
  getInitialState: function() {
    return {
      modal: 'hidden'
    };
  },

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

    const menuContent = (
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

    return (
      <div>
        <Button type="button" className="fill red open-menu" value="Menu" onClick={this.openModal}/>
        <Modal name="mainMenu" content={menuContent} title="Menu principal" visibility={this.state.modal}></Modal>
      </div>
    );
  },

  openModal: function() {
    this.setState({
      modal: 'visible'
    })
  }
});

module.exports = Menu;
