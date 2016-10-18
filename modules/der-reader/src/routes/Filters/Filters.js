const React = require('react');
const SelectableList = require('./../../components/SelectableList/SelectableList.js');
const Navigation = require('./../../components/Navigation/Navigation.js');

const Filters = React.createClass({
  getInitialState: function() {
    let index = 0;
    let {der} = this.props.options;
    if (der && der.filters && der.filters.filter) {
      let indexTemp = der.filters.filter.indexOf(this.props.options.activeFilter) + 1; // +1 for 'no filter' item on top
      index = indexTemp !== -1 ? indexTemp : 0;
    }

    return {
      index
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.context.router.push('/');
    }
  },

  handleAction: function(index) {
    this.setState({index});
  },

  read: function(text) {
    this.props.options.tts.speak(text);
  },

  changeFilter: function() {
    let {der} = this.props.options;
    let newFilter = der.filters.filter[this.state.index-1] ? der.filters.filter[this.state.index-1] : null;
    this.props.actions.changeFilter(newFilter);
  },

  render: function() {
    let {der} = this.props.options;

    let filters = [{name: 'Aucun Filtre'}];
    if (der && der.filters && der.filters.filter) {
      der.filters.filter.map((filter) => {
        filters.push(filter);
      });
    }

    let filtersList = 'Ce document ne contient pas de filtre.';

    if (filters.length > 0) {
      filtersList = <SelectableList
        read={this.read}
        index={this.state.index}
        items={filters}
        changeIndex={this.handleAction}>
      </SelectableList>
    }

    return (
      <Navigation
        action={this.changeFilter}
        content={filtersList}>
      </Navigation>
    );
  }
});

module.exports = Filters;
