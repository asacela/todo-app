import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';
import Navbar from "./components/navbar.component"
import ListView from "./components/list-view.component";
import BacklogList from "./components/backlog.component";
import Analytics from "./components/analytics.component";


/*

  TODO:
  - finish dropdown menu so that it populates form, and add shortcut adding ability
  - implement system that takes backlog tasks from previous days and populate backlog page
  - make the analytics page with graphs displaying progress
  - implement reward system on the analytics/profile page
  - make it possible to traverse days
  - make a user and login schema and implementation
  - fix all schemas by implementing a overarching calendar schema for each user with each day existing as subdocument
  - change tasks list UI into something nicer than basic table, possibly Toasts 
  - make overall UI nicer
  - make each task editable
  - build secure login page for users with proper authentication
  - turn the website into an iOS app using React Native
  - make web app into distributable application
  - host the website onto github pages
*/



function App() {

  // use this to update date and tasks array
	useEffect(() => 
      axios.post("http://localhost:5000/days/add")
      .then(response => { console.log(response.data); })
      .catch(error => { console.log(error); }), []);
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ListView} />
      <Route path="/backlog" exact component={BacklogList} />
      <Route path="/analytics" exact component={Analytics} />
      </div>
    </Router>
  );
}

export default App;
