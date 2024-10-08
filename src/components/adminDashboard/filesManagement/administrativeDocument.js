import { useState, useEffect } from "react";
import { uploadMultipleFiles ,getAllDocumentFiles , deleteFileById} from "../../../service/file/file.js";
import UploadCustomFile from "../../fileHandle/uploadCustomFile.js";
import FetchDocumentFiles from "../../fileHandle/fetchDocumentFile.js";

import "./administrativeDocument.css"
const AdministrativeDocument = () => {
  return (
    <div className="upload-images-dashboard-container" id="admin-document-conatainer">
      <h2 className="title">Administrative Document</h2>
      <UploadCustomFile
        uploadCustomFiles={uploadMultipleFiles}
      />

       <div className="images-grid" id="admin-document">
        <FetchDocumentFiles
         getSpecificFiles ={getAllDocumentFiles}
         deleteFileById={deleteFileById}
        />
       </div>
    </div>
  );
};

export default AdministrativeDocument;
