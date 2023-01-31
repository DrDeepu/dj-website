import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import axios from "axios";
const ImageUpload = ({ eventId, imageUploaded }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", eventId);
    formData.append("field", "Image");

    const datas = await fetch(`${API_URL}/api/upload`, {
      method: "post",
      body: formData,
    });

    // const d = await axios.put(`${API_URL}/api/upload`, {
    //   data: formData,
    // });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};

export default ImageUpload;
