import React from 'react';
import './MembershipPage.css';

function MembershipPage() {
  return (
    <div className="membership-page">
      <h2>Adhésion</h2>
      <section>
        <h3>Pourquoi rejoindre notre club ?</h3>
        <p>Avantages de devenir membre...</p>
      </section>
      <section>
        <h3>Types d'adhésion</h3>
        <p>Tarifs et détails des différents types de membres...</p>
      </section>
      <section>
        <h3>Formulaire d'inscription</h3>
        <form>
          <label>Nom</label>
          <input type="text" required />

          <label>Email</label>
          <input type="email" required />

          <label>Type d'adhésion</label>
          <select required>
            <option value="performance">Sport de Performance</option>
            <option value="sante">Sport Santé</option>
            <option value="handisport">Handisport</option>
          </select>

          <label>Documents</label>
          <input type="file" required />

          <button type="submit">S'inscrire</button>
        </form>
      </section>
    </div>
  );
}

export default MembershipPage;
