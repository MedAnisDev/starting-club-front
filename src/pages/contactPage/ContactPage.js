import React from 'react';
import ContactForm from '../../components/contactForm/ContactForm';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <h2>Contactez-nous</h2>
      <ContactForm />
      <section className="contact-info">
        <h3>Informations de contact</h3>
        <p>Adresse : nabeul </p>
        <p>Téléphone : +216 66 666 666 </p>
        <p>Email : starting-club@gmail.com </p>
       
      </section>
    </div>
  );
}

export default ContactPage;
