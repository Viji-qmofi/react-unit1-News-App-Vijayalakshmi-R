import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './ContactUs.css';
import Footer from './Footer';
import Header from './Header';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef(null);
  const navigate = useNavigate();

  // Focus on the Name input when component mounts
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    if (nameRef.current) {
      nameRef.current.focus();
    }
  };

  if (submitted) {
    return (
      <div className="news-contact">
      <div className="contact-wrapper">
        <Header />
        <div className="contact-container">
          <h2 className="contact-title">Successfully Submitted!</h2>
          <p>Thank you for contacting us. You will hear from us in two business days.</p>
          <button
            className="home-btn"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
      </div>
    );
  }

  return (
    <main>
    <div className="main-content">
    <div className="news-contact">
    <div className="contact-wrapper">
      <Header />
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              ref={nameRef}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Message <span className="required">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
        
      </div>
     <Footer />
    </div>
  </div> 
  </div>
  </main>
    
  );
};

export default ContactUs;
