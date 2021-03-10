import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';

import Navbar from "./components/navbar.component"
import ListView from "./components/list-view.component";



function App() {
	useEffect(() => axios.post("http://localhost:5000/days/add")
      .then(response => { console.log(response.data); })
      .catch(error => {
        console.log(error);
      }),[]);
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
