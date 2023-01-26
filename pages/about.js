import Link from "next/link";
import Layout from "@/components/Layout"
const AboutPage = () => {
  return (
    <Layout title="About Page">
      <h1>About</h1>
      <p>This is the about page for DJ events application</p>
      <p>Version : 1.0.0</p>

      <Link href="/">Home</Link>
    </Layout>
  );
};

export default AboutPage;
