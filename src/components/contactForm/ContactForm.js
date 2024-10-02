import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer le formulaire ici
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Nom</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Sujet</label>
      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />

      <label>Message</label>
      <textarea name="message" value={formData.message} onChange={handleChange} required />

      <button type="submit">Envoyer</button>
    </form>
  );
}

export default ContactForm;
