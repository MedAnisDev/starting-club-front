import React from 'react';
import './Footer.css';  // Import the CSS file

const Footer = () => {
  return (
    <>
      <div className="footer-links">
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
      
      <div className="footer-social">
        <a href="https://www.facebook.com/startingclubnabeul" target="_blank" rel="noopener noreferrer">
        Facebook
        </a>

        <a href="https://instagram.com/193_fx" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>

      </div>
      
      <div className="footer-text">
        <span>© {new Date().getFullYear()} Your Company Name.</span> All rights reserved.
      </div>
    </>
  );
};

export default Footer;

