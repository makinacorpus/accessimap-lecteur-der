require('!style!css!sass!./Calibrate.scss');
var React = require('react');
const Navigation = require('../../../components/Navigation/Navigation.js');

var CalibrateMenu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      activeMenu: 0,
      calibrateMode: false
    };
  },

  componentDidUpdate: function() {
    console.log(this.state)
    if (this.state.calibrateMode) {
      var canvas = document.getElementById('canvas');
      if (!canvas.getContext) {
          canvas.style.display = 'none';
          document.write(
              '<h1>Sorry, you\u2019re using an obsolete browser. ' +
              'Come back with Chrome, Firefox, Opera,' +
              '<a href="http://www.google.com/chromeframe">Chrome Frame</a>, etc.</h1>');
      }
      canvas.addEventListener('mousedown', function (e) {
          // clientX is position relative to viewport in CSS pixels.
          var dragStartX = e.clientX,
              dragStartY = e.clientY;
          var lastClientX = dragStartX,
              lastClientY = dragStartY;
          var lastMouseAngle = Math.atan2(e.clientY - currentTransform.y,
              e.clientX - currentTransform.x);
          var mode = MouseDownModes.MOVING;
          var resizeToTotem = function (e) {
              // project the click point onto the ruler vector, which is
              var a = e.clientX - currentTransform.x;
              var b = e.clientY - currentTransform.y;
              var r = Math.sqrt(a * a + b * b);
              var theta = Math.atan2(b, a);
              var projection = r * Math.cos(theta - currentTransform.angle);
              if (options.flipped) {
                  projection = -projection;
              }
              var newDpi = projection / totemMarker.w;
              newDpi = clampDpi(newDpi);
              options.dpi = newDpi;
          };
          if (totemMarker) {
              mode = MouseDownModes.CALIBRATING;
          }
          if (e.shiftKey) mode = MouseDownModes.MOVING; // even while calibrating, you can move
          else if (e.ctrlKey) mode = MouseDownModes.ROTATING;
          if (mode === MouseDownModes.CALIBRATING) {
              clearRuler();
              resizeToTotem(e);
              drawRuler();
          }
          var onmousemove = function (e) {
              e.preventDefault(); // prevent text selection
              e.stopPropagation();
              // canvas.width = canvas.width;  // clear the canvas and also the transform
              clearRuler();
              if (mode === MouseDownModes.MOVING) {
                  var dx = e.clientX - lastClientX;
                  var dy = e.clientY - lastClientY;
                  c.rotate(-currentTransform.angle)
                  c.translate(dx, dy);
                  c.rotate(currentTransform.angle)
                  currentTransform.x += dx;
                  currentTransform.y += dy;
              } else if (mode === MouseDownModes.CALIBRATING) {
                  resizeToTotem(e);
              } else if (mode === MouseDownModes.ROTATING) {
                  var currentMouseAngle = Math.atan2(e.clientY - currentTransform.y,
                      e.clientX - currentTransform.x);
                  var angleChange = currentMouseAngle - lastMouseAngle;
                  currentTransform.angle += angleChange;
                  c.rotate(angleChange);
                  lastMouseAngle = currentMouseAngle;
              }
              drawRuler();
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
          break;
        case 'a4':
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