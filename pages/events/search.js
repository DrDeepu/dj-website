import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "@/config/index";
function SearchPage({ event }) {
  console.log("EVENT", event);
  const router = useRouter();
  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      {router.query.term && <h1>Search Results for {router.query.term}</h1>}
      {event.data.length === 0 && <h3>No events to Show</h3>}
      {event.data.map((evt) => (
        <Eventitem key={evt.id} evy={evt} />
      ))}
    </Layout>
  );
}

export default SearchPage;

export async function getServerSideProps({ query: { term } }) {
  //   const res = await fetch(`${API_URL}/api/events?populate=*&sort=Date:ASC`);

  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            Performers: { $containsi: term },
          },
          {
            Venue: { $containsi: term },
          },
          {
            Description: { $containsi: term },
          },
          {
            Name: { $containsi: term },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const res = await fetch(
    // `${API_URL}/api/events?populate=*&filters[slug][$containsi]=${term}`
    `${API_URL}/api/events?populate=*&${query}`
  );
  const event = await res.json();
  // console.log(event);
  return { props: { event } };
}
