# Accessimap - Lecteur de documents en relief

[![Build Status](https://travis-ci.org/makinacorpus/accessimap-lecteur-der.svg?branch=master)](https://travis-ci.org/makinacorpus/accessimap-lecteur-der)

Ce projet fait parti du projet de recherche Accessimap.

Le lecteur de documents en relief est relié au [projet de l'éditeur](https://github.com/makinacorpus/accessimap-editeur-der).

## Télécharger le lecteur

Pour télécharger la dernière version, merci d'aller à la [page de la dernière release](https://github.com/makinacorpus/accessimap-lecteur-der/releases/latest).

## Contribuer

Pour contribuer, merci de chercher si une issue github n'a pas déjà été ouverte (et/ou fermée).

Dans le cas contraire, ouvrez une issue et/ou proposez une PR.


## Détails du projet

Le Lecteur de Document En Relief (DER Reader) est un module pouvant fonctionner sur différentes plateformes.

Il se décline ici avec Cordova et Electron.
Chacun de ces projets utilisent des services spécifiques pour le TTS (Talk To Speech) qui doivent être fournis à l'utilisation du module der-reader.


Pour pouvoir utiliser une base commune entre la version windows et la version mobile, le coeur du projet se trouve dans un module appelé der-reader.

## Développement

Lancer le script du module der-reader

```
cd modules/der-reader
npm install
npm start
```

Dans une console différente, lancer le script pour démarrer electron

```
cd electron
npm install
npm start
```

## Explications techniques

### modules/der-reader

Le module est utilisé dans electron et cordova pour initialiser le module der-reader avec la configuration adéquate :

```jsx
DerReader.init({
    der: {
        svgFile: './der/carte_avec_source.svg',
        jsonFile: './der/interactions.json'
    }
});

```


### modules/*.tts

Selon les plateformes, cordova a besoin du plugin [cordova-tts](https://github.com/vilic/cordova-plugin-tts) alors que electron sait gérer l'[API HTML Web Speech](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

Chaque implémentation de ces services se trouve dans un module intépendant de der-reader, il faut donc les charger, et indiquer le service tts à utiliser en paramètre de l'initialisation de der-reader.

On charge de la même manière que der-reader le module souhaité, soit pour Electron :


```jsx
DerReader.init({
    der: {
        svgFile: './der/carte_avec_source.svg',
        jsonFile: './der/interactions.json'
    },
    tts: webspeechapi
});
```


### electron

Lors du développement de der-reader, changer le chemin des modules pour éviter de devoir effectuer un npm install pour mettre à jour le module à chaque modification.
Ne pas oublier de remettre le bon chemin lors du build.

```js
// Dev
var webspeechapi = require('./../tts.webspeechapi/tts.webspeechapi.js');
var DerReader = require('./../der-reader/der-reader.js');

// Bundle
// var webspeechapi = require('tts.webspeechapi');
// var DerReader = require('der-reader');
```


Builder l'application (pour Windows x64, cf. script npm pour d'autres paramètres/os). Nécéssice wine, cf. .travis.yml pour installer les dépendances.

```
npm install der-reader # mettre à jour le module
npm run build
```


### cordova

```
cd cordova/www
npm install
cordova prepare
cordova run android
```

### Comment générer automatiquement les builds ?

Ce projet est câblé à Travis CI.

A chaque nouveau commit, travis vérifiera que le build pour electron se construit correctement.

Pour ajouter ces builds aux releases, il faut créer une nouvelle release en respectant le [Semantic Versioning](http://semver.org/).

Travis déclenchera à nouveau un build electron, et attachera les résultats (zip pour windows, AppImage pour Linux) à la dernière release créée.


## [/archives] Expérimentations réalisées

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
