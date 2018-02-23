// Model de la route '/bets'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  id: { type: String }, // le de l'Bet
  username: { type: String }, // le nom de l'utilisateur
  ChallengeId: { type: String },   // l'id du game: { type: Number },
  goals_team_A: { type: Number},
  goals_team_B: { type: Number},
  date: { type: Date }  // l
});

let Model = mongoose.model('Bet', Schema);

export default {
  getBets: () => {
    return Model.find({}).exec();
  },

  getBet: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  
  CreateBet: (_id, bet) => {
    return Model.findOneAndUpdate({ _id }, {
      username: Bet.username,
      Betid: Bet.Betid,
      goals_team_A: Bet.Betid,
      goals_team_B: Bet.Betid,
      date: new Date(),
    }, {upsert: true}).exec();
    },

 getBetsByChallengeId: (ChallengeId) => {
    let matchingBets = [];
    return Model.find({}).exec().then( bets => {
      bets.map( bets => {
        if (bet.ChallengeId = ChallengeId) {
            matchingBets.push(bet);
        }
      })
      return matchingBets;
    })
  }





  };


