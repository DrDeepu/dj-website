import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "../config/index";
import Link from "next/link";
function HomePage({ event },window) {
  console.log(window);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {event.length === 0 && <h3>No events to Show</h3>}
      {event.data.map((evt) => (
        <Eventitem key={evt.id} evy={evt} />
      ))}
      {/* {console.log(event.length)} */}
      {event.data.length > 3 && (
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
  // console.log(event);
  // console.log(event);
  return { props: { event }, revalidate: 1 };
}
