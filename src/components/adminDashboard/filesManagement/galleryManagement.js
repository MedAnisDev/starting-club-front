import React, {  } from 'react';
import { useState , useEffect } from "react";


const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = useState("");

  const addImage = () => {
    const newImage = { id: images.length + 1, url: imageURL };
    setImages([...images, newImage]);
    setImageURL("");
  };

  const deleteImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };

  return (
    <div>
      <h2>Gallery Management</h2>
      <div>
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Enter image URL"
        />
        <button onClick={addImage}>Add Image</button>
      </div>
      <ul>
        {images.map(image => (
          <li key={image.id}>
            <img src={image.url} alt="gallery" style={{ width: '100px' }} />
            <button onClick={() => deleteImage(image.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryManagement;
