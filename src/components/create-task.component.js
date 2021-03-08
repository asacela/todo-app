// create-task.component.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import icons from 'glyphicons';
import './../App.css';


export default class CreateTask extends Component {



	constructor(props) {
    super(props);

    this.state = { open: false };
    this.openModal = () => this.setState({ open: true });
  	this.closeModal = () => this.setState({ open: false });



    this.day = {
      date: this.date,
      numtasks: 0,
      score: 0,
      tasks: [],
    };
	}




	render(){

		

		return(

			<div>
			<div align="right">
				<button type="button" className="btn btn-outline-primary" onClick={this.openModal}> 
				{ icons.plus }
				</button>
			  </div>
			  <Modal show={this.state.open} onHide={this.closeModal} animation={false}>
			    <Modal.Header closeButton>
			      <Modal.Title>Modal heading</Modal.Title>
			    </Modal.Header>
			    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
			    <Modal.Footer>
			      <button variant="secondary" onClick={this.closeModal}>
			        Close
			      </button>
			      <button variant="primary" onClick={this.closeModal}>
			        Save Changes
			      </button>
			    </Modal.Footer>
			  </Modal>
			  </div>
		)
	}
}
