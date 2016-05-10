var DerMode = {
    init: function(container, mode, actions) {
        this._setDomElements(container, mode);
        var defaultMode = document.getElementById(mode);
        defaultMode.checked = true;
    },

    _setDomElements: function(container) {
        var mode_explore = document.createElement('input');
        mode_explore.setAttribute('type', 'radio');
        mode_explore.setAttribute('name', 'mode');
        mode_explore.setAttribute('id', 'explore');

        var mode_explore_label = document.createElement('label');
        mode_explore_label.setAttribute('for', 'explore');
        mode_explore_label.innerHTML = 'Exploration';

        var mode_search = document.createElement('input');
        mode_search.setAttribute('type', 'radio');
        mode_search.setAttribute('name', 'mode');
        mode_search.setAttribute('id', 'search');

        var mode_search_label= document.createElement('label');
        mode_search_label.setAttribute('for', 'search');
        mode_search_label.innerHTML = 'Recherche';

        container.appendChild(mode_explore);
        container.appendChild(mode_explore_label);
        container.appendChild(mode_search);
        container.appendChild(mode_search_label);
    }
};



module.exports = DerMode;
