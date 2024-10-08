import React from 'react';
import './homeFooter.css';  // Import the CSS file

const HomeFooter = () => {
  return (
    <footer className="footer-container">
      {/* Footer Links */}
      <div className="footer-links">
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>

      {/* Social Media Links */}
      <div className="footer-social">
        <a href="https://www.facebook.com/startingclubnabeul" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://instagram.com/193_fx" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
      
      {/* Map Location */}
      <div className="footer-map">
        <h4>Our Location</h4>
        <iframe
          title="Club Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.8422047381055!2d10.74864057642207!3d36.44791767866359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130293f930ca4259%3A0x9f1090f84249a8ad!2sClub%20d&#39;Athl%C3%A9tisme%20Nabeul!5e0!3m2!1sen!2stn!4v1691500101062!5m2!1sen!2stn"
          className="map-iframe"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      
      {/* Footer Text */}
      <div className="footer-text">
        <span>© {new Date().getFullYear()} Starting Club Nabeul.</span> All rights reserved.
      </div>
    </footer>
  );
};

export default HomeFooter;
