# Foody App

Foody App est une application web pour la gestion et la consultation de recettes culinaires. Elle permet aux utilisateurs de découvrir des recettes et à un administrateur de gérer le contenu.

Technologies utilisées : Frontend : React.js (Vite), React Router, Axios, CSS. Backend : Node.js, Express.js, MySQL, Multer (upload d’images).

Installation et exécution locale :
Prérequis : Node.js (v16 ou plus), npm, MySQL, Git. 

Étapes : 1) Cloner le projet depuis GitHub :
`git clone https://github.com/JamilaAssila/foody-app.git`.

2) Lancer le frontend :
ouvrir un terminal dans le dossier `foody-app` puis `npm install` et `npm run dev`.
 L’application sera accessible sur http://localhost:5173.

3) Lancer le backend : ouvrir un terminal dans le dossier `foody-backend`, puis `npm install` et `node server.js`. L’API backend sera accessible sur http://localhost:5000.

 4) Configurer la base de données : créer une base nommée `foodyp.sql` et ajouter un utilisateur administrateur avec Email : `admin@foody.com`, Mot de passe : `1234`.

Comptes de test : Administrateur : Email : `admin@foody.com`, Mot de passe : `1234`, Accès au Dashboard : http://localhost:5173/admin. Utilisateur : créer un compte via la page d’inscription.

Fonctionnalités : Utilisateur : consulter les recettes, rechercher / filtrer les recettes, voir les détails d’une recette. Administrateur : ajouter, modifier, supprimer des recettes, upload d’images.

Tester l’application : ouvrir http://localhost:5173, se connecter en tant qu’administrateur pour accéder au Dashboard, ajouter/modifier/supprimer des recettes, créer un compte utilisateur et tester la recherche et consultation des recettes.

Remarques : les images sont stockées dans le dossier `images`. L’accès au Dashboard est protégé par le rôle administrateur.


