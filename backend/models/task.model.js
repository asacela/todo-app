/*
	This file establishes the
	schemas for the databases
	used in this project.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
	Describes schema for tasks db.
	Used for storing task info that
	goes into the day schema.
*/
const taskSchema = new Schema({
	
  name: {
  	type: String,
  	required: true
  },
  points: {
  	type: Number,
  	required: true
  },
  duration: {
    type: Number,
    required: true
  },
  complete: {
  	type: Boolean,
  	required: true
  },
  backlog: {
    type: Boolean,
    required: true
  },
  streak: {
    type: Number,
    require: true
  },
}, {
	timestamps: true,
});


/*
  Export the schema.
*/
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;