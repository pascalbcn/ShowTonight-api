// Model de la route '/Games'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import GameSeeds from "../helpers/GameSeeds";

let Schema = new mongoose.Schema({
  id: { type: Number },         // Game number
  team_A: { type: String },     // home team
  team_B: { type: String },  // away team
  date: { type: Number },     // Game date
  stadium: { type: String },        // stadium
  league: { type: String },        // league
  goals_team_A: { type: Number },    // goals scored by home team 
  goals_team_B: { type: Number },       // goals scored by away team
 
});

let Model = mongoose.model('Game', Schema);

export default {
  seedGame: () => {
    let promises = [];
    for (let Game of GameSeeds){
      promises[promises.legth] = Model.create(Game);
    }
    return Promise.all(promises);
  },

  getGames: () => {
    return Model.find({}).exec();
  },

  getGames: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createGame: (Game) => {
    return Model.create({
      id: Game.id,
      team_A: Game.team_A,
      team_B: Game.team_B,
      date: Game.date,
      stadium: Game.stadium,
      league: Game.league,
      goals_team_A: Game.goals_team_A,
      goals_team_B: Game.goals_team_B,
      
    });
  },

  updateGame: (_id, Game) => {
    return Model.findOneAndUpdate({ _id }, {
      id: Game.id,
      team_A: Game.team_A,
      team_B: Game.team_B,
      date: Game.date,
      stadium: Game.stadium,
      league: Game.league,
      goals_team_A: Game.goals_team_A,
      goals_team_B: Game.goals_team_B
    }, {upsert: true}).exec();
  },

  deleteGames: () => {
    return Model.remove({}).exec();
  },

  deleteGames: (_id) => {
    return Model.remove({ _id }).exec();
  },
};