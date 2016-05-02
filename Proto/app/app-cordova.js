var main = require('./commons/main');

const app = {
    initialize: function() {
        this.env = 'cordova';
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        main.initialize(app);
    }
};

app.initialize();
