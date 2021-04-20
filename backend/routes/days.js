/*
	This file establishes the
	CRUD protocol for updating
	the days database.
*/

const router = require('express').Router();
let Day = require('../models/day.model');

/*
	Read.
	Get request for
	retrieves tasks from
	current day.
*/
router.route('/').get((req,res) => {

	var my_date = new Date();
	var utcDate = new Date(my_date.toUTCString());
	utcDate.setHours(utcDate.getHours()-8);

	const today = new Date(utcDate).toISOString().split("T")[0];
	// console.log(req.body.date);
	// var date = req.body.date;
	Day.find({date: String(today)})
	.then(tasks => res.json(tasks))
	.catch(err => res.status(400).json('Error: ' + err));
});

/*
	Read.
	Get request for
	retrieves tasks from
	specified day.
*/
router.route('/specifiedDay').get((req,res) => {

	const today = req.body.date
	Day.find({date: today})
	.then(tasks => res.json(tasks))
	.catch(err => res.status(400).json('Error: ' + err));
});

/*
	Create.
	Post request for
	retrieving tasks from
	specified day.
*/
router.route('/add').post((req, res) => {

	var my_date = new Date();
	var utcDate = new Date(my_date.toUTCString());
	utcDate.setHours(utcDate.getHours()-8);

	const date = new Date(utcDate).toISOString().split("T")[0];

	const numtasks = 0;
	const score = 0;
	const tasks = req.body.tasks

	const newDay = new Day({

		date,
		numtasks,
		score,
		tasks,
	});

	newDay.save()
	.then(() => res.json('Day Added!'))
	.catch(err => res.status(400).json('Error: ' + err));
});


/*
	Delete.
	Delete request for
	deleting tasks from
	specified day.
*/
router.route('/:id').delete((req, res) => {

	const today = req.body.date
  	Day.findByIdAndDelete({date: today}, { $pull: { tasks: { $_id: req.params.id } } })
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
	Update.
	Update request for
	updating 
	specified day.
*/
router.route('/update').post((req, res) => {

  	Day.findOne({date: String(req.body.date)})
    .then(day => {
      day.date = req.body.date;
      day.numtasks = Number(req.body.numtasks);
      day.score = Number(req.body.score);
      day.tasks = req.body.tasks;

      day.save()
        .then(() => res.json('Day updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

/*
	Add Task.
	Push task to
	array for
	specified day.
*/
router.route('/addTask').post((req, res) => {



  	Day.findOneAndUpdate({date: req.body.date},
  	{ 
  		$push: 
  		{ 
  			tasks: req.body.tasks 
  		} 
  	})
    .then(() => res.json('Task Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



/*
	Get Recurring Tasks.
	Pull task list from
	previous day.
*/
router.route('/recurring').get((req,res) => {

	var my_date = new Date();
	var utcDate = new Date(my_date.toUTCString());
	utcDate.setHours(utcDate.getHours()-8);
	const today = new Date(utcDate);
	
	today.setDate(today.getDate() - 1);
	Day.find({date: String(today.toISOString().split("T")[0])})
	.then(tasks => 
			res.json(tasks)
	)
	.catch(err => res.status(400).json('Error: ' + err));
});


/*
	Add Task.
	Push task to
	array for
	specified day.
*/
router.route('/addRecurringTasks').post((req, res) => {



  	Day.findOneAndUpdate({date: req.body.date},
  	{ 
  		$addToSet: 
  		{ 
  			tasks: req.body.tasks 
  		} 
  	})
    .then(() => res.json('Recurring Tasks Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


/*
	TODO: Update.
	Update request for
	updating tasks for
	given day.
*/




module.exports = router;