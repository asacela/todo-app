// list-view.component.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ObjectiveList from "./day-list.component";
import Modal from "./create-task-modal.component";
import icons from 'glyphicons';
import './../App.css';


export default class ListView extends Component {


	constructor(props) {
		super(props);

		this.state = {
         showModal: false
      	}
	}

	toggleModal = () => {
      this.setState({
         showModal: ! this.state.showModal
      })
    };

	render() {

   const { showModal } = this.state;

   return(

   	<div>	
            {
               showModal ? (
                  <Modal className="my-modal">
                     <h1>Heading</h1>
                     <p>Lorem ipsum </p>
                     <button 
                        className="modal-close"
                        onClick={this.toggleModal}
                     >X</button>
                  </Modal>
               ) : null
            }

   	<ObjectiveList/>
   	<div align="right">
			<button type="button" className="btn btn-outline-primary" onClick={this.toggleModal}> 
				{ icons.plus }
			</button>
	</div>
      
      </div>
   );
}
	



}