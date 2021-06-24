// day-list.component.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import icons from 'glyphicons';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'
import NavbarForm from "./navbar-form.component";
import NavbarTools from "./navbar-tools.component";
import './../App.css';
import './../SuperResponsiveTableStyle.css';

const Task = props => (
  <Tr>
    <Td>{props.task.name} &nbsp; 
    {
    !props.task.backlog && 
    <Badge pill variant="danger">  Streak: {props.task.streak} </Badge>
    }
    </Td>
    <Td>{props.task.points}</Td>
    <Td>{props.task.duration} min</Td>
    <Td> 
      <div className="btn-group mr-1 flex-wrap" role="group" aria-label="First group">
        <button type="button" className="btn btn-success" onClick={() => {props.completeTask(props.task._id)}}>complete</button>
        <button type="button" className="btn btn-warning">edit</button>
        <button type="button" className="btn btn-danger" onClick={() => { props.updateTask(props.task._id) }}>delete</button>
      </div>
    </Td>
    <Td>
      {
        props.task.backlog ? (<button type="button" className="btn btn-outline-danger" onClick={() => { props.toggleTypeBtn(props.task._id) }}>Backlog</button>) 
        : 
        (<button type="button" className="btn btn-outline-primary" onClick={() => { props.toggleTypeBtn(props.task._id) }}>Recurring</button>)
      }
    </Td>
  </Tr>
)


export default class ObjectiveList extends Component {
  constructor(props) {
    super(props);
    this.updateTask = this.updateTask.bind(this)
    // this.deleteTask = this.deleteTask.bind(this) // test before adding bruh
    this.completeTask = this.completeTask.bind(this)
    this.getPrevDay = this.getPrevDay.bind(this)
    this.getNextDay = this.getNextDay.bind(this)
    this.toggleTypeBtn = this.toggleTypeBtn.bind(this)

    var my_date = new Date();
    var utcDate = new Date(my_date.toUTCString());
    utcDate.setHours(utcDate.getHours()-8);
    this.date = new Date(utcDate).toISOString().split("T")[0];
    this.state = {
      date: this.date,
      numtasks: 0,
      score: 0,
      tasks: []
    };
  }

  componentDidMount(){

    const day = {
      date: this.state.date,
      numtasks: this.state.numtasks,
      score: this.state.score,
      tasks: this.state.tasks
    }

    axios.get("http://localhost:5000/days/", day)
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

  completeTask(id){


    let tasks = this.state.tasks
    tasks.filter(el => el._id === id)[0].complete = true;
    tasks.filter(el => el._id === id)[0].streak += 1;
    console.log(tasks);

    this.state.score = this.state.score + Number(tasks.filter(el => el._id === id)[0].points)

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

  // getTotalScore(total) {

  //     return total ? (this.state.tasks.reduce((a, b) => a + (b['score'] || 0), 0)) : (this.state.tasks.filter(el => el.complete === false).reduce((a, b) => a + (b['score'] || 0), 0) ) 
  // }


  getPrevDay() {

    // var prevDate = new Date(this.state.date);
    // prevDate.setDate(prevDate.getDate() - 1);
    // var prevDateString = prevDate.toISOString().split("T")[0];
    // this.date = prevDateString;
    // console.log(this.date)
    // this.setState({
    //       date: this.date
    // });
    // window.location = '/';
  }

  getNextDay() {

    // var nextDate = new Date(this.state.date);
    // nextDate.setDate(nextDate.getDate() + 1);
    // var nextDateString = nextDate.toISOString().split("T")[0];
    // this.date = nextDateString;
    // console.log(this.date)
    // this.setState({
    //       date: this.date 

    // }); 
    // window.location = '/';
  }

  toggleTypeBtn(id){

    let tasks = this.state.tasks
    tasks.filter(el => el._id === id)[0].backlog = !(tasks.filter(el => el._id === id)[0].backlog);
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

  objectivesList() {

    return this.state.tasks.filter(el => el.complete === false).map(currentTask => {
      return <Task task={currentTask} deleteTask={this.deleteTask} updateTask={this.updateTask} completeTask={this.completeTask}  getPrevDay={this.getPrevDay} getNextDay={this.getNextDay} toggleTypeBtn={this.toggleTypeBtn} key={currentTask._id}/>;
    })
  }


  render() {

    var currentDate = new Date(this.state.date);
    currentDate.setDate(currentDate.getDate() + 1);
    return (
      <div>
        <div className="date-header">
          <button type="button" className="btn btn-circle btn-sm btn-outline-primary" onClick={() => { this.getPrevDay() }}> 
            { icons.arrowTriL }
          </button>&nbsp;&nbsp;
          <Alert variant="primary">
          <Alert.Heading align="center">
          <h2>
            <Badge pill variant="light">{ currentDate.toString().substring(0,15) }</Badge>
          </h2>
          </Alert.Heading>
          <hr />
          <div >
            <Badge pill variant="danger">  
            { Number(this.state.tasks.filter(el => el.complete === false).length) } <br/> incomplete tasks
            </Badge>&nbsp;
            <Badge pill variant="success">  
            { Number(this.state.tasks.filter(el => el.complete === true).length) } <br/> complete tasks
            </Badge>&nbsp;
            <Badge pill variant="primary"> 
            { Number(this.state.score) }  <br/>  current daily score 
            </Badge>
          </div>
          </Alert>
          &nbsp;&nbsp;
          <button type="button" className="btn btn-circle btn-sm btn-outline-primary" onClick={() => { this.getNextDay() }}> 
            { icons.arrowTriR }
          </button>
        </div> &nbsp;
        <NavbarTools data={this.state} />
        <NavbarForm data={this.state} />
        <Table className="backlog-table table">
          <Thead className="">
            <Tr>
              <Th>Task</Th>
              <Th>Points</Th>
              <Th>Duration</Th>
              <Th>Action</Th>
              <Th>Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            { this.objectivesList() }
          </Tbody>
        </Table>
      </div>
    )
  }
}