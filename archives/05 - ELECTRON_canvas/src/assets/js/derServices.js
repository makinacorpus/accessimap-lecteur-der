class derServices {

    load(derZone) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './assets/der/carte_avec_source.svg',false);
        // Following line is just to be on the safe side;
        // not needed if your server delivers SVG with correct MIME type
        xhr.overrideMimeType('image/svg+xml');
        xhr.send('');
        derZone.appendChild(xhr.responseXML.documentElement);
    }
}

export default derServices;
