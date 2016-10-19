const React = require('react');
const SelectableList = require('./../../components/SelectableList/SelectableList.js');
const Navigation = require('./../../components/Navigation/Navigation.js');

const Filters = React.createClass({
  getInitialState: function() {
    let index = 0;

    if (this.props.options.der && this.props.options.der.filters) {
      let filters = this.props.options.der.filters.filter;
      let activeFilter = this.props.options.activeFilter;
      index = filters.findIndex(filter => {
        return filter.id === activeFilter.id;
      });
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
    let newFilter = der.filters.filter[this.state.index] ? der.filters.filter[this.state.index] : null;
    this.props.actions.changeFilter(newFilter);
  },

  render: function() {
    let {der} = this.props.options;

    let filters = [];
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
