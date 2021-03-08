// create-task-modal.component.js

// Modal.js
import React from 'react';
import { createPortal } from 'react-dom';

// We get hold of the div with the id modal that we have created in index.html
const modalRoot = document.getElementById( 'modal' );

class Modal extends React.Component {
   constructor( props ) {
   super( props );
  // We create an element div for this modal
    this.element = document.createElement( 'div' );
   }
  // We append the created div to the div#modal
   componentDidMount() {
      modalRoot.appendChild( this.element );
   }
  /**
    * We remove the created div when this Modal Component is unmounted
    * Used to clean up the memory to avoid memory leak 
    */
   componentWillUnmount() {
      modalRoot.removeChild( this.element );
   }
render() {
      return createPortal( <div
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            padding: 20,
            background: '#fff',
            borderRadius: '2px',
            display: 'inline-block',
            minHeight: '300px',
            margin: '1rem',
            position: 'relative',
            minWidth: '300px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            justifySelf: 'center',
          }}
        > {this.props.children}</div>
      </div>, this.element );
   }
}
export default Modal;