// Model de la route '/Challenges'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  Challengeid: { type: String }, // le numero du pari
  username: { type: String }, // le nom de l'utilisateur
  GameId: { type: String },   // l'id du game
  AmountStart: { type: Number },
  AmountEnd: { type: Number},
  Visibility: { type: String },
  UnderChallengesplaced: { type: Array},
  updatedAt: { type: Date }  // la date de modification/création de la réservation
});

let Model = mongoose.model('Challenge', Schema);

export default {
  getChallenges: () => {
    return Model.find({}).exec();
  },

  getChallenge: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createChallenge: (Challenge) => {
    return Model.create({
      username: Challenge.username,
      GameId: Challenge.GameId,
      AmountStart: Challenge.AmountStart,
      Visibility: Challenge.Visibility,
      AmountEnd: 0,
    })

    ;
  },

  joinChallenge: (_id, Challenge) => {
    return Model.findOneAndUpdate({ _id }, {
      username: Challenge.username,
      GameId: Challenge.GameId,
      result: Challenge.result,
      updatedAt: new Date()
    }, {upsert: true}).exec();

  },

  updateChallenge: (_id, Challenge) => {
    return Model.findOneAndUpdate({ _id }, {
      username: Challenge.username,
      GameId: Challenge.GameId,
      result: Challenge.result,
      updatedAt: new Date()
    }, {upsert: true}).exec();
  },

  deleteChallenges: () => {
    return Model.remove({}).exec();
  },

  deleteChallenge: (_id) => {
    return Model.remove({ _id }).exec();
  },

  getChallengesByGameId: (gameId) => {
    let matchingChallenges = [];
    return Model.find({}).exec().then( challenges => {
      challenges.map( challenge => {
        if (challenge.GameId = gameId) {
            matchingChallenges.push(challenge);
        }
      })
      return matchingChallenges;
    })
  }
};
