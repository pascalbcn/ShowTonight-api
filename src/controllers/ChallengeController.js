// Controller de la route '/Challenges'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import ChallengeModel from "../models/ChallengeModel";
import GameModel from "../models/GameModel";
import BetModel from "../models/BetModel";

const Challenges = () => {
  return ChallengeModel.getChallenges()
  .then((data) => {
    if (data === null) {
      throw new Error('noChallengesError');
    }

    let response = [];
    for (let Challenge of data){

      let game = GameModel.getGame(Challenge.GameId).then((data) => {
        let value = {
          team_A: data.team_A,
          team_B: data.team_B,
          logoTeam_A: data.logoTeam_A,
          logoTeam_B: data.logoTeam_B,
          goals_team_A: data.goals_team_A,
          goals_team_B: data.goals_team_B
        };
        return value;
      });

      response[response.length] = {
        id: Challenge.id,
        username: Challenge.username,
        GameId: Challenge.GameId,
        AmountStart: Challenge.AmountStart,
        Score1: Challenge.Score1,
        Score2: Challenge.Score2,
        User2: Challenge.User2,
        AmountEnd: Challenge.AmountEnd,
        updatedAt: Challenge.updatedAt,
        team_A: game.team_A,
        team_B: game.team_B,
        logoTeam_A: game.logoTeam_A,
        logoTeam_B: game.logoTeam_B,
        goals_team_A: game.goals_team_A,
        goals_team_B: game.goals_team_B
      }
    }
    return _.sortBy(response, 'updatedAt').reverse();
  });
}

const Challenge = (_id) => {
  return ChallengeModel.getChallenge(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noChallengeError');
    }

    let game = GameModel.getGame(Challenge.GameId).then((data) => {
      let value = {
        team_A: data.team_A,
        team_B: data.team_B,
        logoTeam_A: data.logoTeam_A,
        logoTeam_B: data.logoTeam_B,
        goals_team_A: data.goals_team_A,
        goals_team_B: data.goals_team_B
      };
      return value;
    });

    let response = {
      id: data.id,
      username: data.username,
      GameId: data.GameId,
      result: data.result,
      updatedAt: data.updatedAt,
      team_A: game.team_A,
      team_B: game.team_B,
      logoTeam_A: game.logoTeam_A,
      logoTeam_B: game.logoTeam_B,
      goals_team_A: game.goals_team_A,
      goals_team_B: game.goals_team_B
    };
    return response;
  });
}

const createChallenge = (Challenge) => {
  return ChallengeModel.createChallenge(Challenge);
}

const updateChallenge = (id, Challenge) => {
  return ChallengeModel.updateChallenge(id, Challenge);
}

const deleteChallenge = (id) => {
  return ChallengeModel.deleteChallenge(id);
}

const BetsForChallenge = (_id) => {
  return BetModel.getBetsByChallengeId(_id).then( (data) => {
      if (data === null) {
        // Si data est vide, nous renvoyons l'erreur 'noGameError'
        throw new Error('Pas encore de bet!');
      }

      else {
      // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
     let response = [] ;
      for (let Bet of data) {
      
          response[response.length] = {
          id: Bet.id,
          ChallengeId: Bet.ChallengeId,
          username: Bet.username,
          goals_team_A: Bet.goals_team_A,
          goals_team_B: Bet.goals_team_B,
          updatedAt: Bet.updatedAt
      } ;}
      return _.sortBy(response, 'date').reverse();
    }
  });
} 




export default {
  // Controller des views
  getChallenges: (req, res) => {
    Challenges()
    .then((data) => {
      res.render('Challenge/Challenges', { Challenges: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getChallenge: (req, res) => {
    Challenge(req.params.id)
    .then((data) => {
      res.render('Challenge/Challenge', { Challenge: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateChallenge: (req, res) => {
    GameModel.getGames()
    .then((data) => {
      console.log(data);
      res.render('Challenge/createChallenge', { Games: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateChallenge: (req, res) => {
    let Challenge = {
      username: req.body.username,
      GameId: req.body.GameId,
      result: req.body.result
    };

    createChallenge(Challenge)
    .then((data) => {
      res.redirect('/Challenges');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateChallenge: (req, res) => {
    Promise.all([
      Challenge(req.params.id),
      GameModel.getGames(),
    ])
    .then((data) => {
      console.log(data[1]);
      res.render('Challenge/updateChallenge', { Challenge: data[0], Games: data[1], Results: ["Home team wins", "Away team wins", "Draw"] });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateChallenge: (req, res) => {
    let Challenge = {
      id: req.body.id,
      GameId: req.body.GameId,
      result: req.body.result,
      username: req.body.username
    };

    updateChallenge(req.params.id, Challenge)
    .then((data) => {
      res.redirect('/Challenges');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteChallenge: (req, res) => {
    deleteChallenge(req.params.id)
    .then((data) => {
      res.redirect('/Challenges');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },


getBetsOnChallenges: (req, res) => {
    Bets()
    .then((data) => {
      res.render('/Games/ChallengesOnGame/:id', { Challenges: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },


postCreateBetOnChallenge: (req, res) => {
    let Bet = {
      username: req.body.username,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    createBet(Bet)
    .then((data) => {
      res.redirect('/Games/ChallengesOnGame/:id');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },






  // Controller des Apis
  getChallengesApi: (req, res) => {
    Challenges()
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getChallengeApi: (req, res) => {
    Challenge(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateChallengeApi: (req, res) => {
    let Challenge = {
      username: req.body.username,
      GameId: req.body.GameId,
      result: req.body.result
    };

    createChallenge(Challenge)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateChallengeApi: (req, res) => {
    let Challenge = {
      id: req.body.id,
      GameId: req.body.GameId,

    };

    updateChallenge(req.params.id, Challenge)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteChallengeApi: (req, res) => {
    deleteChallenge(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
