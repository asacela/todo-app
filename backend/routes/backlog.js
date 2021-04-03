// backlog.js

const router = require('express').Router();
let Day = require('../models/day.model');


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
router.route('/:id').delete((req, res) => {

	const today = req.body.date
  	Day.findByIdAndDelete({date: today}, { $pull: { tasks: { $_id: req.params.id } } })
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;