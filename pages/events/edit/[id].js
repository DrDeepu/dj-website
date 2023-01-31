import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import moment from "moment";
import styles from "@/styles/Form.module.css";

const EditEventPage = ({ data }) => {
  console.log("MAIN FUNCTINO ", data);
  const dat = data.data;
  const [values, setValues] = useState({
    Name: dat.attributes.Name,
    Performers: dat.attributes.Performers,
    Venue: dat.attributes.Venue,
    Address: dat.attributes.Address,
    Date: dat.attributes.Date,
    Time: dat.attributes.Time,
    Description: dat.attributes.Description,
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
      axios
        .put(`${API_URL}/api/events/${dat.id}`, { data: values })
        .then((response) => {
          console.log("SUCCESS", response);
          const urls = response.data.data.attributes.Slug;
          router.push("/events");
        })
        .catch((response) => console.log("ERROR", response));

      //   console.log(res);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
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
    </Layout>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id } }) {
  //   console.log(id);
  let data = await axios
    .get(`http://localhost:1337/api/events/${id}`)
    .then((response) => {
      return response;
    })
    .catch((response) => console.log("FAILED"));
  return {
    props: { data: data.data },
  };
}
