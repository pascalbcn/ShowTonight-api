// Récupération des librairies de base permettant de faire un serveur d'API
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import exphbs from "express-handlebars";

// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku
import config from "./config";
import HandlebarsConfig from "./helpers/HandlebarsConfig";

// Récupération des controllers
import SeedDbController from "./controllers/SeedDbController";
import HomeController from "./controllers/HomeController";
import GameController from "./controllers/GameController";
import ChallengeController from "./controllers/ChallengeController";

// Configuration du serveur
const viewsPath = __dirname + '/views/';
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(favicon(path.resolve('./src/assets/favicon.png')));

server.use(express.static(path.resolve('./src/assets')));
server.set('views', path.resolve('./src/views'));
server.engine('.hbs', exphbs(HandlebarsConfig));
server.set('view engine', '.hbs');

server.set('port', (process.env.PORT || 5000));
server.listen(server.get('port'), () => {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée
mongoose.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + config.bddUri, {}, (err, res) => {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + config.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + config.bddUri);
  }
});


// Routes pour initialiser la base
server.post('/seeddb', SeedDbController.seedDb);


// Routes pour les vues
server.get('/', HomeController.getIndex);

server.get('/games', GameController.getGames);
server.get('/Games/id/:id', GameController.getGame);
server.get('/Games/create', GameController.getCreateGame);
server.post('/Games/create', GameController.postCreateGame);
server.get('/Games/update/:id', GameController.getUpdateGame);
server.post('/Games/update/:id', GameController.postUpdateGame);
server.get('/Games/delete/:id', GameController.getDeleteGame);

server.get('/Games/ChallengesOnGame/:id', GameController.getChallengesOnGame);

server.get('/Challenges', ChallengeController.getChallenges);
server.get('/Challenges/id/:id', ChallengeController.getChallenge);
server.get('/Challenges/create', ChallengeController.getCreateChallenge);
server.post('/Challenges/create', ChallengeController.postCreateChallenge);
server.get('/Challenges/update/:id', ChallengeController.getUpdateChallenge);
server.post('/Challenges/update/:id', ChallengeController.postUpdateChallenge);
server.get('/Challenges/delete/:id', ChallengeController.getDeleteChallenge);

//server.get('/Challenges/BetsOnChallenge/:id', ChallengeController.getBetsOnChallenge);


// Routes pour les APIs
server.get('/api/', HomeController.getIndexApi);

server.get('/api/Games', GameController.getGamesApi);
server.get('/api/Games/id/:id', GameController.getGameApi);
server.post('/api/Games/create', GameController.postCreateGameApi);
server.post('/api/Games/update/:id', GameController.postUpdateGameApi);
server.post('/api/Games/delete/:id', GameController.postDeleteGameApi);

server.get('/api/Challenge', ChallengeController.getChallengeApi);
server.get('/api/Challenge/id/:id', ChallengeController.getChallengeApi);
server.post('/api/Challenge/create', ChallengeController.postCreateChallengeApi);
server.post('/api/Challenge/update/:id', ChallengeController.postUpdateChallengeApi);
server.post('/api/Challenge/delete/:id', ChallengeController.postDeleteChallengeApi);
