var React = require('react');

var FilesList = React.createClass({
  changeFile: function(event) {
    this.props.changeDocument(Number(event._targetInst._currentElement.key));
  },

  render: function() {
    console.log(this.props);
    return (
      <div className="files-list">
        <h2>Ce document contient plusieurs cartes. Laquelle voulez-vous afficher ?</h2>
        <ul>
          {this.props.files.map(function(file, key) {
            var className = (key === this.props.selectedDocument) ? 'selected' : '';
            return (
              <li key={key} onClick={this.changeFile}><a key={key} className={className}>{file.name.replace('.svg', '')}</a></li>
            );
          }.bind(this))}
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
