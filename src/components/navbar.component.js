import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Todo App</Link>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/backlog" className="nav-link">Backlog</Link>
          </li>
          <li className="navbar-item">
          <Link to="/analytics" className="nav-link">Analytics</Link>
          </li>
        </ul>
        <div className="navbar-usertools">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Dropdown >
              <Dropdown.Toggle variant="dark">My Account</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item><Link to="/user">User Profile</Link></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item><Link to="/login">Login</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        </div>
        </div>
        
      </nav>
    );
  }
}