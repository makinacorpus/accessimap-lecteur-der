var Utils = require('./der.utils.js');

var title = document.createElement('h2');
title.setAttribute('class', 'title');
title.innerHTML = 'Mode';

var mode_explore = document.createElement('input');
Utils.setAttributes(mode_explore, {
    'type': 'radio',
    'name': 'mode',
    'id': 'explore'
});

var mode_explore_label = document.createElement('label');
mode_explore_label.setAttribute('for', 'explore');
mode_explore_label.innerHTML = 'Exploration';

var mode_search = document.createElement('input');
Utils.setAttributes(mode_search, {
    'type': 'radio',
    'name': 'mode',
    'id': 'search'
});

var mode_search_label= document.createElement('label');
mode_search_label.setAttribute('for', 'search');
mode_search_label.innerHTML = 'Recherche';

var choose_element = document.createElement('button');
choose_element.innerHTML = 'Choisir un élément à trouver';
choose_element.setAttribute('class', 'choose-element');


var DerMode = {
    init: function(container, mode) {
        this._setDomElements(container, mode);
        this._setEventListener();
        var defaultMode = document.getElementById(mode);
        defaultMode.click;
        defaultMode.checked = true;
    },

    _setDomElements: function(container) {
        container.appendChild(title);
        container.appendChild(mode_explore);
        container.appendChild(mode_explore_label);
        container.appendChild(mode_search);
        container.appendChild(mode_search_label);
        container.appendChild(choose_element);
    },

    _setEventListener: function() {
        mode_explore.addEventListener('click', this.setExploreMode);
        mode_search.addEventListener('click', this.setSearchMode);
    },

    setExploreMode: function(event) {
        console.log(event);
        choose_element.style.display = 'none';
    },

    setSearchMode: function(event) {
        console.log(event);
        choose_element.style.display = 'block';
    }
};

module.exports = DerMode;
