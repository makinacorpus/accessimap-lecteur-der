import React, { Component } from 'react'
import {
  getFileObject,
  orderFilesByExt,
  parseXml,
  XML2jsobj
} from '../../services/load-der.js'
import JSZip from 'jszip'

import Explore from './DerContainer-explore.js'
import Search from './DerContainer-search.js'


class DerContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSound: null,
      filesByExt: {}
    }
  }

  componentDidMount() {
    this.setDerFile()
  }

  componentWillReceiveProps(nextProps) {
    const oldProps = this.props
    this.props = nextProps
    if (oldProps.derFile !== nextProps.derFile) {
      this.setDerFile()
    }
    if (oldProps.selectedDocument !== nextProps.selectedDocument) {
      this.changeDocument()
    }
    this.setDerActions()
  }

  setDerFile() {
    const {derFile, der} = this.props

    if (der !== null) {
      this.loadDer(der)
    } else {
      if (typeof derFile === 'string') {
        getFileObject(derFile, file => {
          this.openDerFile(file)
        })
      } else {
        this.openDerFile(derFile)
      }
    }
  }

  openDerFile(file) {
    if (!file) {
      this.props.message('Aucun fichier chargé. Veuillez sélectionner un document\xa0en\xa0relief à l\'aide du menu.', 'error')
      return
    } 
    const fileType = file.type.split('.').pop()
    switch(fileType) {
    case 'application/zip':
    case 'application/x-zip-compressed':
    case 'application/x-zip':
    case 'application/octet-stream':
      var new_zip = new JSZip()
      new_zip.loadAsync(file)
      .then(zip => {
        this._extractFiles(zip.files).then((der) => {
          this.props.message('')
          this.props.setDer(der)
          this.playBeep()
          this.loadDer(der)
        }, (error) => {
          this.props.message(error, 'error')
        })
      })
      .catch(err => {
        console.error(err)
        this.props.message('Erreur lors de l\'ouverture du fichier ZIP', 'error')
      })
      break
    default:
      this.props.message('Fichier non valide, le fichier envoyé doit être au format ZIP', 'error')
    }
  }

  /**
  * Read MP3 contained in ZIP file
  * @param name: {string} required
  */
  readAudioFile(name) {
    // console.log('readAudioFile', name)
    return new Promise((resolve, reject) => {
      if (this.state.currentSound) {
        this.state.currentSound.pause()
      }
      this.props.der.audioFiles[name].async('base64')
        .then(base64string => {
          let sound = new Audio('data:audio/mpeg;base64,' + base64string)
          this.setState({
            currentSound: sound
          })
          this.state.currentSound.play()
          this.state.currentSound.onended = () => {
            resolve(this.state.currentSound)
          }

        }, function() {
          reject()
        })
    })
  }

  /**
  * Extract files contained in ZIP file
  * @param files: {Object} required
  * @param listContainer: {HTMLElement} required
  * @param callback: {Function}
  */
  _extractFiles(files) {
    this.setState({
      filesByExt: orderFilesByExt(files)
    })

    if (this.state.filesByExt.svg.length > 1) {
      this.props.setFilesList(this.state.filesByExt.svg)
    }
    return new Promise((resolve, reject) => {
      this.readFiles(
        this.state.filesByExt.xml[0], 
        this.state.filesByExt.svg[this.props.selectedDocument], 
        this.state.filesByExt.audioFiles
      ).then(der => {
        resolve(der)
      }, (err) => {
        reject(err)
      })
    })
  }

  readFiles(xml, svg, audioFiles) {
    let der = {
      audioFiles: audioFiles
    }

    var getJson = new Promise(function(resolve, reject) {
      xml.async('string')
      .then(function(data) {
        var node = parseXml(data)
        var json = XML2jsobj(node.documentElement)
        der['filters'] = json.filters
        if (!Array.isArray(der.filters.filter)) {
          der.filters.filter = [der.filters.filter]
        }
        der['pois'] = Array.isArray(json.pois.poi) ? json.pois : {poi: [ json.pois.poi ]} 
        
        resolve()
      }, function(error) {
        reject(error)
      })
    })

    var getSvg = new Promise(function(resolve, reject) {
      svg.async('string')
      .then(function(data) {
        der['svg'] = data
        resolve()
      }, function(error) {
        reject(error)
      })
    })

    return new Promise((resolve, reject) => {
      Promise.all([getJson, getSvg]).then(function() {
        resolve(der)
      }, function() {
        reject('Fichier non valide, aucun document en relief n\'a été trouvé dans le ZIP')
      })
    })
  }

  changeDocument() {
    const {selectedDocument} = this.props
    this.readFiles(this.state.filesByExt.xml[0], this.state.filesByExt.svg[selectedDocument]).then(der => {
      this.props.setDer(der)
      this.loadDer(der)
    }, err => {
      this.props.message(err, 'error')
    })
  }

  /**
  * Once all files are ready, load DER on DOM
  * @param der: {Object} required
  * @param container: {HTMLElement} required
  * @param tts: {Function}
  */
  loadDer(der) {
    if (der.svg && der.svg.length) {
      this.refs.container.innerHTML = der.svg
    } else {
      this.props.message('Aucun SVG trouvé', 'error')
    }
    if (der.pois.poi === undefined) {
      this.props.message('Ce document ne contient aucune interaction', 'error')
    } else {
      this.setDerActions()
    }
  }

  playBeep() {
    let audio = new Audio('./static/c023.ogg')
    audio.volume = .5
    audio.play()
  }

  setDerActions() {
    const {mode, der, tts, searchableElement, message} = this.props
    if (der && der.pois && der.pois.poi) {
      switch(mode) {
      case 0:
        // Explore
        Explore.attachExploreEvents({
          pois: der.pois.poi,
          readFunction: name => this.readAudioFile(name),
          tts,
          filter: this.props.filter
        })
        Search.removeEventsListener(this.refs.container)
        break
      case 1:
        // Search
        Search.setSearchEvents(searchableElement, this.refs.container, der.pois, message)
        Explore.destroyExploreEvents()
      }
    }
  }

  render() {
    return (
      <div className="der-container" ref="container">
      </div>
    )
  }
}

export default DerContainer