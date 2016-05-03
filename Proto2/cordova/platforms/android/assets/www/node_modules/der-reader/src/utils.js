var Utils = {
    load: function(file) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file);
            xhr.send('');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.error);
                }
            };
        });
    }
};

module.exports = Utils;
