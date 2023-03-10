import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "@/config/index";
import Link from "next/link";
function EventPage({ event }) {
  // console.log(event);
  return (
    <Layout>
      <h1>Events</h1>
      {event.data.length === 0 && <h3>No events to Show</h3>}
      {event.data.map((evt) => (
        <Eventitem key={evt.id} evy={evt} />
      ))}
    </Layout>
  );
}

export default EventPage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=Date:ASC`);
  const event = await res.json();
  // console.log(event);
  return { props: { event }, revalidate: 1 };
}
