import React from 'react';
import './Carousel.css';

function Carousel({ images }) {
  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div key={index} className="carousel-item">
          <img src={image.src} alt={image.alt} />
        </div>
      ))}
    </div>
  );
}

export default Carousel;
