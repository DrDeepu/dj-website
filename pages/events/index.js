import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "@/config/index";
import axios from "axios";
import { PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";
function EventPage({ event, page, total }) {
  // console.log(event);
  return (
    <Layout>
      <h1>Events</h1>
      {event.data.length === 0 && <h3>No events to Show</h3>}
      {event.data.map((evt) => (
        <Eventitem key={evt.id} evy={evt} />
      ))}
      <Pagination total={total} page={page} />
    </Layout>
  );
}

export default EventPage;

export async function getServerSideProps({ query: { page = 1 } }) {
  // console.log(page);
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  //Get Total
  const total = await axios
    .get(`${API_URL}/api/events?populate=*&sort=Date:ASC`)
    .then((response) => {
      // console.log(response.data.meta.pagination.total);
      return response.data.meta.pagination.total;
    });
  //Get TOTAL DATA
  const res = await axios
    .get(
      `${API_URL}/api/events?populate=*&sort=Date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`
    )
    .then((response) => response)
    .catch((response) => response);
  const event = res.data;
  // console.log(event);
  return { props: { event, page: +page, total } };
}
