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
      response[response.length] = {
        id: bet.id,
        username: bet.username,
        GameId: bet.GameId,
        
        bet: bet.bet,
        createdAt: bet.createdAt,
        updatedAt: bet.updatedAt,
      }
    }
    return _.sortBy(response, 'username');
  });
}

const bet = (_id) => {
  return BetModel.getBet(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noBetError');
    }

    let response = {
      id: data.id,
      username: data.username,
      GameId: data.GameId,
      
      bet: data.bet,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
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
      res.render('bet/bet', { bet: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateBet: (req, res) => {
    GameModel.getGames()
    .then((data) => {
      res.render('bet/createBet', { Games: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateBet: (req, res) => {
    let bet = {
      id: req.body.id,
      GameId: req.body.GameId,
      
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
      res.render('bet/updateBet', { bet: data[0], Games: data[1] });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateBet: (req, res) => {
    let bet = {
      id: req.body.id,
      GameId: req.body.GameId,
      
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
      id: req.body.id,
      GameId: req.body.GameId,
      
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
