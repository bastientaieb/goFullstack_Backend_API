const express = require("express");

const router = express.Router();
// Création du router
const userCtrl = require("../controllers/user");
// Import des routes user (Le fichier)

router.post("/signup", userCtrl.signup);
// Importation des routes Post pour la création et la connexion des comptes (Les fonctions)

router.post("/login", userCtrl.login);

module.exports = router;
// Exportation pour rendre disponible fichier avec Require