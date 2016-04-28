var app = {
    initialize: function() {
        this.env = 'cordova';
        this.bindEvents();
    },

    bindEvents: function() {
        if (app.env === 'cordova') {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }
        if (app.env === 'electron') {
            this.onDeviceReady();
        }
    },

    onDeviceReady: function() {
        var logo = document.getElementById('logo');
        logo.innerHTML = '<img src="img/logo-' + app.env + '.png" alt="logo-env">';
    }
};

app.initialize();
