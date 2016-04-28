var app = {
    initialize: function() {
        this.env = 'electron';
        this.onReady();
    },

    onReady: function() {
        var logo = document.getElementById('logo');
        logo.innerHTML = '<img src="img/logo-' + app.env + '.png" alt="logo-env">';
    }
};

app.initialize();
