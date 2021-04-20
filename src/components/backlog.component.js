// backlog.component.js

import React, { Component } from 'react';
import axios from 'axios';
import icons from 'glyphicons';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import './../App.css';
import './../SuperResponsiveTableStyle.css';


const Task = props => (
  <Tr>
    <Td>{props.task.name}</Td>
    <Td>{props.task.points}</Td>
    <Td>{props.task.duration} min</Td>
    <Td> 

      <button type="button" className="btn btn-primary" onClick={ () => {props.moveToCurrent(props.task._id)}}>move to today</button>&nbsp;
      <button type="button" className="btn btn-danger" onClick={() => { props.deleteTask(props.task._id) }}>delete</button>
    </Td>
  </Tr>
)

/*
  Implemented Backlog Buttons, but need to show the dates for each task...
  To do this,  need to save more than just the parent_id,
  we should save parent id and date,
  should be really easy if use another array for parentDates and index 
  the same way as parentId

  I dont wanna do it atm since im lazy and i just implemented moveToCurrent

*/

export default class BacklogList extends Component {

  constructor(props) {

  	super(props);
  	this.deleteTask = this.deleteTask.bind(this)
  	this.moveToCurrent = this.moveToCurrent.bind(this)
  	this.state = {
      tasks: [],
      parentIds: []
    };
  }

  componentDidMount(){

  	var allTasks = [];

  	axios.get("http://localhost:5000/backlog/")
      .then(response => {
        
        allTasks = response.data;
        console.log(allTasks);

        var backlogTasks = [];
        var parentIds = [];

  		for (var i = 0; i < allTasks.length; i++) {
  			// console.log(allTasks[i]);
  			for(var j = 0; j < allTasks[i].tasks.length; j++){

  				if(allTasks[i].tasks[j].backlog === true && allTasks[i].tasks[j].complete === false){
  					backlogTasks.push(allTasks[i].tasks[j]);
            parentIds.push(allTasks[i]._id);

  				}
  			}
  		}

		console.log("Backlog Tasks...")
		// console.log(backlogTasks)

		this.setState({
			tasks: backlogTasks,
      parentIds: parentIds
		})
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteTask(id){

    var specifiedTask_idx = -1;
    this.state.tasks.forEach(function(x, index) {
        if (x._id === id) {
            specifiedTask_idx = index;
        }
      }
    );
    console.log(specifiedTask_idx);
    var parentId = this.state.parentIds[specifiedTask_idx];

    axios.delete('http://localhost:5000/backlog/delete/' + parentId + '/' +id)
      .then(response => { console.log(response.data) });

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id),
      parentIds: this.state.parentIds.splice(specifiedTask_idx, 1)
    })

    // window.location = '/backlog';
  }

  moveToCurrent(id){

    var specifiedTask_idx = -1;
    this.state.tasks.forEach(function(x, index) {
        if (x._id === id) {
            specifiedTask_idx = index;
        }
      }
    );
    console.log(specifiedTask_idx);
    var parentId = this.state.parentIds[specifiedTask_idx];

    var date = new Date();
    var utcDate = new Date(date.toUTCString());
    utcDate.setHours(utcDate.getHours()-8);
    const today = new Date(utcDate);


    const data = {

      date: String(today.toISOString().split("T")[0]),
      tasks: this.state.tasks[specifiedTask_idx]
    }
    console.log(data)


    
    axios.post('http://localhost:5000/days/addTask', data)
      .then(response => { 
        console.log(response.data);



        return axios.delete('http://localhost:5000/backlog/delete/' + parentId + '/' +id)
      })
      .then(res => 
        console.log(res.data)
      )
      .catch(error => {
        console.log(error);
      });

      // setTimeout(function(){
      //  window.location.reload(1);
      // },500);
      // this.setState({
      //   tasks: this.state.tasks.filter(el => el._id !== id),
      //   parentIds: this.state.parentIds.splice(specifiedTask_idx, 1)
      // })

  }

  backlogList() {

    return this.state.tasks.map(currentTask => {
      return <Task task={currentTask} deleteTask={this.deleteTask} moveToCurrent={this.moveToCurrent} key={currentTask._id}/>;
    })
  }

  render() {

  	return(

  		<div>
  		  <Table className="backlog-table table">
          <Thead>
            <Tr>
              <Th>Task</Th>
              <Th>Points</Th>
              <Th>Duration</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            { this.backlogList() }
          </Tbody>
        </Table>
      </div>


  	);
  }
}