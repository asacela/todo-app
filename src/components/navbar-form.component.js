// navbar-form.component.js

import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import icons from 'glyphicons';
import axios from 'axios';

export default class NavbarForm extends Component {


	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePointsChange = this.handlePointsChange.bind(this);
		this.handleDurationChange = this.handleDurationChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

		this.dayInfo = this.props.data;

		this.state = {

			name: "",
			points: 0,
			duration: 0,
			complete: false,
			backlog: false
		}
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

	onFormSubmit(e){

		e.preventDefault();

		const date = String(this.dayInfo.date);

		console.log("DayId Date: " + date);
		console.log("Task: " + this.state.name);
		console.log("Points: " + this.state.points);
		console.log("Duration: " + this.state.duration);
		

    	const task = {
    		name: this.state.name,
    		points: this.state.points,
    		duration: Number(this.state.duration),
    		complete: Number(this.state.complete),
    		backlog: true
    	}

    	const data = {

    		date: date,
    		tasks: task
    	}

	    axios.post('http://localhost:5000/days/addTask', data)
	    .then(res => console.log(res.data))
	    .catch(error => {
        	console.log(error);
      	});

	    window.location = '/';
	}

	

  render() {
    return (
      <Navbar className="bg-light navbar-form" >
       
	  <Form inline name="form-add-task" onSubmit={ this.onFormSubmit }>
	  <Dropdown>
		  <Dropdown.Toggle variant="primary" id="dropdown-basic">
		    Shortcuts
		  </Dropdown.Toggle>

		  <Dropdown.Menu>
		    <Dropdown.Item href="#/action-1">Work</Dropdown.Item>
		    <Dropdown.Item href="#/action-2">Exercise</Dropdown.Item>
		    <Dropdown.Item href="#/action-3">Miscellaneous</Dropdown.Item>
		    <Dropdown.Divider />
        	<Dropdown.Item eventKey="4">{icons.plus} Add Shortcut</Dropdown.Item>
		  </Dropdown.Menu>
		</Dropdown>&nbsp;
	    <InputGroup>

	      
	      <FormControl
	        placeholder="Task"
	        aria-label="Task"
	        aria-describedby="basic-addon1"
	        className="form-navbar-children"
	        name="name"
	        value={this.state.name}
	        onChange={this.handleNameChange}
	      />&nbsp;
	      <FormControl
	        placeholder="Points"
	        aria-label="Points"
	        aria-describedby="basic-addon2"
	        className="form-navbar-children"
	        name="points"
	        onChange={this.handlePointsChange}
	      />&nbsp;
	      <FormControl
	        placeholder="Duration (min)"
	        aria-label="Duration"
	        aria-describedby="basic-addon3"
	        className="form-navbar-children"
	        name="duration"
	        onChange={this.handleDurationChange}
	      />&nbsp;
	    <Button type="button" variant="outline-primary" onClick={this.onFormSubmit}>{icons.plus} Add Task</Button>
	    </InputGroup>
	  </Form>
	</Navbar>
    );
  }
}