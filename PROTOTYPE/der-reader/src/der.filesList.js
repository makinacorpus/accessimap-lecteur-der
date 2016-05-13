var React = require('react');
var ReactDOM = require('react-dom');


var FilesList = React.createClass({
    getInitialState: function() {
        return {
            selectedDocument: 0
        }
    },

    getList: function() {
        var _this = this;
        console.log(this);
        if (this.props.files !== undefined) {
            this.props.files.map(function(file, index) {
                if (index === 0) {
                    return '';
                }
                var className = (index === _this.state.selectedDocument) ? 'selected' : '';
                return (
                    <li key={index}><a className={className}>{file.name.replace('.svg', '')}</a></li>
                );
            });
        } else {
            return '';
        }
    },

    render: function() {
        var _this = this;

        return (
            <div className="files-list">
                <ul>
                    {this.props.files.map(function(file, index) {
                        if (index === 0) {
                            return '';
                        }
                        var className = (index === _this.state.selectedDocument) ? 'selected' : '';
                        return (
                            <li key={index}><a className={className}>{file.name.replace('.svg', '')}</a></li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

//
// var DerFilesList = {
//
//     /**
// 	 * Show list of SVG files
// 	 * @param {Object} options
//      * {
//      *     files: {Object}
//      *     container: {HTMLElement} required
//      *     actions: {Function} required
//      *     selectedDocument: {Number} required
//      * }
// 	 */
//     init: function(options) {
//         this.listContainer = this.listContainer || this._createList(options.container);
//         this.selectedDocument = options.selectedDocument;
//
//         for (var i = 0; i < options.files.length; i++) {
//             if (i === 0) {
//                 this._resetFilesList();
//             }
//
//             var element = this._createListElement(options.files[i], i);
//             this._setEventsListener(element, i, options.actions);
//         }
//     },
//
//     changeFile: function(index) {
//         this.selectedDocument = index;
//         var links = document.querySelectorAll('.files-list a');
//
//         for (var i = 0; i < links.length; i++) {
//             if (i === this.selectedDocument) {
//                 links[i].className = 'selected';
//             } else {
//                 links[i].className = '';
//             }
//         }
//     },
//
//     _resetFilesList: function() {
//         this.listContainer.innerHTML = '';
//     },
//
//     _createList: function(container) {
//         var title = document.createElement('h2');
//         var ul = document.createElement('ul');
//         title.innerHTML = 'Ce document contient plusieurs cartes. Laquelle voulez-vous afficher ?';
//         container.appendChild(title);
//         container.appendChild(ul);
//         return ul;
//     },
//
//     _createListElement: function(element, index) {
//         var isSelected = (index === this.selectedDocument);
//         var li = document.createElement('li');
//         var a = document.createElement('a');
//         if (isSelected) {
//             a.className = 'selected';
//         }
//         a.innerHTML = element.name.replace('.svg', '');
//         li.appendChild(a);
//         this.listContainer.appendChild(li);
//         return a;
//     },
//
//     _setEventsListener: function(element, index, changeSvg) {
//         element.addEventListener('click', function(e) {
//             changeSvg(index);
//         });
//     }
// };
//
module.exports = FilesList;
