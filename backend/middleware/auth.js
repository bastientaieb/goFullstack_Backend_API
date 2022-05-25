const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonwebtoken.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};

// Va chercher dans le headers l'élément authorization qui contient le mot Bears plus le token, avec split on sépare en deux les éléments à partir de l'espace dans un tableau, puis on prend le second.

// req.auth = {userId} -> Donne accès au userId pour les requêtes avec la clé userId : userId qui devient juste userId grâce à Javascript
