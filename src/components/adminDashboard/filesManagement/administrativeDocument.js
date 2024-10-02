import { useState, useEffect } from "react";
import { uploadMultipleFiles ,getAllDocumentFiles , deleteFileById} from "../../../service/file/file.js";
import UploadCustomFile from "../../fileHandle/uploadCustomFile.js";
import FetchDocumentFiles from "../../fileHandle/fetchDocumentFile.js";

import "./administrativeDocument.css"
const AdministrativeDocument = () => {
  return (
    <div className="admin-document-container">
      <h2>Administrative Document</h2>
      <UploadCustomFile
        uploadCustomFiles={uploadMultipleFiles}
      />

       <div className="images-container">
        <FetchDocumentFiles
         getSpecificFiles ={getAllDocumentFiles}
         deleteFileById={deleteFileById}
        />
       </div>
    </div>
  );
};

export default AdministrativeDocument;
