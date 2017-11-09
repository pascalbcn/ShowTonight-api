// Controller de la route '/Games'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import GameModel from "../models/GameModel";

const Games = () => {
  // On fait appel à la fonction getGames du model
  // Celle ci renvoie tous les Games présents en base
  return GameModel.getGames()
  .then((data) => {
    // On récupère ici data qui est une liste de Games

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noGamesError'
      throw new Error('noGamesError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let Game of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: Game._id,
        team_A: Game.team_A,
        team_B: Game.team_B,
        date: Game.date,
        stadium: Game.stadium,
        league: Game.league,
        goals_team_A: Game.goals_team_A,
        goals_team_B: Game.goals_team_B
        
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'team_A');
  });
}

const Game = (_id) => {
  // On fait appel à la fonction getGame du model
  // Celle ci renvoie le Game dont l'id est _id
  return GameModel.getGame(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de Games

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noGameError'
      throw new Error('noGameError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
      team_A: data.team_A,
      team_B: data.team_B,
      date: data.date,
      stadium: data.stadium,
      league: data.league,
      goals_team_A: data.goals_team_A,
      goals_team_B: data.goals_team_B
    };
    return response;
  });
}

const createGame = (Game) => {
  // On fait appel à la fonction createGame du model
  // Celle ci renvoie le Game dont l'id est _id
  return GameModel.createGame(Game);
}

const updateGame = (id, Game) => {
  // On fait appel à la fonction updateGame du model
  // Celle ci renvoie le Game dont l'id est _id
  return GameModel.updateGame(id, Game);
}

const deleteGame = (id) => {
  // On fait appel à la fonction deleteGame du model
  // Celle ci renvoie le Game dont l'id est _id
  return GameModel.deleteGame(id);
}

export default {
  // Controller des views
  getGames: (req, res) => {
    Games()
    .then((data) => {
      // data contient une liste de Games
      res.render('Game/Games', { Games: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getGame: (req, res) => {
    Game(req.params.id)
    .then((data) => {
      res.render('Game/Game', { Game: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateGame: (req, res) => {
    res.render('Game/createGame');
  },

  postCreateGame: (req, res) => {
    let Game = {
      id: req.body.id,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      date: req.body.date,
      stadium: req.body.stadium,
      league: req.body.league,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    createGame(Game)
    .then((data) => {
      res.redirect('/Games');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateGame: (req, res) => {
    Game(req.params.id)
    .then((data) => {
      res.render('Game/updateGame', { Game: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateGame: (req, res) => {
    let Game = {
      id: req.body.id,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      date: req.body.date,
      stadium: req.body.stadium,
      league: req.body.league,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    updateGame(req.params.id, Game)
    .then((data) => {
      res.redirect('/Games');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteGame: (req, res) => {
    deleteGame(req.params.id)
    .then((data) => {
      res.redirect('/Games');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getGamesApi: (req, res) => {
    Games()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de Games
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getGameApi: (req, res) => {
    Game(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateGameApi: (req, res) => {
    let Game = {
      id: req.body.id,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      date: req.body.date,
      stadium: req.body.stadium,
      league: req.body.league,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    createGame(Game)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateGameApi: (req, res) => {
    let Game = {
      id: req.body.id,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      date: req.body.date,
      stadium: req.body.stadium,
      league: req.body.league,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    updateGame(req.params.id, Game)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteGameApi: (req, res) => {
    deleteGame(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
