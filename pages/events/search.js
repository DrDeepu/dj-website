import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "@/config/index";
import Link from "next/link";
function SearchPage({ event }) {
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

export default SearchPage;

export async function getServerSideProps({query:{term}}) {
//   const res = await fetch(`${API_URL}/api/events?populate=*&sort=Date:ASC`);
  const res = await fetch(
    `${API_URL}/api/events?populate=*&filters[slug][$containsi]=${term}`
  );
  const event = await res.json();
  // console.log(event);
  return { props: { event }};
}
 