const express = require("express");
const router = express.Router();
// Création d'un routeur Express pour enregistrer toutes les routes de l'app.js

const stuffCtrl = require("../controllers/stuff");

const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

// import des middlewares et des logiques métiers pour les stuffs / l'authentification et la configuration des images
// Ce sont les fonctions exportés des différentes requêtes sur l'application

router.post("/", auth, multer, stuffCtrl.createThing);
router.put("/:id", auth, multer, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.get("/", auth, stuffCtrl.getAllStuff);
// on ajoute la route auth qui vient du middleware d'authentification pour protéger les actions des différentes requêtes en s'assurant que l'User Id est correct (Token crypté)

//multer doit être ajouté après auth pour ne pas enregistrés des images non autorisées 



module.exports = router;
// Sert à rendre disponible les routes pour l'app ?

/* 
// Permet de simplifier l'écriture de title : req.body.title, etc...
// la nouvelle instance new permet de déduire automatiquement les clés title: etc... Seul le contenu change

// Précise l'endroit ou seront stocké les requêtes POST pour l'API.
// res.status(201) est important pour la création de ressource
// thing avec les deux promises permet de retourner les résultats de la requête

router.get("/:id", (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});
//Permet d'indiquer le chemin pour la page individuel d'un produit en ajoutant le :id on indique un élément dynamique qui va dépendre d'un élément de l'objet puis on ajoute le findOne pour bien ne prendre qu'un élément de la base de données.

// On indique la route voulue et non la route existante, elle est définie ici.

router.put("/:id", (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({
        message: "Thing updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
// Requête Put pour modifier
// Deux paramètres pour updateOne pour lui donner en premier l'id de l'objet à modifier et en second argument, la nouvelle version de l'objet. Les ... récupère le corps de la requête Think de la modification.

router.delete("/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

router.get("/", (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
// Tout est envoyé sous format JSON.

// Le prix doit être affiché en centimes pour éviter les erreurs dues à des virgules.

module.exports = router;
// export de l'router pour l'utiliser dans le server
 */
