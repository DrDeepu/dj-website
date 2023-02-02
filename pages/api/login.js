import { API_URL } from "@/config/index";
import axios from "axios";

export default async (req, res) => {
  // console.log("REQ", req);
  // console.log("RES0", res);
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    // console.log("LOGIN REQ", req.body);
    const strapiRes = await axios
      .post(`${API_URL}/api/auth/local`, {
        identifier,
        password,
      })
      .then((response) => {
        console.log("SUCCESSFULL LOGIN", Object.keys(response));
        res.status(200).json({ data: response.data });
        return response;
      })
      .catch((response) => {
        console.log("FAILED LOGIN", response.response.data.error.message);
        res
          .status(response.response.data.error.status)
          .json({ error: response.response.data.error.message });
        return response;
      });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
