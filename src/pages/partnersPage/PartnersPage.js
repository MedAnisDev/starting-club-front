import React from 'react';
import PartnerList from '../../components/partnerList/PartnerList';
import './PartnersPage.css';

function PartnersPage() {
  const partners = [
    { name: 'Partenaire 1', description: 'Description partenaire 1...', logo: '/images/partner1.jpg', link: 'https://partenaire1.com' },
    { name: 'Partenaire 2', description: 'Description partenaire 2...', logo: '/images/partner2.jpg', link: 'https://partenaire2.com' },
  ];

  return (
    <div className="partners-page">
      <h2>Nos Partenaires</h2>
      <PartnerList partners={partners} />
    </div>
  );
}

export default PartnersPage;
