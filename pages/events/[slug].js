import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import React from "react";
import styles from "@/styles/Event.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EventPage = ({ dat }) => {
  // console.log(dat.id);
  const router = useRouter();
  function deleteEvent(e) {
    if (confirm("Are you sure")) {
      axios
        .delete(`${API_URL}/api/events/${dat.id}`)
        .then((response) => {
          console.log("SUCCESS", response);
          router.push("/events");
        })
        .catch((response) => console.log("FAILED", response));
      // toast.success("Yipees");
    }
  }
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${dat.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <Link className={styles.delete} href={"#"} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </Link>
        </div>
        <span>
          {new Date(dat.attributes.Date).toLocaleDateString("en-US")} at{" "}
          {dat.Time}
        </span>
        <h1>{dat.attributes.Name}</h1>
        <ToastContainer />
        {dat.attributes.Image && (
          <div className={styles.image}>
            {" "}
            <Image
              src={
                dat.attributes.Image.data != null
                  ? dat.attributes.Image.data.attributes.formats.large.url
                  : "/images/event-default.png"
              }
              width={960}
              height={600}
              alt="Image Not Found"
            />
            {console.log(dat.attributes.Image)}
            <h3>Performers</h3>
            <p>{dat.attributes.Performers}</p>
            <h3>{"Description"}</h3>
            <p>{dat.attributes.Description}</p>
            <h3>Venue : {dat.attributes.Venue}</h3>
            <p>{dat.attributes.Address}</p>
            <Link href="/events" className={styles.back}>
              {"<"}Go Back
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getServerSideProps({ query: { slug } }) {
  // console.log("SLUG", slug);
  const res = await fetch(
    `${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`
  );
  const data = await res.json();
  console.log(data.data);
  return {
    props: { dat: data.data[0] },
  };
}
