import React from 'react';
import '../App.css'; 

function AboutUsScreen() {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Welcome to our website!</p>
      </div>
      <div className="about-us-content">
        <div className="company-description">
          <h2>Who We Are</h2>
          <p>We are a team of passionate individuals dedicated to providing high-quality products and services. Our mission is to make a positive impact on the world by delivering innovative solutions.</p>
        </div>
        <div className="team-members">
          <h2>Our Team</h2>
          <div className="team-member">
            <img src="../../images/fathy.jpg" alt="Team Member 1" />
            <h3>Fathy Nassef</h3>
            <p>Software Engineer</p>
            <p>Team Leader</p>
          </div>
          <div className="team-member">
            <img src="../../images/elkmeshi.jpeg" alt="Team Member 2" />
            <h3>Mohamed Elkmeshi</h3>
            <p>Software Engineer</p>
          </div>
          <div className="team-member">
            <img src="../../images/hazem.jpeg" alt="Team Member 3" />
            <h3>Hazem Zakaria</h3>
            <p>Software Engineer</p>
          </div>
          <div className="team-member">
            <img src="../../images/ahmed.jpeg" alt="Team Member 3" />
            <h3>Ahmed Mohamed</h3>
            <p>Software Engineer</p>
          </div>
        </div>
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AboutUsScreen;
