import React from 'react';
import { useSelector } from 'react-redux';
import './Footer.css';  // Import the CSS file
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const homeLocation = "/home"
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
      {location.pathname ===homeLocation && (
        <div className="footer-map">
        <h1>Our Location</h1>
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d757.3705232488572!2d10.728811776114505!3d36.44245362228112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130298c3d2d18eff%3A0xe4f1637654927b4c!2sCentre%20Culturel%20de%20Nabeul!5e0!3m2!1sfr!2stn!4v1728424680238!5m2!1sfr!2stn" 
        width="600" 
        height="450" 
        allowfullscreen="" 
        loading="lazy"
         referrerpolicy="no-referrer-when-downgrade"
         ></iframe>
      </div>
      )}
      <div className="footer-text">
        <span>© {new Date().getFullYear()} Starting Club Nabeul.</span> All rights reserved.
      </div>
    </>
  );
};

export default Footer;

