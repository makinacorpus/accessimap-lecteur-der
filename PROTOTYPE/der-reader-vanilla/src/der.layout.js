require('!style!css!sass!./scss/styles.scss');

var DerLayout = {

    init(container) {
        this.container = container || this._createElement('div', document.body, 'container');
        this.messageContainer   = this._createElement('div', this.container, 'message');
        this.derContainer       = this._createElement('div', this.container, 'der-container');
        this.aside              = this._createElement('aside', this.container, 'menu');
        this.formContainer      = this._createElement('form', this.aside);
        this.listContainer      = this._createElement('div', this.aside, 'files-list');
        this.switchModeContainer= this._createElement('div', this.aside, 'switch-mode');
    },

    getLayout: function(container) {
        this.init(container);

        return {
            container: this.container,
            messageContainer: this.messageContainer,
            derContainer: this.derContainer,
            formContainer: this.formContainer,
            listContainer: this.listContainer,
            switchModeContainer: this.switchModeContainer
        };
    },

    _createElement: function(type, container, className) {
        var element = document.createElement(type);

        if (className !== undefined) {
            element.setAttribute('class', className);
        }
        container.appendChild(element);
        return element;
    }

};


module.exports = DerLayout;
