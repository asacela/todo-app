// navbar-form.component.js

import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import icons from 'glyphicons';
import axios from 'axios';

export default class NavbarTools extends Component {


	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePointsChange = this.handlePointsChange.bind(this);
		this.handleDurationChange = this.handleDurationChange.bind(this);
		this.updateTaskList = this.updateTaskList.bind(this);

		this.dayInfo = this.props.data;

		this.state = {
			date: this.dayInfo.date,
			numtasks: this.dayInfo.numtasks,
			score: this.dayInfo.score,
			tasks: this.dayInfo.tasks
    	};
	}

	componentDidUpdate(){

	}


	handleNameChange(e){

	   this.setState({name: e.target.value});
	}

	handlePointsChange(e) {

	   this.setState({points: e.target.value});
	}
	handleDurationChange(e) {

	   this.setState({duration: e.target.value});
	}

	updateTaskList(id){

	    axios.get("http://localhost:5000/days/recurring")
        .then(res => {

	       	const dayToUpdate = {
				date: this.state.date,
				tasks: res.data[0].tasks.filter(el => el.backlog === false)
		    }

		    dayToUpdate.tasks = dayToUpdate.tasks.map(el => {
			    el.complete = false
			    return el
			})
	        return axios.post('http://localhost:5000/days/addRecurringTasks', dayToUpdate)
	    })
	    .then(res => 
	    	console.log(res.data)
	    )
        .catch(error => {
        	console.log(error);
        })

        setTimeout(function(){
		   window.location.reload(1);
		}, 100);

	}

	

  render() {
    return (
      <Navbar className="bg-dark navbar-form" >
      <button type="button" className="btn btn-primary " onClick={() => { this.updateTaskList() }}>Load Recurring Tasks</button>

	</Navbar>
    );
  }
}