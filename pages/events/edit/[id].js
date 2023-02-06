import axios from "axios";
import Model from "@/components/Model";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import moment from "moment";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

const EditEventPage = ({ data, slug }) => {
  const dat = data.data;
  // console.log("MAIN FUNCTINO ", dat.attributes.Image.data.attributes.formats.large.url);
  const [values, setValues] = useState({
    Name: dat.attributes.Name,
    Performers: dat.attributes.Performers,
    Venue: dat.attributes.Venue,
    Address: dat.attributes.Address,
    Date: dat.attributes.Date,
    Time: dat.attributes.Time,
    Description: dat.attributes.Description,
  });
  const [imagePreview, setImagePreview] = useState(
    dat.attributes.Image.data ? dat.attributes.Image.data.attributes.url : null
  );
  const [showModal, setShowModal] = useState(false);
  // console.log('IMAGE',imagePreview);
  // console.log(dat);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill all the fields");
    } else {
      axios
        .put(`${API_URL}/api/events/${dat.id}?populate=*`, { data: values })
        .then((response) => {
          // console.log("SUCCESS", response);
          console.log("SUCCESS", slug);
          const urls = response.data.data.attributes.Slug;
          router.push(`/events/${urls}`);
        })
        .catch((response) => console.log("ERROR", response));

      //   console.log(res);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = () => {
    return router.push("/events");
  };
  return (
    <Layout title="Add Event Page">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={values.Name}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="Performers"
              name="Performers"
              value={values.Performers}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="Venue"
              name="Venue"
              value={values.Venue}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="Address"
              name="Address"
              value={values.Address}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={moment(values.Date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="Time"
              name="Time"
              value={values.Time}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="Description"
            name="Description"
            value={values.Description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <>
          <Image
            src={dat.attributes.Image.data.attributes.url}
            width={100}
            height={100}
            alt="Image not Found"
          />
        </>
      ) : (
        <div>
          <p>Image not Uploaded</p>
        </div>
      )}{" "}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Model show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={dat.id}
          imageUploaded={() => imageUploaded}
          slug={slug}
        />
      </Model>
    </Layout>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  //   console.log(id);
  let data = await axios
    .get(`http://localhost:1337/api/events/${id}?populate=*`)
    .then((response) => {
      console.log("ID RESPONSE", response.data.data.attributes.Slug);
      return response;
    })
    .catch((response) => console.log("FAILED"));
  // console.log("AXIOS", data);
  // console.log(req.headers.cookie);
  console.log(data.data.data.attributes.Slug);
  return {
    props: { data: data.data, slug: data.data.data.attributes.Slug },
  };
}
