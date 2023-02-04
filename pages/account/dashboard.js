import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import axios from "axios";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";

const DashboardPage = () => {
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>DashboardPage</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <h3>{evt.name}</h3>
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  console.log("Token", token);

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
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  // console.log("KEYS OF EVENTS", events);
  return {
    props: { events: events ? events : null },
  };
}
