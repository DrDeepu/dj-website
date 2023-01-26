import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";
import Link from "next/link";
const Custom404 = () => {
  return (
    <Layout title="Page not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h3>Sorry, there is nothing here</h3>
        <Link href="/"> Go Back</Link>
      </div>
    </Layout>
  );
};

export default Custom404;
