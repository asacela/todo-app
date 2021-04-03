// analytics.js

const router = require('express').Router();
let Day = require('../models/day.model');

/*
	Read.
	Get request for
	retrieves days from
	database.
*/
router.route('/').get((req,res) => {

	Day.find({})
	.then(tasks => res.json(tasks))
	.catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;