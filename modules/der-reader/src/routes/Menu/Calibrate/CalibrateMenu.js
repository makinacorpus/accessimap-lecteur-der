require('!style!css!sass!./Calibrate.scss');
import React from 'react';
import Navigation from '../../../components/Navigation/Navigation.js';
import { drawRuler, clearRuler, clampDpi } from './Calibrate';

var CalibrateMenu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      activeMenu: 0,
      calibrateMode: false,
      /** @type {{w: number, h: (number|undefined)}} */
      totemMarker: null,
      currentTransform: {
        x: 0,
        y: 0,
        angle: 0
      },
      options: {
        dpi: 96,
        drawMetric: 2,
        drawInches: 1,
        flipped: false
      }
    };
  },

  setTotem: function(o) {
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    clearRuler(c, canvas, this.state.options);
    this.setState({totemMarker: o});
    drawRuler(c, canvas, this.state.totemMarker, this.state.options);
  },

  componentDidUpdate: function() {
    if (this.state.calibrateMode) {
      var canvas = document.getElementById('canvas');
      var c = canvas.getContext('2d');
      if (!canvas.getContext) {
          canvas.style.display = 'none';
          document.write(
              '<h1>Sorry, you\u2019re using an obsolete browser. ' +
              'Come back with Chrome, Firefox, Opera,' +
              '<a href="http://www.google.com/chromeframe">Chrome Frame</a>, etc.</h1>');
      }

      var screenInfo = {
        screenWidthPx: screen.width,
        screenHeightPx: screen.height
      };

      canvas.width = canvas.offsetWidth; //document.documentElement.clientWidth;
      canvas.height = canvas.offsetHeight; // document.documentElement.clientHeight;
      c.translate(this.state.currentTransform.x, this.state.currentTransform.y);
      c.rotate(this.state.currentTransform.angle);
      drawRuler(c, canvas, this.state.totemMarker, this.state.options);

      canvas.addEventListener('mousedown', (e) => {
          // clientX is position relative to viewport in CSS pixels.
          var dragStartX = e.clientX,
              dragStartY = e.clientY;
          var lastClientX = dragStartX,
              lastClientY = dragStartY;
          var lastMouseAngle = Math.atan2(e.clientY - this.state.currentTransform.y,
              e.clientX - this.state.currentTransform.x);
          // var mode = MouseDownModes.MOVING;

          var resizeToTotem = (e) => {
              // project the click point onto the ruler vector, which is
              var a = e.clientX - this.state.currentTransform.x;
              var b = e.clientY - this.state.currentTransform.y;
              var r = Math.sqrt(a * a + b * b);
              var theta = Math.atan2(b, a);
              var projection = r * Math.cos(theta - this.state.currentTransform.angle);
              if (this.state.options.flipped) {
                  projection = -projection;
              }
              var newDpi = projection / this.state.totemMarker.w;
              newDpi = clampDpi(newDpi);
              this.setState({options: { ...this.state.options, dpi: newDpi }});
          };

          clearRuler(c, canvas, this.state.options);
          resizeToTotem(e);
          drawRuler(c, canvas, this.state.totemMarker, this.state.options);

          var onmousemove = (e) => {
              e.preventDefault(); // prevent text selection
              e.stopPropagation();
              clearRuler(c, canvas, this.state.options);
              resizeToTotem(e);

              drawRuler(c, canvas, this.state.totemMarker, this.state.options);
              lastClientX = e.clientX;
              lastClientY = e.clientY;
          };
          var onmouseup = function (e) {
              document.removeEventListener('mousemove', onmousemove, true);
              document.removeEventListener('mouseup', onmouseup, false);
              window.onblur = null;
          };
          document.addEventListener('mousemove', onmousemove, true);
          document.addEventListener('mouseup', onmouseup, false);
          window.onblur = onmouseup;
      }, false);
    }
  },

  handleAction: function() {
    let path = this.props.route.childRoutes[this.state.activeMenu].path;
    let format = this.props.route.childRoutes[this.state.activeMenu].format;
    if (path === 'back') {
      this.props.actions.toggleMenu('menu', 'Fermeture du menu');
    }

    else if (format) {
      console.log(format)
      this.setState({calibrateMode: true});
      switch(format) {
        case 'a3':
          this.setTotem({w:21.0/2.54,h:29.7/2.54,name:'a4 paper'});
          break;
        case 'a4':
          this.setTotem({w:21.0/2.54,h:29.7/2.54,name:'a4 paper'});
          break;
        case 'a5':
          break;
        default:
          break;
      }
    } else {
      this.context.router.push('menu/calibrate/' + path);
    }
  },

  changeActiveMenu: function(index) {
    this.setState({activeMenu: index});
  },

  read: function(text) {
    this.props.options.tts.speak(text);
  },

  render: function() {
    if (this.state.calibrateMode) {
      return (
        <canvas id="canvas" width="919" height="1014"></canvas>
      );
    }
    return (
      <Navigation
        action={this.handleAction}
        index={this.state.activeMenu}
        items={this.props.route.childRoutes}
        changeIndex={this.changeActiveMenu}
        read={this.read}
        >
      </Navigation>
    );
  }
});

module.exports = CalibrateMenu;