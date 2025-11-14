import React from 'react'
import './NewsModal.css'
import demoImg from '../assets/images/demo.jpg'

const NewsModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
            <span className="close-button">
                  <i className="fa-solid fa-xmark"></i>
            </span>
            <img src={demoImg} alt="Modal Image" className="modal-image" />
            <h2 className="modal-title">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quos.
            </h2>
            <p className="modal-source">Source: The Gaurdian</p>
            <p className="modal-date">Nov 15, 2025, 04.15pm</p>
            <p className="modal-content-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut harum quidem exercitationem eligendi nihil, dolore amet nobis! Dolor quia minus consectetur provident dolorem vero magnam ipsa adipisci, quasi doloremque iusto laborum perspiciatis aspernatur debitis voluptas.
            </p>
            <a href="#" className="read-more-link">Read More</a> 
      </div>
    </div>
  )
}

export default NewsModal