import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './ContactUs.css';
import InputErrorMessage from './InputErrorMessage';
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

let errorMessages = {
    firstNameRequired: 'First name is required.',
    lastNameRequired: 'Last name is required.',
    emailRequired: 'Email is required.',
    numberOfGuestsRequired: 'At least 1 guest required.',
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
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const isValid = () => {
        return data.firstName && data.lastName && data.email && data.numberOfGuests;
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            id="name"
            label="Name"
            value={formData.name}
            handleChange={handleChange}
            ref={nameRef}
            required
          />
           <InputErrorMessage
                  hasError={hasErrors && formData.name === ''}
                  msg={errorMessages['Name Required']}
            />
        </div>
        <div className="form-group">
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            handleChange={handleChange}
            required
          />
           <InputErrorMessage
                  hasError={hasErrors && formData.email === ''}
                  msg={errorMessages['Email Required']}
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
        <InputErrorMessage
                  hasError={hasErrors && formData.topic === ''}
                  msg={errorMessages['Select a topic']}
            />
        </div>

        <div className="form-group">
          <Textarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        />
          <InputErrorMessage
                  hasError={hasErrors && formData.message === ''}
                  msg={errorMessages['Message Required']}
            />
        </div>
        <div className="button-group">
            <Button
                    id="Submit"
                    type="submit"
                    label="Submit"
                    className="submit-btn"
                    handleClick={handleSubmit}
            />
            <Button
                    id='reset'
                    type="button"
                    label="Reset"
                    className="reset-btn"
                    handleClick={handleReset}
                />
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

    </div>


  );
};

export default ContactUs;
