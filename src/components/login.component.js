// login.component.js


import React, { Component } from 'react';
import axios from 'axios';
import icons from 'glyphicons';
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown';
import './../App.css';


export default class Login extends Component {
  constructor(props) {

  	super(props);
  }

  render() {
  	return(
  		<div>
  			<h3>Create New User</h3>
				<form>
					<div>
						<div className="form-group">
							<label>Username: </label>
							<input type="text" required name="username"/>
						</div>
						<div className="form-group">
							<label>Password: </label>
							<input type="password" required name="password"/>
						</div>
					</div>
					<div className="form-group">
						<input type="submit" value="Create User" className="btn btn-primary" />
					</div>
				</form>
  		</div>
  	);
  }
}