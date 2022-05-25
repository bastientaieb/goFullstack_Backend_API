const multer = require("multer");
//Télécharger le package multer npm install --save multer
// Package de gestion de fichiers. 

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// diskStorage esr la méthode de configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
// Paramétrage des fichiers téléchargés avec paramétrage des noms de fichiers et de leurs extensions. 
// storage indique où les fichiers sont enregistrés et commment ils le sont. 
// filename indique la méthode de nomination en utilisant le nom d'origine avec des _ au lieu d'espaces et en ajoutant la date d'ajout dans le nom de fichier avec la bonne extension grâce à la fonction mimetype configurée. 


module.exports = multer({ storage }).single("image");
// Export du multer configuré avec la constante storage avec la possibilité de gérer uniquement les fichiers image. 