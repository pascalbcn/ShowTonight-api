// Model de la route '/bets'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  betid: { type: String }, // le numero du pari
  username: { type: String }, // le nom de l'utilisateur
  GameId: { type: String },   // l'id du game
     // je ne sais pas comment écrire la partie won comme elle est vide au départ
  result: { type: String }, // le detail du pari
  createdAt: { type: Date },  // la date de création de la réservation
  updatedAt: { type: Date }  // la date de modification de la réservation
});

let Model = mongoose.model('Bet', Schema);

export default {
  getBets: () => {
    return Model.find({}).exec();
  },

  getBet: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createBet: (bet) => {
    return Model.create({
      username: bet.username,
      GameId: bet.GameId,
      result: bet.result,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  updateBet: (_id, bet) => {
    return Model.findOneAndUpdate({ _id }, {
      username: bet.username,
      GameId: bet.GameId,
      result: bet.result,
      updatedAt: new Date()
    }, {upsert: true}).exec();
  },

  deleteBets: () => {
    return Model.remove({}).exec();
  },

  deleteBet: (_id) => {
    return Model.remove({ _id }).exec();
  },
};