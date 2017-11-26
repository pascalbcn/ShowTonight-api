// Controller de la route '/bets'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import BetModel from "../models/BetModel";
import GameModel from "../models/GameModel";

const bets = () => {
  return BetModel.getBets()
  .then((data) => {
    if (data === null) {
      throw new Error('noBetsError');
    }

    let response = [];
    for (let bet of data){

      let game = GameModel.getGame(bet.GameId).then((data) => {
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

      console.log(game);
      response[response.length] = {
        id: bet.id,
        username: bet.username,
        GameId: bet.GameId,
        result: bet.result,
        updatedAt: bet.updatedAt,
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

const bet = (_id) => {
  return BetModel.getBet(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noBetError');
    }

    let game = GameModel.getGame(bet.GameId).then((data) => {
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

    console.log(game);
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

const createBet = (bet) => {
  return BetModel.createBet(bet);
}

const updateBet = (id, bet) => {
  return BetModel.updateBet(id, bet);
}

const deleteBet = (id) => {
  return BetModel.deleteBet(id);
}

export default {
  // Controller des views
  getBets: (req, res) => {
    bets()
    .then((data) => {
      res.render('bet/bets', { bets: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getBet: (req, res) => {
    bet(req.params.id)
    .then((data) => {
      res.render('bet/bet', { Bet: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateBet: (req, res) => {
    GameModel.getGames()
    .then((data) => {
      console.log(data);
      res.render('bet/createBet', { Games: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateBet: (req, res) => {
    let bet = {
      username: req.body.username,
      GameId: req.body.GameId,
      result: req.body.result
    };

    createBet(bet)
    .then((data) => {
      res.redirect('/bets');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateBet: (req, res) => {
    Promise.all([
      bet(req.params.id),
      GameModel.getGames(),
    ])
    .then((data) => {
      console.log(data[1]);
      res.render('bet/updateBet', { Bet: data[0], Games: data[1], Results: ["Home team wins", "Away team wins", "Draw"] });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateBet: (req, res) => {
    let bet = {
      id: req.body.id,
      GameId: req.body.GameId,
      result: req.body.result,
      username: req.body.username
    };

    updateBet(req.params.id, bet)
    .then((data) => {
      res.redirect('/bets');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteBet: (req, res) => {
    deleteBet(req.params.id)
    .then((data) => {
      res.redirect('/bets');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // Controller des Apis
  getBetsApi: (req, res) => {
    bets()
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getBetApi: (req, res) => {
    bet(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateBetApi: (req, res) => {
    let bet = {
      username: req.body.username,
      GameId: req.body.GameId,
      result: req.body.result
    };

    createBet(bet)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateBetApi: (req, res) => {
    let bet = {
      id: req.body.id,
      GameId: req.body.GameId,

    };

    updateBet(req.params.id, bet)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteBetApi: (req, res) => {
    deleteBet(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
