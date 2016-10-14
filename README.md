# Accessimap - Lecteur de documents en relief

[![Build Status](https://travis-ci.org/makinacorpus/accessimap-lecteur-der.svg?branch=master)](https://travis-ci.org/makinacorpus/accessimap-lecteur-der)

Ce projet fait parti du projet de recherche Accessimap.

Le lecteur de documents en relief est relié au [projet de l'éditeur](https://github.com/makinacorpus/accessimap-editeur-der).

## Télécharger le lecteur

Pour télécharger la dernière version, merci d'aller à la [page de la dernière release](https://github.com/makinacorpus/accessimap-lecteur-der/releases/latest).

## Contribuer

Pour contribuer, merci de chercher si une issue github n'a pas déjà été ouverte (et/ou fermée).

Dans le cas contraire, ouvrez une issue et/ou proposez une PR.

## Expérimentations réalisées

Plusieurs expérimentations ont été réalisées afin de trouver la meilleure 
stack de développement.

Ces expérimentations sont désormais dans le répertoire 'archives'.

* 01 - ELECTRON_voices_gestures
* 02 - CHROME-APP
* 03 - CORDOVA
* 04 - ELECTRON_svg
* 05 - ELECTRON_canvas
* 06 - CCA (Chrome Cordova App)
* 07 - MENU

## Détails du projet

Le Lecteur de Document En Relief (DER Reader) est un module pouvant fonctionner sur différentes plateformes.

Il se décline ici avec Cordova et Electron.
Chacun de ces projets utilisent des services spécifiques pour le TTS (Talk To Speech) qui doivent être fournis à l'utilisation du module der-reader.

### Utilisation du module der-reader et des services TTS

#### der-reader

En JS, si on a accès à require

```
var DerReader = require('der-reader');
```
Ou dans le HTML

```
<script type="text/javascript" src="node_modules/der-reader/der-reader.js"></script>
```

Puis on initialise le module avec la configuration adéquate

```
DerReader.init({
    der: {
        svgFile: './der/carte_avec_source.svg',
        jsonFile: './der/interactions.json'
    }
});

```

Pour modifier der-reader

```
npm install
npm run start  # Webpack with --watch option
npm run build  # Build project
```


#### Services tts

Selon les plateformes, cordova a besoin du plugin [cordova-tts](https://github.com/vilic/cordova-plugin-tts) alors que electron sait gérer l'[API HTML Web Speech](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

Chaque implémentation de ces services se trouve dans un module intépendant de der-reader, il faut donc les charger, et indiquer le service tts à utiliser en paramètre de l'initialisation de der-reader.

On charge de la même manière que der-reader le module souhaité, soit pour Electron :

```
var webspeechapi = require('tts.webspeechapi');
```

Et pour Cordova :

```
<script type="text/javascript" src="node_modules/tts.cordova/tts.cordova.js"></script>
```


```
DerReader.init({
    der: {
        svgFile: './der/carte_avec_source.svg',
        jsonFile: './der/interactions.json'
    },
    tts: webspeechapi
});
```


### Comment lancer et compiler les prototypes ?

### Electron

Lancer l'app (développement)

```
cd electron
npm install
npm run start
```

Lors du développement de der-reader, changer le chemin des modules pour éviter de devoir effectuer un npm install pour mettre à jour le module à chaque modification.
Ne pas oublier de remettre le bon chemin lors du build.

```
// Dev
var webspeechapi = require('./../tts.webspeechapi/tts.webspeechapi.js');
var DerReader = require('./../der-reader/der-reader.js');

// Bundle
// var webspeechapi = require('tts.webspeechapi');
// var DerReader = require('der-reader');
```

Builder l'application (pour Windows x64, cf. script npm pour d'autres paramètres/os)

```
npm install der-reader
npm run build
```


### Cordova

```
cd cordova/www
npm install
cordova prepare
cordova run android
```
