// backlog.component.js

import React, { Component } from 'react';
import axios from 'axios';
import icons from 'glyphicons';
import Table from 'react-bootstrap/Table'
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import './../App.css';


const Task = props => (
  <tr>
    <td>{props.task.name}</td>
    <td>{props.task.points}</td>
    <td>{props.task.duration} min</td>
    <td> 
      <div className="btn-group mr-1" role="group" aria-label="First group">
        <button type="button" className="btn btn-success">complete</button>
        <button type="button" className="btn btn-danger" onClick={() => { props.deleteTask(props.task._id) }}>delete</button>
      </div>
    </td>
  </tr>
)


export default class BacklogList extends Component {
  constructor(props) {

  	super(props);
  	this.deleteTask = this.deleteTask.bind(this)
  	this.completeTask = this.completeTask.bind(this)
  	this.state = {
      tasks: []
    };
  }

  componentDidMount(){

  	var allTasks = [];

  	axios.get("http://localhost:5000/backlog/")
      .then(response => {
        
        allTasks = response.data;
        // console.log(allTasks);

        var backlogTasks = [];

		for (var i = 0; i < allTasks.length; i++) {
			// console.log(allTasks[i]);
			for(var j = 0; j < allTasks[i].tasks.length; j++){

				if(allTasks[i].tasks[j].backlog === true && allTasks[i].tasks[j].complete === false){
					backlogTasks.push(allTasks[i].tasks[j]);
				}
			}
		}

		console.log("Backlog Tasks...")
		console.log(backlogTasks)

		this.setState({
			tasks: backlogTasks
		})
      })
      .catch(error => {
        console.log(error);
      })



  }

  deleteTask(id){

  	axios.delete('http://localhost:5000/backlog/'+id)
      .then(response => { console.log(response.data) });

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    })

    window.location = '/backlog';

  }

  completeTask(){

  }

  backlogList() {

    return this.state.tasks.map(currentTask => {
      return <Task task={currentTask} deleteTask={this.deleteTask} key={currentTask._id}/>;
    })
  }

  render() {

  	return(

  		<div>
  		<Table hover variant="dark" className="table list-table">
          <thead className="">
            <tr>
              <th>Task</th>
              <th>Points</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.backlogList() }
          </tbody>
        </Table>
      </div>


  	);
  }
}