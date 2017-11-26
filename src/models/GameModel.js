// Model de la route '/Games'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import GameSeeds from "../helpers/GameSeeds";

let Schema = new mongoose.Schema({
  id: { type: String },         // Game number
  team_A: { type: String },     // home team
  team_B: { type: String },  // away team_B
  logoTeam_A: { type: String },     // l'URL du logo
  logoTeam_B: { type: String },  // l'URL du logo
  date: { type: Date },     // Game date
  stadium: { type: String },        // stadium
  league: { type: String },        // league
  goals_team_A: { type: Number },    // goals scored by home team
  goals_team_B: { type: Number },       // goals scored by away team

});

let Model = mongoose.model('Game', Schema);

export default {
  seedGames: () => {
    let promises = [];
    for (let Game of GameSeeds){
      promises[promises.legth] = Model.create(Game);
    }
    return Promise.all(promises);
  },

  getGames: () => {
    return Model.find({}).exec();
  },

  getGame: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createGame: (Game) => {
    return Model.create({
      team_A: Game.team_A,
      team_B: Game.team_B,
      logoTeam_A: Game.logoTeam_A,
      logoTeam_B: Game.logoTeam_B,
      date: Game.date,
      stadium: Game.stadium,
      league: Game.league
    });
  },

  updateGame: (_id, Game) => {
    return Model.findOneAndUpdate({ _id }, {
      team_A: Game.team_A,
      team_B: Game.team_B,
      logoTeam_A: Game.logoTeam_A,
      logoTeam_B: Game.logoTeam_B,
      date: Game.date,
      stadium: Game.stadium,
      league: Game.league
    }, {upsert: true}).exec();
  },

  deleteGames: () => {
    return Model.remove({}).exec();
  },

  deleteGame: (_id) => {
    return Model.remove({ _id }).exec();
  },
};
