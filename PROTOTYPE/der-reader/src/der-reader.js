require('!style!css!sass!./scss/styles.scss');

// var DerLayout = require('./der.layout.js');
var DerContainer = require('./der.file.js');
var FileInput = require('./components/FileInput.js');
var DerMode = require('./der.mode.js');
var Utils = require('./der.utils.js');
var FastClick = require('fastclick');
var TouchEmulator = require('hammer-touchemulator');
var FilesList = require('./der.filesList.js');

var React = require('react');
var ReactDOM = require('react-dom');


var Menu = React.createClass({
    render: function() {
        var files = this.props.files || [];
        return (
            <div className="menu">
                <FileInput />
                <FilesList files={files} />
                <DerMode />
            </div>
        );
    }
});

var Message = React.createClass({
    render: function() {
        return (
            <div className="message">
            {this.props.text}
            </div>
        );
    }
});


var App = React.createClass({
    getInitialState: function() {
        return {
            message: '',
            mode: DerReader.options.defaultMode,
            derFile: DerReader.options.derFile
        }
    },

    showMessage: function(text, type) {
        this.setState({message: text});
    },

    setFilesList: function(files) {
        this.setState({files: files});
    },

    render: function() {
        return (
            <div className="container">

                <Message text={this.state.message} />

                <DerContainer
                    setFilesList={this.setFilesList}
                    message={this.showMessage}
                    tts={DerReader.options.tts}
                    mode={this.state.mode}
                    derFile={this.state.derFile} />

                <Menu files={this.state.files} />

            </div>
        );
    }
});


var DerReader = {
    /**
	 * Initialise DER Reader
	 * @param {Object} options
     * {
     *     derFile: {string (zip file)} required
     *     tts: {Function} required
     *     defaultMode: {string}
     *     container: {HTMLElement}
     * }
	 */
    init: function(options) {
        this.options = options;
        FastClick.attach(document.body, {});
        TouchEmulator();

        ReactDOM.render(
          <App options={options} />,
          document.getElementById(options.container)
        );

    },
//
//         this.layout = DerLayout.getLayout(options.container);
//
//         DerForm.init(this.layout.formContainer, this.message);
//         // DerMode.init(this.layout.switchModeContainer, this.mode, this.changeMode);
//
//         Utils.getFileObject(this.derFile, function (file) {
//             DerFile.init({
//                 message: DerReader.message,
//                 layout: DerReader.layout,
//                 tts: DerReader.tts,
//                 mode: DerReader.mode
//             });
//             DerFile.openDerFile(file);
//         });
//
//         ReactDOM.render(
//           <DerReader />,
//           document.body
//         );
//
//         return this;
//     },
//

//
//     changeMode: function(mode) {
//         this.mode = mode;
//     },
//
    // _setOptions(options) {
    //     options = options || {};
    //     this.container = options.container;
    //     this.derFile = options.derFile;
    //     this.tts = options.tts;
    //     this.mode = options.defaultMode || 'explore';
    // }
};

module.exports = DerReader;
