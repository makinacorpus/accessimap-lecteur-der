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
    },
    
    setAttributes: function(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    },

    message: function(message, type, container) {
        if (type !== undefined) {
            container.innerHTML = '<span class="' + type + '">' + message + '</span>';
        } else {
            container.innerHTML = message;
        }
    }
};

module.exports = Utils;
