import React from 'react';
import "./Contact.css";

function Contact() {
  return (
    <div className='contact-container'>
       <div className="contact-section">
       <div className="contact-img">
            <img src="https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1119&q=80" alt="contact-form" />
        </div>
        <div className="contact-form">
          <h1>Contact Me</h1>          
          <div className='first-line'>
            <div className="name">
              <label>Name:</label>
              <input type="text" placeholder='Name'/>
            </div>
            <div className="email">
              <label>Email:</label>
              <input type="email" placeholder='Email'/>
            </div>
          </div>

          <div className='message'>
            <label>Message:</label>
            <textarea cols="30" rows="10" placeholder='Your Message...'></textarea>
          </div>
          <button>Send Message</button>
        </div>
       </div>
    </div>
  )
}

export default Contact