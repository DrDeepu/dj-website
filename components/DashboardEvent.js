import Link from "next/link";

import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvent.module.css";

const DashboardEvent = ({ evt, handleDelete }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.attributes.Slug}`}>
          {evt.attributes.Name}
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`} className={styles.edit}>
        <FaPencilAlt /> <span>Edit Event</span>
      </Link>
      <Link
        href="#"
        className={styles.delete}
        onClick={() => {
          handleDelete(evt.id);
        }}
      >
        <FaTimes /> <span>Delete </span>
      </Link>
    </div>
  );
};

export default DashboardEvent;
