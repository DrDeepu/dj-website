// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { events } = require("./data.json");
export default function handler(req, res) {
  const evt = events.filter((et) => et.slug == req.query.slug);
  if (req.method === "GET") res.status(200).json(evt);
  else {
    res.setHeader("Allow", ["GET"]);
    res.status(404).json({ message: `method ${req.method} is not allowed` });
  }
}
