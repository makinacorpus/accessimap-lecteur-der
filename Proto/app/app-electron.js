var main = require('./commons/main');

const app = {
    initialize: function() {
        this.env = 'electron';
        main.initialize(app);
    }
};

app.initialize();
