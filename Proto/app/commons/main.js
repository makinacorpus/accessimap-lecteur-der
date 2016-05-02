const main = {
    initialize(app) {
        console.log('main');
        console.log(app);
        var logo = document.getElementById('logo');
        logo.innerHTML = '<img src="img/logo-' + app.env + '.png" alt="logo-env">';
    }
};

module.exports = main;
