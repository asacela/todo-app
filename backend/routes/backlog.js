// backlog.js

const router = require('express').Router();
// let Task = require('../models/task.model');
let Day = require('../models/day.model');
let ObjectId = require('mongodb').ObjectID;


/*
	Read.
	Get request for
	retrieves backlog tasks from
	all days.
*/
router.route('/').get((req,res) => {

	Day.find({}).select('tasks')
	.then(tasks => res.json(tasks))
	.catch(err => res.status(400).json('Error: ' + err));
});


/*
	Delete.
	Delete request for
	deleting backlog tasks from
	all documents.
*/
router.route('/delete/:pId/:id').delete((req, res) => {
  	Day.findOneAndUpdate({ _id: req.params.pId }, { $pull: { tasks: { _id: req.params.id } } })
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
	TODO...
	Complete Task.
	Post request for
	deleting backlog tasks from
	all documents.
*/
// router.route('/complete/:pId/:id').post((req, res) => {
//   	Day.findOneAndUpdate({ _id: req.params.pId },  {tasks: { _id : req.params.id} }, { $set : { "tasks.$" : req.body.tasks[0]} })
//     .then(() => res.json('Task deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


module.exports = router;