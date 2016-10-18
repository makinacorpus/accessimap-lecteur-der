require('!style!css!sass!./SelectDocument.scss');

const React = require('react');
const SelectableList = require('./../../../components/SelectableList/SelectableList.js');
const Navigation = require('./../../../components/Navigation/Navigation.js');

const SelectDocument = React.createClass({
  getInitialState: function() {
    return {
      index: this.props.options.selectedDocument
    };
  },

  handleAction: function(index) {
    this.setState({index});
  },

  changeDocument: function() {
    this.props.actions.changeDocument(this.state.index);
  },

  read: function(text) {
    this.props.options.tts.speak(text);
  },

  render: function() {
    const {files} = this.props.options;

    return (
      <Navigation
        action={this.changeDocument}
        content={
          <div className="files-list" onDoubleClick={this.changeFile}>
            <h2>Ce document contient plusieurs cartes. Laquelle voulez-vous afficher ?</h2>
            <SelectableList
              read={this.read}
              index={this.state.index}
              items={files}
              changeIndex={this.handleAction}>
            </SelectableList>
          </div>
        }></Navigation>
    );
  }
});

module.exports = SelectDocument;
