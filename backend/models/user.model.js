/*
	This file establishes the
	schemas for the databases
	used in this project.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/* 
	Describes schema for rewards db.
	Used for storing reward info that
	goes into the user schema.
*/
const rewardSchema = new Schema({
	
  name: {
  	type: String,
  	required: true
  },
  pointsRequired: {
  	type: Number,
  	required: true
  },
  collectionBasis: {
  	type: String,
  	required: true
  },
}, {
	timestamps: true,
});

/* 
	Describes schema for users db.
	Used for storing users with
	special information.
*/
const userSchema = new Schema({

  username: { 
  	type: String, 
  	required: true, 
  	unique: true 
  },
  name: {
  	type: String
  },
  dailyScore: { 
  	type: Number, 
  	required: true 
  },
  weeklyScore: { 
  	type: Number, 
  	required: true 
  },
  monthlyScore: { 
  	type: Number, 
  	required: true 
  },
  yearlyScore: { 
  	type: Number, 
  	required: true 
  },
  rewards: [rewardSchema],
  recurringTasks: [],
  shortcuts: [],
}, {
	timestamps: true,
});

/*
	Export the schema.
*/
const User = mongoose.model('User', userSchema);
module.exports = User;