import { useState } from "react";
import {
  Button,
  Form,
  DatePicker,
  Input,
  Table,
  Modal,
  Popconfirm,
  Select,
  Typography,
  notification,
} from "antd";

const UploadCustomFile = ({ uploadCustomFiles, id = null}) => {

  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState(null);

  const handleUploadChange = (event) => {
    const fileList = Array.from(event.target.files);
    setFiles(fileList);
    console.log("fileList : ", fileList);
    const images = fileList.map((file) => URL.createObjectURL(file));
    setPreviewImages(images); // Create a preview URL
  };

  const onCancelUploadModal = () => {
    setIsUploadingFile(false);
    setFiles(null);
    setPreviewImages(null);
  };

  const handleUploadFile = async () => {
    console.log("file from handleUploadFile", files);

    const formatData = new FormData();
    files.map((item) => formatData.append("files", item));
    if (id) {
      await uploadCustomFiles(id, formatData);
    } else {
      console.log("uploadCustomFiles null id ");
      await uploadCustomFiles(formatData);
    }
    setIsUploadingFile(false);
    setFiles(null);
    setPreviewImages(null);
    notification.success({
      message: "Upload Successful",
      duration: 2,  
  });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsUploadingFile(true)}
        style={{ marginBottom: 16, maxWidth: 200 }}
      >
        Upload File
      </Button>

      <Modal
        title="Upload File"
        open={isUploadingFile}
        onCancel={onCancelUploadModal}
        onOk={handleUploadFile}
      >
        <Input multiple type="file" onChange={handleUploadChange} />
        {previewImages && (
          <div style={{ marginTop: "10px" }}>
            {previewImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Preview ${index}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginBottom: "10px",
                }}
              />
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default UploadCustomFile;
