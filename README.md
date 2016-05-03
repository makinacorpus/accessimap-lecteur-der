# Lecteur de Document En Relief

Développements :
* https://github.com/makinacorpus/accessimap-lecteur-der

Wiki pour les échanges et la centralisation (interne Makina) :
* https://gitlab.makina-corpus.net/accessimap/accessimap-lecteur-der/wikis/home


# Tests réalisés :

* 01 - ELECTRON_voices_gestures
* 02 - CHROME-APP
* 03 - CORDOVA
* 04 - ELECTRON_svg
* 05 - ELECTRON_canvas
* 06 - CCA (Chrome Cordova App)


# Comment lancer et compiler les protos ?

## ELECTRON

Lancer l'app

```
electron <main js file>
```

Compiler l'app avec [electron packager](https://github.com/electron-userland/electron-packager)

```
electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch>
```
>>>>>>> Restructured folders and add electron app
