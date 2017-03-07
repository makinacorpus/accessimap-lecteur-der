/**
 * Let's get our coordinate spaces correct.
 *
 * Most things are in CSS pixels. any element's style.width, clientWidth,
 * offsetWidth, etc. are in CSS pixels. Some important dimensions in CSS pixels:
 * * "layout viewport": document.documentElement.clientWidth and -Height.
 *   The width of the viewport (minus scroll bars).
 *   This is the value that style.width: 100% means (on an element in viewport
 *   element's block formatting context)
 *   On an iPhone, this is the width of the document when fully zoomed out.
 *   On mobile it doesn't change when zoomed; layout is not recalculated.
 *   On desktop it changes to match the size of the visual vieport (except that
 *   it doesn't include the scrollbar).
 * * "visual viewport": window.innerWidth and -Height. It becomes small when
 *   the user zooms in on an iPhone because only a few CSS pixels can fit in
 *   the window.
 * * "document width": jQuery(document).width()
 *   (which gets max of clientWidth, scrollWidth, offsetWidth)
 *   the width of the document, which is equal to the "layout viewport" width
 *   but if the document overflows, it should include that overflow.
 *   FF: getComputedStyle(document.documentElement).width
 *   (webkit erroneously returns width of viewport even if document overflows)
 *   Webkit, FF<4: document.width (but screen pixels only)
 * aka: "browser pixels", "logical" pixels (IE)
 *
 * Within the canvas, there's a new coordinate space with
 * canvas.width by canvas.height pixels (which are the same as
 * canvas.getAttribute('width') and and likewise for height). These are
 * also the intrinsic CSS width/height, if you don't specify them explicitly
 * (similar to how an image has an intrinsic height--except that a canvas's
 * intrinsic width changes whenever you set the canvas.width). Typically
 * the canvas is stored as a bitmap that stores canvas pixels, but HTML5 says
 * that the browser is free to use a higher-resolution bitmap to store the
 * canvas pixels. Not sure how that would work though.
 *
 * Of course, when you issue draw commands, they go through the 2d context's
 * transformation matrix before being plotted on the canvas, but I'm assuming
 * you know how to use the canvas.
 *
 * Next, there's the screen pixels, which refer to the reported resolution of
 * the screen. Normally, this is the same as the physical pixels, but on
 * high-res mobile browsers the screen resolution is less than the device
 * resolution. Here are the things that are measured in screen pixels:
 * 1) screen.width and height: the screen resolution (e.g. 1024x768).
 *    (also screen.availWidth and -Height, which doesn't include the start menu
 *    etc.)
 * 2) window.screenX and -Y (screenLeft and -Right on IE):
 *    the position of the outer border of the browser
 *    widnow from the top left of the screen.
 * 3) window.outerWidth and -Height: the size of the browser window within
 *    the screen.
 * 4) event.screenX and -Y: the position of the mouse relative to the top
 *    left of the screen.
 * These are in CSSOM-View, although that spec doesn't even mention device
 * pixels. The spec has caught up to IE 6 but is unaware of modern browsers'
 * zoom (before, browsers would zoom text only without having device pixels
 * separate from screen pixels).
 * aka: "system" pixels (IE8+)
 *
 * Finally, there are the "device pixels," which are the physical pixels that
 * the browser draws to. Most of the time this is the same thing as screen
 * pixels, but iPhone 4 and Nexus One report a low screen-resolution (320px)
 * but actually have a high device resolution. (Actually, Nexus One reports 
 * screen pixels = device pixels (~800px) unless you set 
 * <meta name=viewport content="width=device-width">
 * and then it reports screen width = 320px)
 * The ratio between screen pixels and device pixels is window.devicePixelRatio
 * (webkit only so far).
 * [1]: http://www.quirksmode.org/blog/archives/2010/09/combining_meta.html
 *
 * So how do they relate to one another?
 * * CSS pixels / canvas pixels = canvas.clientWidth / canvas.width
 * * screen pixels / CSS pixels: "zoom level" in modern desktop browsers
 *   IE 8: screen.systemXDPI / screen.logicalXDPI
 *   IE 7: var body = document.body,r = body.getBoundingClientRect(); return (r.left-r.right)/body.offsetWidth [2], [6]
 *   Webkit, FF<4: document.width / document.documentElement.clientWidth [5]
 *       (but if document overflows the viewport, Webkit gives wrong answer)
 *   Old webkit: getComputedStyle(document.documentElement,null).getPropertyCSSValue('width').getFloatValue(CSSPrimitiveValue.CSS_PX) / document.documentElement.clientWidth
 *   Opera: document.documentElement.offsetWidth / window.innerWidth [7]
 *       (off by scrollbar)
 *       (Qurksmode says it's a bug; innerWidth should be CSS px) [8]
 *   Other: Flash solution [4]
 *   Alternately, measure change in screenX / change in clientX
 *   FF4+: media queries binary search
 * * device pixels / screen pixels:
 *   IE 8: screen.deviceXDPI / screen.systemXDPI
 *   Webkit (Nexus One, iPhone4): window.devicePixelRatio.

[2]: http://help.dottoro.com/ljgshbne.php
[3]: Adjusting Scale for Higher DPI Screens: the equivalent of
    "a pixel is not a pixel"
    http://msdn.microsoft.com/en-us/library/ms537625(v=vs.85).aspx
[4]: http://blog.sebastian-martens.de/2009/12/how-to-detect-the-browser-zoom-level-change-browser-zoo/
[5]: http://stackoverflow.com/questions/1713771/how-to-detect-page-zoom-level-in-all-modern-browsers
[6]: http://stackoverflow.com/questions/680596/how-to-get-zoom-level-in-internet-explorer-7-javascript
[7]: http://virtuelvis.com/archives/2005/05/opera-measure-zoom
[8]: http://www.quirksmode.org/m/widths.html

* See this guide to different kinds of pixels:
* http://www.quirksmode.org/mobile/viewports.html
* See this reference for the nitty gritty.
* http://www.quirksmode.org/m/widths.html
* more:
* http://menacingcloud.com/?c=highPixelDensityDisplays
*/

/** This function returns 96.
 *
 * I thought this would do the trick (and looking at other Web rulers, other
 * people thought so too), but unfortunately it doesn't work on modern browsers.
 *
 * Originally, CSS defined "absolute" units like cm and in as the physical size
 * on the screen, which you can configure by changing the dpi in the
 * operating system's display preferences. However, since nobody used this
 * responsibly (instead assuming the Windows default of 96dpi), CSS 2.1 has
 * taken away this tool, and now one 1in = 96px by law. In other words, CSS
 * can no longer provide any clues to the actual DPI. In Ian Hickson's defense,
 * this is probably the *only* time I've ever wanted to get the px/in ratio.
 *
 * See this post for explanation.
 * http://www.webkit.org/blog/57/css-units/
 * As well as this one on the Mozilla side:
 * http://weblogs.mozillazine.org/roc/archives/2010/01/css_absolute_le.html
 *
 * Note: it seems that IE has added a screen.deviceXDPI property but
 * it also has nothing to do with physical DPI (it just assumes 96dpi).
 * So it's just more silliness. See
 * http://msdn.microsoft.com/en-us/library/cc849094(v=vs.85).aspx
 */
export const cssDpi = function () {
    var d = document.createElement('div');
    d.style.width = '10in';
    d.style.height = '10px';
    document.body.appendChild(d);
    var dpi = d.offsetWidth / 10;
    document.body.removeChild(d);
    return dpi;
};

export const clampDpi = function (dpi) {
    if (dpi < 5) dpi = 5;
    if (dpi > 1000) dpi = 1000;
    return dpi;
};

var c = canvas.getContext('2d');
var clearRuler = function () {
    var rulerLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
    if (options.flipped) {
        c.clearRect(10, -65, -rulerLength - 20, 130);
    } else {
        c.clearRect(-2, -65, rulerLength + 20, 130);
    }
    if (!totemMarker || !totemMarker.h) return;
    var edgeX = totemMarker.w * options.dpi + 8;
    if (options.flipped) {
        c.clearRect(4, -4, -edgeX, totemMarker.h * options.dpi + 8);
    } else {
        c.clearRect(-4, -4, edgeX, totemMarker.h * options.dpi + 8);
    }
};
/** @type {{w: number, h: (number|undefined)}} */
var totemMarker = null;

/**
 * Draws the ticks and numbers. The tick lengths are given in an array.
 *
 * Caller is responsible for calling stroke(); beginPath() after this function.
 *
 * @param {!CanvasRenderingContext2D} c
 * @param {!Array.<number>} array of heights of ticks (px)
 * @param {number} tickDistance horizontal distance between each tick (px)
 * @param {number} rulerLength horizontal length of ruler (px)
 * @param {boolean} isAboveLine true if we should draw above the line.
 */
function drawRulerHelper(c, ticks, tickDistance, rulerLength, isAboveLine) {
    var i = 0;
    c.textBaseline = isAboveLine ? 'bottom' : 'top';
    var numTicks = rulerLength / tickDistance;
    var y0 = ticks[0];
    if (!isAboveLine) y0 = -y0;

    // Workaround for http://crbug.com/87097 : draw the leftmost vertical line
    // twice, by itself, so that it doesn't get cut off in Chrome.
    c.stroke();
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, y0);
    c.stroke();
    c.beginPath();

    for (var i = 0; i < numTicks; ++i) {
        var x = i * tickDistance;
        if (options.flipped) x = -x;
        var y = ticks[i % ticks.length];
        if (!isAboveLine) y = -y;
        c.moveTo(x, 0);
        c.lineTo(x, y);
        if (i % ticks.length == 0) {
            c.fillText(i / ticks.length, x + 3, y);
        }
    }
}
var drawRuler = function () {
    var dpi = options.dpi;
    c.strokeStyle = 'black';
    c.beginPath();
    c.moveTo(0, 0);
    var rulerLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
    if (options.flipped) c.lineTo(-rulerLength, 0);
    else c.lineTo(rulerLength, 0);
    if (options.drawInches) {
        // 1 tick = 1/16 in = dpi/16 px.
        var tickDistance = dpi / 16,
            isAboveLine = options.drawInches === 1,
            ticks = [];
        for (var i = 0; i < 16; i++) {
            var y = i % 16 == 0 ? 50 : i % 8 === 0 ? 30 : i % 4 === 0 ? 20 : i % 2 === 0 ? 15 : 10;
            ticks.push(y);
        }
        drawRulerHelper(c, ticks, tickDistance, rulerLength, isAboveLine);
    }
    if (options.drawMetric) {
        // 1 tick = 1 mm = 1/25.4 in = dpi/25.4px
        var tickDistance = dpi / 25.4,
            isAboveLine = options.drawMetric === 1,
            ticks = [30, 10, 10, 10, 10, 20, 10, 10, 10, 10];
        drawRulerHelper(c, ticks, tickDistance, rulerLength, isAboveLine);
    }
    c.stroke();
    c.beginPath();
    if (totemMarker) {
        c.strokeStyle = 'green';
        var marker = totemMarker;
        var edgeX = marker.w * dpi;
        if (options.flipped) edgeX = -edgeX;
        c.moveTo(edgeX, -60);
        c.lineTo(edgeX, 60);
        if (marker.h) {
            // Workaround for http://crbug.com/87097 : draw the leftmost vertical line
            // twice, by itself, so that it doesn't get cut off in Chrome.
            c.stroke();
            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(0, marker.h * dpi);
            c.stroke();
            c.beginPath();

            c.moveTo(0, 0);
            c.lineTo(edgeX, 0);
            c.lineTo(edgeX, marker.h * dpi);
            c.lineTo(0, marker.h * dpi);
            c.lineTo(0, 0);
        }
        c.stroke();
        c.beginPath();
    }
};
var dpiCalibrated = false;
var currentTransform = {
    x: 20,
    y: 50,
    angle: 0
};
var options = {
    dpi: 96,
    drawMetric: 2,
    drawInches: 1,
    flipped: false
};
var screenInfo = {
    screenWidthPx: screen.width,
    screenHeightPx: screen.height
};
window.onresize = function () {
    // TODO: set resolution-dependent width
    canvas.width = canvas.offsetWidth; //document.documentElement.clientWidth;
    canvas.height = canvas.offsetHeight; // document.documentElement.clientHeight;
    c.translate(currentTransform.x, currentTransform.y);
    c.rotate(currentTransform.angle);
    drawRuler();
};
// TODO: save this before so we don't have to do it on unload
onunload = function () {
    // store cookie for 30 days
    var c = 'ruleroptions='
    if (dpiCalibrated) c += 'dpi=' + options.dpi + '&';
    c += 'm=' + options.drawMetric + '&i=' + options.drawInches + '; Max-Age=2592000;';
    document.cookie = c;
};
export const parseCookie = function () {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; ++i) {
        var idx = cookies[i].indexOf('=');
        var name = cookies[i].substr(0, idx).replace(/^\s+|\s+$/g, '');
        if (name != 'ruleroptions') continue;
        var value = cookies[i].substr(idx + 1).replace(/^\s+|\s+$/g, '');
        var cookieParts = value.split('&');
        for (var j = 0; j < cookieParts.length; ++j) {
            var eq = cookieParts[j].indexOf('=');
            var k = cookieParts[j].substr(0, eq);
            var v = cookieParts[j].substr(eq + 1);
            if (k == 'dpi') {
                options.dpi = clampDpi(parseFloat(v) || 96);
                dpiCalibrated = true;
            } else if (k == 'm') {
                options.drawMetric = '1' == v ? 1 : v == '0' ? 0 : 2;
            } else if (k == 'i') {
                options.drawInches = '1' == v ? 1 : v == '0' ? 0 : 2;
            }
        }
    }
    if (options.drawInches == 1 && options.drawMetric == 1) {
        options.drawMetric = 2;
    } else if (options.drawInches == 2 && options.drawMetric == 2) {
        options.drawMetric = 1;
    }
};
parseCookie();
var MouseDownModes = {
    MOVING: 0,
    CALIBRATING: 1,
    ROTATING: 2
};


export const setTotem = function (o) {
    clearRuler();
    totemMarker = o;
    drawRuler();
};
window.onresize();