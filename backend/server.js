const http = require("http");
// module qui permet d'ajouter des fonctionnalités normalement accessible qu'avec un browser
const app = require("./app");
// import de l'app créé

/* app.set("port", process.env.PORT || 3000);
const server = http.createServer(app); */
// req = demande & res = réponse du serveur

// res.end("string") => Méthode qui renvoie une réponse de type string à l'appelant.

// http.createServer() => Fonction exécutée à chaque appel du serveur (node server.js dans le Terminal)
/* 
server.listen(process.env.PORT || 3000); */
// Permet de préciser que si le port 3000 n'est pas disponible, le serveur utilisera un autre port

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000"); 
app.set("port", port);
// Configure le port, la fonction normalizePort permet de renvoyer un port valide si il est fourni sous forme de chaine avec les fonctions parseInt et isNaN

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// fonction de gestion des erreurs

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});
// fonction qui enregistre le port ou le canal sur lequel le serveur s'exécute.

server.listen(port);
