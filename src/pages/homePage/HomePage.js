import React, { useState, useEffect } from 'react';
import './HomePage.css';
import {affiche, Starting, run, course, delice, mosaique, safia } from "../../assets/index";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import Slider from 'react-slick';
import { Card, Col, Row } from 'antd';  // Import Ant Design components

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
        <h2>Nos Événements</h2>
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
        <h2>Aperçu Rapide</h2>
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

      {/* Partners Section */}
      <section className="partners-section">
        <h2>Nos Partenaires</h2>
        <div className="partners-logos">
          {partners.map((partner, index) => (
            <img key={index} src={partner.src} alt={partner.alt} className="partner-logo" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
