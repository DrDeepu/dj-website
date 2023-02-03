import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const ImageUpload = ({ eventId, imageUploaded, slug }) => {
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", eventId);
    formData.append("field", "Image");

    const datas = await axios
      .post(`${API_URL}/api/upload`, formData)
      .then(() => {
        router.push(`/events/${slug }`);
        // console.log(eventId);
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
