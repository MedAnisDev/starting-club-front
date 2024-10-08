
import React, { useState } from 'react';
import './GalleryPage.css';
import { bechir, affiche, ppl } from "../../assets/index";

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="public-page-container">
      <h2 className='title'>Galerie</h2>
      <div className="gallery">
        <figure className='gallery__thumb' onClick={() => handleImageClick(bechir)}>
          <img src={bechir} alt="Galerie 1" />
          <figcaption className='gallery__caption'>Portrait by Mari Lezhava</figcaption>
        </figure>
        <figure className='gallery__thumb' onClick={() => handleImageClick(ppl)}>
          <img src={ppl} alt="Galerie 2" />
          <figcaption className='gallery__caption'>Portrait by Mari Lezhava</figcaption>
        </figure>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src={selectedImage} alt="Enlarged View" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
