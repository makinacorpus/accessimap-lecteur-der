import React, { Component } from 'react'
require('!style!css!sass!./SelectFile.scss')

class SelectFile extends Component {
  handleChange(file) {
    if (file) {
      this.props.actions.changeDerFile(file);
      this.props.actions.changeFilter(null);
    } else {
      this.props.config.tts.speak('Aucun fichier sélectionné, retour au menu')
      this.context.router.push('/menu')
    }
  }

  componentDidMount() {
    this.refs.inputfile.click()
  }

  changeFile() {
    if (this.refs.inputfile) {
      let file = this.refs.inputfile.files[0]
      if (file !== undefined) {
        this.handleChange(file)
      } else {
        this.props.options.message('Aucun fichier seléctionné', 'error')
      }
    }
  }

  render() {
    return (
      <input ref="inputfile" id="file" type="file" className="inputfile" onChange={e => this.changeFile(e)} />
    )
  }
}

SelectFile.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SelectFile