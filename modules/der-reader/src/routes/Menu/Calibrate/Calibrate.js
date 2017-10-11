require('!style!css!./Calibrate.css')
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setOptionStorage } from '../../../store/actions'

const clampDpi = function (dpi) {
  if (dpi < 5) dpi = 5
  if (dpi > 1000) dpi = 1000
  return dpi
}

class CalibrateCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canvas: null,
      c: null,
      currentTransform: {
        x: 0,
        y: 0,
        angle: 0
      },
      flipped: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.totemMarker !== nextProps.totemMarker) {
      // this.props.tts.speak(`Redimmentionnez la zone principale pour l'ajuster au document, puis cliquer sur le bouton fermer. (Format ${nextProps.format})`)
      this.drawRuler(nextProps.totemMarker)
    }
  }

  componentDidMount () {
    this.props.tts.speak(`Redimensionner la zone principale pour l'ajuster au document, puis cliquer sur le bouton fermer. (Format ${this.props.format})`)
    var canvas = document.getElementById('canvas')
    var c = canvas.getContext('2d')
  
    canvas.width = canvas.offsetWidth //document.documentElement.clientWidth
    canvas.height = canvas.offsetHeight // document.documentElement.clientHeight
    c.translate(this.state.currentTransform.x, this.state.currentTransform.y)
    c.rotate(this.state.currentTransform.angle)
    
    this.setState({ canvas, c }, () => {
      this.drawRuler()
      canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false)
    })
  }

  componentWillUnmount() {
    this.state.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this), false)
  }

  onMouseDown(e) {
    var resizeToTotem = (e) => {
      // project the click point onto the ruler vector, which is
      var a = e.clientX - this.state.currentTransform.x
      var b = e.clientY - this.state.currentTransform.y
      var r = Math.sqrt(a * a + b * b)
      var theta = Math.atan2(b, a)
      var projection = r * Math.cos(theta - this.state.currentTransform.angle)
      if (this.state.flipped) {
        projection = -projection
      }
      var newDpi = projection / this.props.totemMarker.w
      newDpi = clampDpi(newDpi)
      this.props.setOptionDpi(newDpi)
    }

    this.clearRuler()
    resizeToTotem(e)
    this.drawRuler()

    var onmousemove = (e) => {
      e.preventDefault() // prevent text selection
      e.stopPropagation()
      this.clearRuler()
      resizeToTotem(e)

      this.drawRuler()
    }
    var onmouseup = function () {
      document.removeEventListener('mousemove', onmousemove, true)
      document.removeEventListener('mouseup', onmouseup, false)
      window.onblur = null
    }
    document.addEventListener('mousemove', onmousemove, true)
    document.addEventListener('mouseup', onmouseup, false)
    window.onblur = onmouseup
  }

  clearRuler() {
    const { c, canvas, flipped } = this.state
    const { dpi, totemMarker } = this.props
    var rulerLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
    if (flipped) {
      c.clearRect(10, -65, -rulerLength - 20, 130)
    } else {
      c.clearRect(-2, -65, rulerLength + 20, 130)
    }
    if (!totemMarker || !totemMarker.h) return
    var edgeX = totemMarker.w * dpi + 8
    if (flipped) {
      c.clearRect(4, -4, -edgeX, totemMarker.h * dpi + 8)
    } else {
      c.clearRect(-4, -4, edgeX, totemMarker.h * dpi + 8)
    }
  }

  drawTotem(totemMarker) {
    const { c, flipped } = this.state
    const { dpi } = this.props
    c.strokeStyle = 'green'
    c.fillStyle = 'white'
    var marker = totemMarker
    var edgeX = marker.w * dpi
    if (flipped) edgeX = -edgeX
    c.moveTo(edgeX, -60)
    c.lineTo(edgeX, 60)
    if (marker.h) {
      // Workaround for http://crbug.com/87097 : draw the leftmost vertical line
      // twice, by itself, so that it doesn't get cut off in Chrome.
      c.stroke()
      c.beginPath()
      c.moveTo(0, 0)
      c.lineTo(0, marker.h * dpi)
      c.stroke()
      c.fill()
      c.beginPath()

      c.moveTo(0, 0)
      c.lineTo(edgeX, 0)
      c.lineTo(edgeX, marker.h * dpi)
      c.lineTo(0, marker.h * dpi)
      c.lineTo(0, 0)
    }
    c.stroke()
    c.fill()
    c.beginPath()
  }

  // /**
  //  * Draws the ticks and numbers. The tick lengths are given in an array.
  //  *
  //  * Caller is responsible for calling stroke() beginPath() after this function.
  //  *
  //  * @param {!CanvasRenderingContext2D} c
  //  * @param {!Array.<number>} array of heights of ticks (px)
  //  * @param {number} tickDistance horizontal distance between each tick (px)
  //  * @param {number} rulerLength horizontal length of ruler (px)
  //  * @param {boolean} isAboveLine true if we should draw above the line.
  //  */
  drawRulerHelper(c, ticks, tickDistance, rulerLength, isAboveLine) {
    const { flipped } = this.state
    // var i = 0
    c.textBaseline = isAboveLine ? 'bottom' : 'top'
    var numTicks = rulerLength / tickDistance
    var y0 = ticks[0]
    if (!isAboveLine) y0 = -y0

    // Workaround for http://crbug.com/87097 : draw the leftmost vertical line
    // twice, by itself, so that it doesn't get cut off in Chrome.
    c.stroke()
    c.beginPath()
    c.moveTo(0, 0)
    c.lineTo(0, y0)
    c.stroke()
    c.beginPath()

    for (let i = 0; i < numTicks; ++i) {
      var x = i * tickDistance
      if (flipped) x = -x
      var y = ticks[i % ticks.length]
      if (!isAboveLine) y = -y
      c.moveTo(x, 0)
      c.lineTo(x, y)
      if (i % ticks.length == 0) {
        c.fillText(i / ticks.length, x + 3, y)
      }
    }
  }

  drawRuler(newTotemMarker) {
    const { dpi } = this.props
    const { c, canvas, flipped } = this.state
    const totemMarker = this.props.totemMarker || newTotemMarker
    if (totemMarker) {
      this.drawTotem(totemMarker)
    }
    c.strokeStyle = 'black'
    c.fillStyle = 'black'
    c.beginPath()
    c.moveTo(0, 0)
    var rulerLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
    if (flipped) c.lineTo(-rulerLength, 0)
    else c.lineTo(rulerLength, 0)
    var tickDistance = dpi / 25.4,
      ticks = [30, 10, 10, 10, 10, 20, 10, 10, 10, 10]
    this.drawRulerHelper(c, ticks, tickDistance, rulerLength, true)
    c.stroke()
    c.beginPath()
  }

  render() {
    return (
      <canvas id="canvas" width="919" height="1014"></canvas>
    )
  }
}

const mapStateToProps = (state) => {
  return state.appReducer.config
}

const mapDispatchToProps = dispatch => {
  return {
    setOptionDpi: value => dispatch(setOptionStorage('dpi', value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalibrateCanvas)