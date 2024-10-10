import { EnvironmentOutlined, ArrowRightOutlined,PhoneOutlined, MobileOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import './Footer.css'; 

const Footer = () => {

  return (
    <>
      <div className="footer-upper">
       
        <div className="footer-links">
          <h3 className="footer-title">LIEN UTILES</h3>
          <a href="/about">    <ArrowRightOutlined className="link-icon" /> A PROPOS</a>
          <a href="/news">     <ArrowRightOutlined className="link-icon" /> ACTUALITÉS </a>
          <a href="/events">   <ArrowRightOutlined className="link-icon" /> EVENEMENT </a>
          <a href="/athletes"> <ArrowRightOutlined className="link-icon" /> ATHLETE </a>
          <a href="/blog">     <ArrowRightOutlined className="link-icon" /> BLOG</a>
        </div>

       <div className="footer-social">
         <h3 className="footer-title">SOCIAL MEDIA</h3>
         <a href="https://www.facebook.com/startingclubnabeul" target="_blank" rel="noopener noreferrer">Facebook</a>
         <a href="https://instagram.com/193_fx" target="_blank" rel="noopener noreferrer">Instagram</a>
       </div>

      <div className="footer-contact">
        <h3 className="footer-title">NOUS CONTACTER</h3>
  
          <p>Pour toute information complémentaire, n'hésitez pas à nous contacter.</p>
         
          <p id='adresse'><EnvironmentOutlined className="contact-icon" /> 
          Centre Culturel de Nabeul
          Ave. Mohammed V, Nabeul 8000
            </p>
            <p> <PhoneOutlined className="contact-icon" /> 
            +216 70 169 690
            </p>
            <p> <MobileOutlined className="contact-icon" /> 
            +216 92 337 777
            </p>
            <p> <WhatsAppOutlined className="contact-icon" /> 
            +216 52 124 606
            </p>
            <p><MailOutlined className="contact-icon" /> 
            contact@starting.com </p>

      </div>

      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Starting Club Nabeul.</span> All rights reserved.
      </div>
    </>
  );
};

export default Footer;

