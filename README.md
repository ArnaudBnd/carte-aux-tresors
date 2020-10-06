## Comment l'utiliser :
```console
* git clone https://github.com/ArnaudBnd/carte-aux-tresors.git
* npm i
* npm start
```

## Lancement des tests unitaire avec Jest :

```console
* npm test
```

### Tests effectués avec Jest:
* Vérification de l'incrémentation du nombre de trésor par joueur ainsi que par case.
* Vérification de la sorti de map du joueur, en haut, en bas, à gauche et à droite.
* Vérification si un joueur rencontre un autre joueur.
* Vérification si un joueur rencontre une montagne.
* Lorsqu'un joueur avance, recule, avance à droite et avance à gauche on vérifie qu'il avance bien ainsi que l'ancienne case est remis a 0.
* Vérification de l'orientation lorsqu'un joueur avance.
