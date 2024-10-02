import React from 'react';
import './PartnerList.css';

function PartnerList({ partners }) {
  return (
    <div className="partner-list">
      {partners.map((partner, index) => (
        <div key={index} className="partner-item">
          <img src={partner.logo} alt={partner.name} />
          <p>{partner.description}</p>
          <a href={partner.link}>En savoir plus</a>
        </div>
      ))}
    </div>
  );
}

export default PartnerList;
