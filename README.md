## Comment l'utiliser :
```console
* git clone https://github.com/ArnaudBnd/carte-aux-tresors.git
* npm i
* npm start
```

## Lists des tests a effectuer :

* test_collision_joueur.txt:
Ce test va vérifier que les joueurs ne rentrent pas en collision.

* test_collision_montagne.txt:
Ce test va vérifier que le joueur ne rentre pas en collision avec une montagne.

* test_mis_en_page.txt:
Ce test vérifie la mise en page du jeu.

* test_plus_tresor.txt
Ce test va vérifier:
	- Récupération d'un trésor lorsqu'un joueur arrive dessus.
	- Diminution d'un trésor sur la case lorsqu'un joueur en à récupéré un.
	- Mettre la case à 0 lorsque la case ne possède plus de trésor.
	- Lorsqu'un joueur est sur une case avec plusieurs trésors, il en récupère qu'un.
	- Comptage des trésors pour tous les joueurs qui en récupèrent.
	- Changement d'orientation.