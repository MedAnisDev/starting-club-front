import { useState, useEffect } from "react";
import { downloadFile } from "../../service/file/file.js";
import { noData } from "../../assets/index.js";

import "./fetchFiles.css";

const FetchDocumentFiles = ({ getSpecificFiles, deleteFileById }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrlList, setImageUrlList] = useState([]); // State for the image URL

  const fetchSpecificFiles = async () => {
    try {
      console.log(" get All Files :");

      const response = await getSpecificFiles();
      console.log("response from fetchSpecificFiles :", response);
      if (response && response.length) {
        const newImageUrlList = await Promise.all(
          response.map(async (item) => {
            const imageBlobUrl = await downloadFile(item.name);
            return { id: item.id, url: imageBlobUrl };
          })
        );

        setImageUrlList(newImageUrlList);
        console.log("Updated imageUrlList", newImageUrlList);
      }
    } catch (err) {
      console.log("error from fetchSpecificFiles", err);
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  //Delete image process
  const onDelete = (fileId) => {
    deleteFileById(fileId);
    console.log("file with id ", fileId, "is deleted");
    setImageUrlList(imageUrlList.filter((item) => item.id != fileId));
  };

  useEffect(() => {
    fetchSpecificFiles();
  }, [imageUrlList.length]);
  return (
    <>
      {imageUrlList.length > 0 ? (
        imageUrlList.map((item, index) => (
          <figure className="image-figure">
            <span className="delete-button" onClick={() => onDelete(item.id)}>
              &times;
            </span>
            <img
              onClick={() => handleImageClick(item.url)}
              key={index}
              src={item.url}
              alt={`athlete-file-${index}`}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </figure>
        ))
      ) : (
        <div className="noData-container">
          <img src={noData} className="noData" />
        </div>
      )}
      {selectedImage && (
        <div className="modal-image-container" onClick={handleCloseModal}>
          <div className="modal-image-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <img className="modal-image" src={selectedImage} alt="image" />
          </div>
        </div>
      )}
    </>
  );
};

export default FetchDocumentFiles;
