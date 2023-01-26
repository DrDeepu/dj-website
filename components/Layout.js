import { useRouter } from "next/router";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";
import styles from "@/styles/Layout.module.css";

const Layout = ({ title, description, keywords, children }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta content={keywords} name="keywords" />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
Layout.defaultProps = {
  title: "DJ Event App",
  description: "Welcome to the hotest DJ Event to ever host",
  keywords: "DJ Events, DJ, DJ Night, music",
};
