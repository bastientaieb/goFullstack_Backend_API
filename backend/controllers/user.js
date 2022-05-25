const bcrypt = require("bcrypt");
// Import du package installé dans le dossier backend pour sécuriser les mdp (npm install bcrypt)
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/user");

// On donne le mdp enregistré et on hash le mdp 10 fois pour sécuriser le mdp

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Fonction de connexion pour les routes Post

//Fonction asynchrone qui défini le hash avec son contenu (email enregistré + mdp hashé), passé ensuite dans le save pour sauvegarder les données sans contenir les mdp non cryptés
//then pour le status de réussite et catch pour l'erreur

// Fonction findOne pour récupérer le mail du body de la requête puis comparaison avec la bdd pour voir si le mail existe. Retourne une erreur si l'utilisateur n'existe pas.

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonwebtoken.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
//encodage du token grâce au package jsonwebtoken et à sa fonction sign avec la chaine RANDOM etc... et une expiration de 24h
// l'userId est encodé pour empêcher la modification d'objets par d'autres utilisateurs.
// Le token contient l'userId

// Comparaison du mot de passe de la requête avec le mot de passe de l'utilisateur
// Si il n'est pas valide (!valid) = différent de valide, retourne l'erreur 401 mot de passe incorrect
// Si c'est correct, on retourne un status 201 avec un objet JSON contenant l'userId et le token unique utilisateur
// Le catch erreur 500 retourne une erreur serveur

// npm install --save jsonwebtoken
