import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './ContactUs.css';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import Textarea from './TextArea';

const dropdownOptions = [
  "General Inquiry",
  "Report a Bug",
  "Feature Request",
  "Feedback",
  "Other"
];

let initialData = {
  name: '',
  email: '',
  topic: "",
  message: ''
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    ...initialData
  });
  const [hasErrors, setHasErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef(null);
  const navigate = useNavigate();

  // Focus on the Name input when component mounts
 useEffect(() => {
    
      nameRef.current.focus();
    
  }, []);

  const isValid = () => {
    return (
      formData.name && formData.email && formData.topic && formData.message
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) {
      setHasErrors(true);
      
    } else {
    // Eventually: submit data to back end to save to database
    setSubmitted(true);
    }

    console.log('Form submitted:', formData);

  };

  const handleReset = () => {
    setFormData({ ...initialData });
    setHasErrors(false);
    if (nameRef.current) {
      nameRef.current.focus();
    }
  };

  if (submitted) {
    return (
      <div className="contact-container">
        <h2 className="contact-title">Successfully Submitted!</h2>
        <p>Thank you for contacting us. You will hear from us in two business days.</p>
        
        <Button
            label="Back to Home"
            className="home-btn"
            handleClick={() => navigate('/')}
        />
      </div>
    );
  }

  return (

    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtext">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            id="id"
            name="name"
            label="Name"
            type="text"
            placeholder='Enter Name'
            value={formData.name}
            handleChange={handleChange}
            ref={nameRef}
            required
          />
        </div>

        <div className="form-group">
          <Input
            id="email"
            name="email"
            placeholder='Enter Email'
            label="Email"
            type="email"
            value={formData.email}
            handleChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <Select
            label="Topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            options={dropdownOptions}
            required
          />
        </div>

        <div className="form-group">
          <Textarea
            label="Message"
            name="message"
            placeholder='Enter Message'
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="button-group">
          <Button
            id="Submit"
            type="submit"
            label="Submit"
            className="submit-btn"
          />
          <Button
            id='reset'
            type="button"
            label="Reset"
            className="reset-btn"
            handleClick={handleReset}
          />
        </div>

      </form>
    </div>


  );
};

export default ContactUs;
