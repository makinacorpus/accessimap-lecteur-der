var DerFilesList = {
    init: function(files, container) {
        this.listContainer = this._createList(container);
        this.selectedElement = 0;

        for (var file in files) {
            var isSelected = (parseInt(file) === this.selectedElement);
            this._createListElement(files[file], isSelected);
        }
    },

    _createList: function(container) {
        var title = document.createElement('h2');
        var ul = document.createElement('ul');
        title.innerHTML = 'Votre document contient plusieurs cartes. Quelle carte voulez-vous afficher ?';
        container.appendChild(title);
        container.appendChild(ul);
        return ul;
    },

    _createListElement: function(element, isSelected) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        if (isSelected) {
            a.className = 'selected';
        }
        a.innerHTML = element.name.replace('.svg', '');
        li.appendChild(a);
        this.listContainer.appendChild(li);
    }
};

module.exports = DerFilesList;
