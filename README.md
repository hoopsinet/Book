# Le Dernier Vol du Corbeau - Application Web Interactive

## Description
Une application web interactive pour le livre "Le Dernier Vol du Corbeau", permettant aux lecteurs de naviguer à travers l'histoire de manière immersive.

## Fonctionnalités

### Navigation
- Page de couverture interactive avec animation au survol
- Dos du livre avec synopsis
- Introduction
- Pages de personnages (Adeline et Ryu)
- Système de navigation fluide entre les pages
- Bouton "Retour" pour revenir aux pages précédentes

### Design
- Interface type livre avec pages doubles
- Dimensions des pages : 600x800 pixels
- Animations de transition entre les pages
- Design responsive adapté aux différentes tailles d'écran
- Effets visuels sur les interactions (hover, click)

### Contenu
- Couverture avec titre et nom de l'auteur
- Dos du livre avec synopsis complet
- Présentation des personnages principaux
- Images des personnages
- Navigation intuitive

## Structure du Projet

```
windsurf-app/
├── src/
│   ├── components/
│   │   └── Book/
│   │       ├── Book.js       # Composant principal du livre
│   │       └── Book.css      # Styles du livre
│   ├── assets/
│   │   └── images/
│   │       ├── book-covers/  # Images de couverture
│   │       ├── characters.js # Export des images des personnages
│   │       ├── cover.js      # Export de l'image de couverture
│   │       ├── Adeline.jpeg  # Image d'Adeline
│   │       └── Dos.png       # Image du dos du livre
│   └── App.js                # Point d'entrée de l'application
```

## Dernières Modifications
- Ajout du dos du livre avec synopsis
- Implémentation du bouton "Voir le résumé"
- Amélioration des transitions entre les pages
- Optimisation de l'affichage des images
- Ajustement du style et de la mise en page
- Amélioration de la navigation

## Guide d'Utilisation
1. La page de couverture s'affiche au démarrage
2. Cliquez sur "Voir le résumé" pour accéder au dos du livre
3. Naviguez à travers les pages en cliquant sur les boutons
4. Utilisez le bouton "Retour" pour revenir aux pages précédentes

## Améliorations Futures
- Ajout d'effets sonores pour les transitions
- Intégration d'animations plus complexes
- Ajout de nouveaux personnages
- Implémentation d'une table des matières
- Optimisation pour les appareils mobiles
- Ajout de marqueurs de page

## Technologies Utilisées
- React.js
- CSS moderne
- Animations CSS
- Gestion d'état React

## Installation et Démarrage
1. Clonez le repository
2. Installez les dépendances : `npm install`
3. Lancez l'application : `npm start`
4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur
