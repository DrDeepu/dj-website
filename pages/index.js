import Layout from "@/components/Layout";
import { API_URL } from "../config/index";
function HomePage({ event }) {
  console.log(event);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {event.length === 0 && <h3>No events to Show</h3>}
      {event.map((evt) => {
        return <h3 key={evt.id}>{evt.name}</h3>;
      })}
    </Layout>
  );
}

export default HomePage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const event = await res.json();
  console.log(event);
  return { props: { event }, revalidate: 1 };
}
