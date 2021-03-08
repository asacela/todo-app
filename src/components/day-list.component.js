// day-list.component.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import icons from 'glyphicons';
import './../App.css';

const Task = props => (
  <tr>
    <td>{props.task.name}</td>
    <td>{props.task.points}</td>
    <td>{props.task.duration}</td>
    <td> 
      <div className="btn-group mr-1" role="group" aria-label="First group">
        <button type="button" className="btn btn-success" >complete</button>
        <button type="button" className="btn btn-warning">edit</button>
        <button type="button" className="btn btn-danger" onClick={() => { props.updateTask(props.task._id) }}>delete</button>
      </div>
    </td>
    <td>
      <button type="button" className="btn btn-outline-primary">Recurring</button>
    </td>
  </tr>
)


export default class ObjectiveList extends Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this)
    this.updateTask = this.updateTask.bind(this)
    this.date = new Date().toISOString().split("T")[0];
    this.state = {
      date: this.date,
      numtasks: 0,
      score: 0,
      tasks: [],
    };
  }

  componentDidMount(){
    axios.get("http://localhost:5000/days/")
      .then(response => {
        console.log(response.data);
        this.setState({
          date: response.data[0].date,
          numtasks: response.data[0].numtasks,
          score: response.data[0].score,
          tasks: response.data[0].tasks,
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteTask(id) {
    axios.delete('http://localhost:5000/days/'+id)
      .then(response => { console.log(response.data) });

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
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


  // componentDidMount(){
  //   axios.get("http://localhost:5000/days/specifiedDay", { 
  //     date: this.date 
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //     this.setState({
  //       date: response.data[0].date,
  //       numtasks: response.data[0].numtasks,
  //       score: response.data[0].score,
  //       tasks: response.data[0].tasks,
  //     });
  //   })
  //   .catch(error => {
  //     console.log(String(this.date));
  //     console.log(error);
  //   })
  // }

  getPrevDay() {

    // var prevDate = new Date(this.state.date);
    // prevDate.setDate(prevDate.getDate() - 1);
    // var prevDateString = prevDate.toISOString().split("T")[0];
    // this.date = prevDateString;
    // console.log(this.date)
    // this.setState({
    //       date: this.date,
    // });
    // window.location.reload();
  }

  getNextDay() {

    // var nextDate = new Date(this.state.date);
    // nextDate.setDate(nextDate.getDate() + 1);
    // var nextDateString = nextDate.toISOString().split("T")[0];
    // this.date = nextDateString;
    // console.log(this.date)
    // this.setState({
    //       date: this.date, 

    // }); 
    // window.location.reload();
  }

  objectivesList() {

    return this.state.tasks.map(currentTask => {
      return <Task task={currentTask} deleteTask={this.deleteTask} updateTask={this.updateTask} key={currentTask._id}/>;
    })
  }


  render() {

    var currentDate = new Date(this.state.date);
    currentDate.setDate(currentDate.getDate() + 1);
    return (
      <div>
        <div style={{display:"flex"}}>
          <button type="button" className="btn btn-circle btn-sm btn-outline-primary" onClick={() => { this.getPrevDay() }}> 
            { icons.arrowTriL }
          </button>&nbsp;&nbsp;
          <h3>{ currentDate.toString().substring(0,15) }</h3>&nbsp;&nbsp;
          <button type="button" className="btn btn-circle btn-sm btn-outline-primary" onClick={() => { this.getNextDay() }}> 
            { icons.arrowTriR }
          </button>
        </div> &nbsp;
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Task</th>
              <th>Points</th>
              <th>Duration (hrs)</th>
              <th>Action</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            { this.objectivesList() }
          </tbody>
        </table>
      </div>
    )
  }
}