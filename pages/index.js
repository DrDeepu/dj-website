import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "../config/index";
import Link from "next/link";
function HomePage({ event }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {event.length === 0 && <h3>No events to Show</h3>}
      {event.map((evt) => (
        <Eventitem key={evt.id} evy={evt} />
      ))}
      {event.length > 2 && (
        <Link href="/events" className="btn-secondary">
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export default HomePage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=Date:ASC`);
  const event = await res.json();
  return { props: { event: event.data.slice(0, 3) }, revalidate: 1 };
}
