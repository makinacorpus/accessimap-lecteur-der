import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation.js';

class Filters extends Component {
  constructor(props) {
    super(props)
    let index = 0

    if (this.props.options.der && this.props.options.der.filters && this.props.options.activeFilter) {
      let filters = this.props.options.der.filters.filter
      let activeFilter = this.props.options.activeFilter
      index = filters.findIndex(filter => {
        return filter.id === activeFilter.id
      });
    }

    this.state = {
      index
    }
  }

  // componentWillReceiveProps: function(nextProps) {
  //   if (nextProps.options !== this.props.options) {
  //     this.context.router.push('/');
  //   }
  // },

  changeFilter(index) {
    this.setState({index})
  }

  read(text) {
    this.props.config.tts.speak(text)
  }

  handleAction() {
    let {der} = this.props.options
    let newFilter = der.filters.filter[this.state.index] ? der.filters.filter[this.state.index] : null
    
    if (der.filters.filter[this.state.index].path !== 'back') {
      this.props.actions.changeFilter(newFilter)
    }

    if (newFilter && newFilter.path !== 'back') {
      this.props.actions.toggleMenu('filters', 'Filtre' + newFilter.name + 'sélectionné')
    } else {
      this.props.actions.toggleMenu('filters', 'Fermeture des filtres')
    }
  }

  render() {
    let {der} = this.props.options;

    let filtersList = <h2>Ce document ne contient pas de filtre.</h2>

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

    return filtersList
  }
}

Filters.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Filters