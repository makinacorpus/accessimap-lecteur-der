const React = require('react');
const Navigation = require('./../../components/Navigation/Navigation.js');

const Filters = React.createClass({
  getInitialState: function() {
    let index = 0;

    if (this.props.options.der && this.props.options.der.filters && this.props.options.activeFilter) {
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

  changeFilter: function(index) {
    this.setState({index});
  },

  read: function(text) {
    this.props.options.tts.speak(text);
  },

  handleAction: function() {
    let {der} = this.props.options;
    if (der.filters.filter[this.state.index].path === 'back') {
      this.props.actions.toggleMenu('filters', 'Fermeture des filtres');
    }
    let newFilter = der.filters.filter[this.state.index] ? der.filters.filter[this.state.index] : null;
    this.props.actions.changeFilter(newFilter);
    this.props.actions.toggleMenu('filters', 'Fermeture des filtres');
  },

  render: function() {
    let {der} = this.props.options;

    let filtersList = <h2>Ce document ne contient pas de filtre.</h2>;

    if (der && der.filters && der.filters.filter) {
      filtersList = (
        <Navigation
          action={this.handleAction}
          read={this.read}
          index={this.state.index}
          items={der.filters.filter}
          changeIndex={this.changeFilter}>
        </Navigation>
      )
    }

    return filtersList;
  }
});

module.exports = Filters;
