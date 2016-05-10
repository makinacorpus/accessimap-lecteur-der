require('!style!css!sass!./scss/styles.scss');

var DerLayout = {
    getLayout: function(container) {
        return {
            container: container || this.createContainer('container'),
            derContainer: this.createDerContainer(),
            messageContainer: this.createMessageContainer(),
            formContainer: this.createForm(),
            listContainer: this.createFilesList()
        };
    },

    createContainer: function(className) {
        this.container = document.createElement('div');
        this.container.setAttribute('class', className);
        document.body.appendChild(this.container);
        return this.container;
    },

    createDerContainer: function() {
        this.derContainer = document.createElement('div');
        this.derContainer.setAttribute('class', 'der-container');
        this.container.appendChild(this.derContainer);
        return this.derContainer;
    },

    createMessageContainer: function() {
        this.messageContainer = document.createElement('div');
        this.messageContainer.setAttribute('id', 'message');
        this.container.parentNode.insertBefore(this.messageContainer, this.container);
        return this.messageContainer;
    },

    createForm: function() {
        this.aside = document.createElement('aside');
        this.aside.setAttribute('class', 'menu');
        var form = document.createElement('form');
        this.aside.appendChild(form);
        this.container.appendChild(this.aside);
        return form;
    },

    createFilesList: function() {
        var list = document.createElement('ul');
        this.aside.appendChild(list);
        return list;
    }
};


module.exports = DerLayout;
