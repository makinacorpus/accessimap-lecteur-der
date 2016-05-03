# Lecteur de Document En Relief

## Prototype Electron/Cordova

Le Lecteur de Document En Relief (DER Reader) est un module pouvant fonctionner sur différentes plateformes.

Il se décline ici avec Cordova et Electron.
Chacun de ces projets utilisent des services spécifiques pour le TTS (Talk To Speech) qui doivent être fournis à l'utilisation du module der-reader.

## Utilisation du module der-reader

En JS, si on a accès à require

```
var DerReader = require('der-reader');
```
Ou dans le HTML

```
<script type="text/javascript" src="./index.js"></script>
```

Puis on initialise le module avec la configuration adéquate

```
DerReader.init({
    svgFile: './path/to/svg/der-file.svg',
    jsonFile: './path/to/json/der-file.json'
});
```


## Comment lancer et compiler les prototypes ?

### ELECTRON

Lancer l'app (développement)

```
cd electron
npm install
npm run start
```

Builder l'application (pour Windows x64, cf. script npm pour d'autres paramètres/os)

```
npm run build
```


### Cordova

```
cd cordova/www
npm install
cordova prepare
cordova run android
```
