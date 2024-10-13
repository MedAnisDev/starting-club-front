import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { affiche, Starting, run, course, delice, mosaique, safia } from "../../assets/index";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Card, Col, Row } from 'antd';  // Import Ant Design components

import { Footer } from '../../components/index.js';
function HomePage() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clubImages = [
    { src: run, alt: 'Club Event 1' },
    { src: affiche, alt: 'Club Event 2' },
    { src: course, alt: 'Club Event 3' },
  ];

  const partners = [
    { src: delice, alt: 'Partner 1' },
    { src: mosaique, alt: 'Partner 2' },
    { src: safia, alt: 'Partner 3' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
  };

  return (
    <>
    <div className={`home-page ${scrolling ? 'scroll-blur blur' : 'scroll-blur'}`}>
      {/* Club Logo */}
      <div className="club-logo">
        <img src={Starting} alt="Club Logo" className="logo-hover" />
      </div>

      {/* Animated Description */}
      <section className="club-description">
        <h2>Bienvenue au Club d'Athlétisme de Nabeul</h2>
        <p className="animated-description">
          Le Starting Club de Nabeul, fondé en 2017, est un club d'athlétisme dynamique. Nous avons pour mission de promouvoir l'excellence sportive et d'encourager une communauté passionnée de sport. Avec plus de 380 membres, nous formons des champions pour l'avenir tout en favorisant l'inclusion sociale à travers l'athlétisme.
        </p>
      </section>

      {/* Club Image Carousel */}
      <section className="club-carousel">
        <h2 className='title'>Nos Événements</h2>
        <Slider {...settings}>
          {clubImages.map((image, index) => (
            <div key={index}>
              <img src={image.src} alt={image.alt} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </section>

      {/* Upgraded Quick Overview Section with Ant Design */}
      <section className="quick-overview">
        <h2 className='title'>Aperçu Rapide</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card title="Dernières Nouvelles" bordered={false}>
              <ul>
                <li>Championnat Régional: 10 septembre 2024</li>
                <li>Nouvelle saison d'entraînement: Inscriptions ouvertes</li>
                <li>Résultats des compétitions nationales</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card title="Événements À Venir" bordered={false}>
              <ul>
                <li>Course sur route - 15 octobre 2024</li>
                <li>Compétition junior - 25 octobre 2024</li>
                <li>Marathon de Nabeul - 5 novembre 2024</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card title="Messages Importants" bordered={false}>
              <ul>
                <li>Réunion du conseil: 1er septembre 2024</li>
                <li>Rappel: Respect des mesures sanitaires</li>
                <li>Nouvelle charte du club publiée</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </section>
      <div className="map-container">
        <h3 className='title'>Notre Location</h3>
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d757.3705232488572!2d10.728811776114505!3d36.44245362228112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130298c3d2d18eff%3A0xe4f1637654927b4c!2sCentre%20Culturel%20de%20Nabeul!5e0!3m2!1sfr!2stn!4v1728424680238!5m2!1sfr!2stn" 
        width="600" 
        height="450" 
        allowfullscreen="" 
        loading='lazy'
         referrerpolicy="no-referrer-when-downgrade"
         ></iframe>
      </div>

      {/* Partners Section */}
      <section className="partners-section">
        <h2 className='title'>Nos Partenaires</h2>
        <div className="partners-logos">
          {partners.map((partner, index) => (
            <img key={index} src={partner.src} alt={partner.alt} className="partner-logo" />
          ))}
        </div>
      </section>
    </div>
     <div className='footer'>
      <Footer/>
     </div>
     </>
  );
}

export default HomePage;
