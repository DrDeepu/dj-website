import { useRouter } from "next/router";
import React from "react";

const EventPage = () => {
  const router = useRouter();
  console.log(router.query.slug);
  return (
    <div>
      <h1>My Slug Event</h1>
      <h3>{router.query.slug}</h3>
      <button onClick={()=>{router.push('/')}}>Home</button>
    </div>
  );
};

export default EventPage;
