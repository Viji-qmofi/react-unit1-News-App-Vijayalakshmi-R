{/* Reusable Component -> Used in News and BookMarks Features */}
import React from 'react';
import './Modal.css';
import './NewsModal.css'

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">

      {/* 
      Prevents clicks inside the modal from closing it.
      The backdrop listens for clicks to close the modal, 
      so we stop the event here to avoid bubbling.
    */}
       <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* CLOSE BUTTON */}
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {/* Render anything passed inside the modal */}
        {children}
        
      </div>
    </div>
  );
};

export default Modal;
