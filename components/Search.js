import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css";
import { API_URL } from "../config";

const Search = () => {
  const [term, setTerm] = useState();
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    // router.asPath = "http://localhost:3000/events/";
    router.push(`events/search?term=${term}`);
    setTerm(``);
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search Events"
        ></input>
      </form>
    </div>
  );
};

export default Search;
