import React, { useEffect , useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';

import Navbar from "./components/navbar.component"
import ListView from "./components/list-view.component";



function App() {

  // use this to update date and tasks array
  const [tasks, setTasks] = useState(0);
	useEffect(() => 

      axios.post("http://localhost:5000/days/add")
      .then(response => { console.log(response.data); })
      .catch(error => { console.log(error); }),


      // Get the recurring tasks from the previous day,
      // then add them to the current day

      // change day to Previous Day Info...

      // axios.get("http://localhost:5000/days/recurring")
      // .then(response => {
      //   console.log(response.data);
      //   setTasks((tasks) => response.data[0].tasks);
        
      // })
      // .catch(error => { console.log(error); })
      // ,

      // axios.post("http://localhost:5000/days/addTask", useState(0).filter(el => el.backlog === false))
      // .then(response => {
      //   console.log(response.data);
      //   setTasks((tasks) => response.data[0].tasks);
        
      // })
      // .catch(error => { console.log(error); })

      // ,



      []);
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ListView} />
      </div>
    </Router>
  );
}

export default App;
