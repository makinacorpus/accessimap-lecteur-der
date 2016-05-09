require('!style!css!sass!./scss/styles.scss');

var DerLayout = {
    createContainer: function(className) {
        var container = document.createElement('div');
        container.setAttribute('class', className);
        document.body.appendChild(container);
        return container;
    },

    createDerContainer: function(container) {
        var derContainer = document.createElement('div');
        derContainer.setAttribute('class', 'der-container');
        container.appendChild(derContainer);
        return derContainer;
    },

    createMessageContainer: function(container) {
        var messageContainer = document.createElement('div');
        messageContainer.setAttribute('id', 'message');
        container.parentNode.insertBefore(messageContainer, container);
        return messageContainer;
    },

    createForm: function(container) {
        var aside = document.createElement('aside');
        aside.setAttribute('class', 'menu');
        var form = document.createElement('form');
        aside.appendChild(form);
        container.appendChild(aside);
        return form;
    }
};


module.exports = DerLayout;
