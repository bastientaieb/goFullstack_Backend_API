const Thing = require("../models/thing");

const fs = require("fs");
// Package filesystem qui donne l'accès aux fonctions qui permettent de modifier le système de fichiers et de le supprimer.

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
// thing({}) --> Raccourci dispo avec Javascript ...req.body pour indiquer que la totalité du body de la requête est pris en compte

// On ajoute le fichier à la requête createThing. On doit envoyer les données sous form de données (Js) donc fonction Parse pour le rendre utilisable.

// les ``permettent de définir l'url dynamique de l'image en utilisant req.protocol (http) et req.get('host') pour l'hôte serveur et enfin req.file.filename pour le nom du dossier de l'image.

exports.getOneThing = (req, res, next) => {
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
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Thing.updateOne(
    { _id: req.params.id },
    { ...thingObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
// Modification du PUT pour prendre en compte le changement d'image / de description.
// thingObject regarde si le fichier de la requête existe ou non.
// ? condition booléan si le fichier existe on traite la nouvelle image et on l'affiche avec un nouvel URL. Si elle n'existe pas on traite la nouvelle image en tant qu'objet entrant.

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      const filename = thing.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// On récupère le thing pour vérifier si c'est le bon thing de l'utilisateur qui effectue la requête
// Split dans l'URL de ce qu'il y 'avant images et après pour n'avoir que le nom de l'image.

// Fonction unlink du package fs pour supprimer le fichier qui se trouve dans images/filename

exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
