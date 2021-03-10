// list-view.component.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ObjectiveList from "./day-list.component";
import Modal from "./completed-modal.component";
import axios from 'axios';
import icons from 'glyphicons';
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import './../App.css';


const CompletedTask = props => (
  <tr>
    <td>{props.task.name}</td>
    <td>{props.task.points}</td>
    <td>{props.task.duration * 60} min</td>
    <td> 
      <div className="btn-group mr-1" role="group" aria-label="First group">
        <button type="button" className="btn btn-success" onClick={() => {props.completeTask(props.task._id)}}>complete</button>
        <button type="button" className="btn btn-warning">edit</button>
        <button type="button" className="btn btn-danger" onClick={() => { props.updateTask(props.task._id) }}>delete</button>
      </div>
    </td>
    <td>
      <button type="button" className="btn btn-outline-primary">Recurring</button>
    </td>
  </tr>
)


export default class ListView extends Component {


	constructor(props) {
		super(props);

      this.updateTask = this.updateTask.bind(this)
      this.completeTask = this.completeTask.bind(this)

		this.state = {
         showModal: false,
         date: "",
         numtasks: 0,
         score: 0,
         tasks: []
      }
	}

	toggleModal = () => {
      this.setState({
         showModal: ! this.state.showModal
      })
    };

   componentDidMount(){
    axios.get("http://localhost:5000/days/")
      .then(response => {
        console.log(response.data);
        this.setState({
          date: response.data[0].date,
          numtasks: response.data[0].tasks.length,
          score: response.data[0].score,
          tasks: response.data[0].tasks,
        });
      })
      .catch(error => {
        console.log(error);
      })
   }

   updateTask(id) {

      const day = {
         date: this.state.date,
         numtasks: this.state.numtasks,
         score: this.state.score,
         tasks: this.state.tasks.filter(el => el._id !== id)
      }

      axios.post('http://localhost:5000/days/update', day)
      .then(res => console.log(res.data));

      window.location = '/';
  }

   completeTask(id){


      let tasks = this.state.tasks
      tasks.filter(el => el._id === id)[0].complete = true;
      console.log(tasks);

      const day = {
         date: this.state.date,
         numtasks: this.state.numtasks,
         score: this.state.score,
         tasks: this.state.tasks
      }

      axios.post('http://localhost:5000/days/update', day)
      .then(res => console.log(res.data));

      window.location = '/';

   }

   completedList() {

    return this.state.tasks.filter(el => el.complete === true).map(currentTask => {
      return <CompletedTask task={currentTask} updateTask={this.updateTask} completeTask={this.completeTask}key={currentTask._id}/>;
    })
   }


	render() {

   const { showModal } = this.state;

   return(

   	<div>	
            {
               showModal ? (
                  <Modal className="my-modal">
                     <div align="center">
                        <h2>
                           <Badge pill variant="success"> Completed Tasks </Badge>
                        </h2>
                     </div>
                     <Table striped bordered hover variant="light" className="table list-table">
                         <thead className="">
                           <tr>
                             <th>Task</th>
                             <th>Points</th>
                             <th>Duration</th>
                             <th>Action</th>
                             <th>Type</th>
                           </tr>
                         </thead>
                         <tbody>
                           { this.completedList() }
                         </tbody>
                       </Table>
                     <button 
                        className="modal-close"
                        onClick={this.toggleModal}
                     >{icons.crossHeavy}</button>
                  </Modal>
               ) : null
            }

   	<ObjectiveList/>
   	<div align="right">
			<button type="button" className="btn btn-outline-success" onClick={this.toggleModal}> 
				Completed Tasks
			</button>
	</div>
      
      </div>
   );
}
	



}