import cookie from "cookie";
import { API_URL } from "@/config/index";
import axios from "axios";
import FormData from "form-data";
export default async (req, res) => {
  // console.log("REQ", req);
  // console.log("RES0", res);
  if (req.method === "GET") {
    const { identifier, password } = req.body;
    // console.log("LOGIN REQ", req.body);
    // console.log(req.cookies.token);
    if (!req.cookies.token) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    // const { token } = req.cookies;
    const { token } = req.cookies;
    console.log(token);
    // const token = "yo";
    const config = axios
      .get(`${API_URL}/api/users/me`, {
        identifier,
        password,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log("Succes in User.js", response.data);
        res.status(200).json({ user: response.data });
      })
      .catch(function (error) {
        console.log("Error in User.js", error);
        res.status(403).json({ message: "Unauthorized" });
      });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
