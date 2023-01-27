import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Eventitem.module.css";

export default function Eventitem({ evy }) {
  const s = evy;
  console.log("EVY", s);
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evy.attributes.Image
              ? evy.attributes.Image.data.attributes.formats.small.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
          alt="Image Not Found"
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evy.attributes.Date).toLocaleDateString('en-US')} at {evy.attributes.Time}
        </span>
        <h3>{evy.attributes.Name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`http://localhost:3000/events/${evy.attributes.Slug}`} className="btn">
          {" "}
          Details
        </Link>
      </div>
    </div>
  );
}
