import { parseCookies } from "@/helpers/index";
import DashboardEvent from "@/components/DashboardEvent";
import axios from "axios";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import Eventitem from "@/components/Eventitem";
import Layout from "@/components/Layout";
const DashboardPage = ({ events }) => {
  console.log(events);
  function deleteEvent(id) {
    console.log(id);
  }
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>DashboardPage</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.key} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  // console.log("Token", token);

  const config = {
    method: "get",
    url: `${API_URL}/api/events/me?populate=*`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const events = await axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      console.log("SUCCESS in Dashboard gSSP");
      return response.data;
    })
    .catch(function (error) {
      // console.log(error);
      console.log("FAILED in Dashboard gSSP");
    });
  return {
    props: { events: events ? events : null },
  };
}
