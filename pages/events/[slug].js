import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import React from "react";
import styles from "@/styles/Event.module.css";

const EventPage = ({ dat }) => {
  // console.log(dat.id);
  function deleteEvent(e) {
    // console.log("delete");
  }
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/event/edit/${dat.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <Link className={styles.delete} href={"#"} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </Link>
        </div>
        <span>
          {new Date(dat.Date).toLocaleDateString('en-US')} at {dat.Time}
        </span>
        <h1>{dat.Name}</h1>

        {dat.Image && (
          <div className={styles.image}>
            {" "}
            <Image
              src={dat.Image.data.attributes.formats.large.url}
              width={960}
              alt="IMAGE NOT FOUND"
              height={600}
            />
            <h3>Performers</h3>
            <p>{dat.Performers}</p>
            <h3>{"Description"}</h3>
            <p>{dat.Description}</p>
            <h3>Venue : {dat.Venue}</h3>
            <p>{dat.Address}</p>
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

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events?populate=*`);
//   const data = await res.json();
//   console.log(data.data[0].attributes.Slug);
//   const paths = data.data.map((event) => ({
//     params: { slug: event.attributes.Slug },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   // console.log(slug);
//   const res = await fetch(
//     `${API_URL}/api/events/?populate=*&filters[slug][$eq]=${slug}`
//   );
//   const data = await res.json();
//   // console.log(data[0].name);
//   return {
//     props: { dat: data.data[0].attributes },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  // console.log("SLUG", slug);
  const res = await fetch(
    `${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`
  );
  const data = await res.json();
  // console.log(data.data);
  return {
    props: { dat: data.data[0].attributes },
  };
}
