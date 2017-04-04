require('!style!css!sass!./SelectDocument.scss');

const React = require('react');
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
    this.props.actions.toggleMenu('menu', 'Fermeture du menu');
  },

  read: function(text) {
    this.props.config.tts.speak(text);
  },

  render: function() {
    const {files} = this.props.options;

    return (
      <Navigation
        action={this.changeDocument}
        title="Ce document contient plusieurs cartes. Laquelle voulez-vous afficher ?"
        read={this.read}
        index={this.state.index}
        items={files}
        changeIndex={this.handleAction}
      ></Navigation>
    );
  }
});

module.exports = SelectDocument;
