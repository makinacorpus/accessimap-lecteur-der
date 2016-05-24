require('!style!css!sass!./Menu.scss');


const Modal = require('./../Modal/Modal.js');

const FileInput = require('./../Files/FileInput.js');
const SwitchMode = require('./../SwitchMode/SwitchMode.js');
const FilesList = require('./../Files/FilesList.js');

const React = require('react');

const MenuItems = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.props = nextProps;
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
    } = this.props.parentProps;
    const files = this.props.parentProps.files || [];
    const {index, menuItems} = this.props;

    const itemsComponents = [
      {
        id: 'file',
        content: (
          <FileInput
            message={message}
            changeDerFile={changeDerFile}
            />
        )
      },
      {
        id: 'doc',
        content: (
          <FilesList
            files={files}
            changeDocument={changeDocument}
            selectedDocument={selectedDocument}
            />
        )
      },
      {
        id: 'mode',
        content: (
          <SwitchMode
            mode={mode}
            changeMode={changeMode}
            pois={pois}
            setSearchableElement={setSearchableElement}
            searchableElement={searchableElement}
            />
        )
      }
    ];

    const menu = itemsComponents.map(function(component, key) {
      const item = menuItems[index];
      if (item) {
        const visibility = component.id === item.id ? 'visible' : 'hidden';
        const content = (
          <div className="menu">
            {component.content}
          </div>
        )
        return (
          <Modal key={key} name="childMenu" content={content} title={item.name} visibility={visibility}></Modal>
        );
      }
      return;
    });

    return (
      <div>
        {menu}
      </div>
    );
  },

  openChildMenu: function(index) {
    this.setState({index: index});
  }
});

module.exports = MenuItems;
