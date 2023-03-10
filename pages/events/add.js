import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
const AddEventPage = () => {
  const [values, setValues] = useState({
    Name: "",
    Performers: "",
    Venue: "",
    Address: "",
    Date: "",
    Time: "",
    Description: "",
  });
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
      const res = await axios
        .post(`${API_URL}/api/events`, {
          data: values,
        })
        .then((response) => {
          console.log("SUCCESS", response);
          const urls = response.data.data.attributes.Slug;
          router.push("/events/" + urls);
        })
        .catch((response) => console.log("ERROR", response));
      console.log(res);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title="Add Event Page">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
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
              value={values.Date}
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
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEventPage;
