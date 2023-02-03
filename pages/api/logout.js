import cookie from "cookie";
import { API_URL } from "@/config/index";
import axios from "axios";
import FormData from "form-data";
export default async (req, res) => {
  // console.log("REQ", req);
  // console.log("RES0", res);
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    // console.log("LOGIN REQ", req.body);
    // console.log(req.cookies.token);

    // Destory Cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Successfully Log out" });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
