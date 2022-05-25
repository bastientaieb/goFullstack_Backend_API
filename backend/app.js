const express = require("express");
const bodyParser = require("body-parser");
// Express représente le type d'application
// Ils représentent des fonctions appelés middleware.
const mongoose = require("mongoose");
const path = require("path");
// Importation du package Path, il va permettre de rendre statique le dossier images pour l'enregistrement des images des objets.

const stuffRoutes = require("./routes/stuff");
// Configure les routes comme avant en complétant avec les routes écrites dans stuff.js
const userRoutes = require("./routes/user");
// Import des routes pour les connexions

mongoose
  .connect(
    "mongodb+srv://bastien:bastien@openclassrooms.fhy6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à Mango réussi"))
  .catch(() => console.log("Connexion à MangoDB échouée"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// setHeader défini les types de Header autorisé pour les méthodes. On voit ici les méthodes autorisées pour l'utilisation de l'API.
// Pas de route indiquée après le use pour permettre son déploiement sur toute l'API

app.use(bodyParser.json());
//Extrait le corps en JSON de la requête Post
// Body-parser peut le faire, il convertit les données en JSON

/* app.use((req, res, next) => {
  console.log("Requête reçue");
  next();
});
// next qui permet de faire passer d'un middleware à l'autre

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "votre requête apparait" });
  next();
});

app.use((req, res) => {
  console.log("Demande finale envoyée");
}); */
// réponse de l'app au serveur lorsque l'on l'importe dans le fichier server.js
// On utilise réponse (res).json pour envoyer dans ce format

// Dans le dernier middleware, pas de next car c'est la fin de la suite de middleware

// Permet de configurer le CROS (Cross Origin Resource Sharing)

app.use("/images", express.static(path.join(__dirname, "images")));
// A chaque image enregistrée, chemin statique défini avec le nom du sous repertoire de base images

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
// Utilisation des routes avec le chemin créé pour le frontend

module.exports = app;
