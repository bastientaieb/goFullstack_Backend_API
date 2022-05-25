const mongoose = require("mongoose");
// Connexion à la bdd
const uniqueValidator = require("mongoose-unique-validator");
// Import du package de validation d'email unique

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// model Schéma utilisé pour créer la façon et les caractéristiques de connexions à la base de données

userSchema.plugin(uniqueValidator);
// Package téléchargé qui permet de s'assurer qu'une adresse email ne peut pas être utilisée plusieurs fois pour créer un compte

module.exports = mongoose.model("user", userSchema);
// Rend disponible ce fichier
