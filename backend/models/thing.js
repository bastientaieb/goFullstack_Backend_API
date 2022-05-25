const mongoose = require("mongoose");

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});
// Schéma de base de données avec ce qui est attendue en entrée
// required signifie qu'il est obligatoire pour être enregistré dans la bdd

module.exports = mongoose.model("Thing", thingSchema);
//Méthode qui rend utilisable le schéma, on lui donne deux paramètres, le nom du type d'objet, ici Thing pour objet que les gens vont vendre. Ensuite on lui indique le schéma que l'on souhaite utiliser.
