import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "@/config/index";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //Register User
  //Login User
  const login = async ({ email: identifier, password }) => {
    // console.log("NEW IDEND", { identifier, password });
    await axios
      .post(
        `${NEXT_URL}/api/login`,
        { identifier, password },
        { "Content-Type": "aplication/json" }
      )
      .then((response) => {
        console.log("SUCCESS in Auth Context", response.data.data.user);
        setUser(response);
        router.push("/");
        return response;
      })
      .catch((response) => {
        console.log("FAILED in Auth Context", response.response.data.error);
        setError(response.response.data.error);
        setError(null);
        return response;
      });
  };
  //Logout User
  const logout = async () => {
    const res = await axios
      .post(`${NEXT_URL}/api/logout`)
      .then(() => {
        setUser(null);
        router.push("/");
      })

      .catch();
  };

  const checkUserLoggedIn = async (user) => {
    const res = await axios(`${NEXT_URL}/api/user`)
      .then((response) => {
        // console.log("Success in CheckUserLoggedIn", response.data.user);
        setUser(response.data.user);
        router.push("/account/dashboard");
      })
      .catch((response) => {
        console.log("Failed in CheckUserLoggedInresponse", response);
        // setError(response.response.data.message);
      });
  };
  const register = async ({ username, email, password }) => {
    // console.log("NEW IDEND", { identifier, password });
    await axios
      .post(
        `${NEXT_URL}/api/register`,
        { username, email, password },
        { "Content-Type": "aplication/json" }
      )
      .then((response) => {
        console.log("SUCCESS in Auth Context", response.data.data.user);
        setUser(response);
        router.push("/");
        return response;
      })
      .catch((response) => {
        console.log("FAILED in Auth Context", response.response.data.error);
        setError(response.response.data.error);
        setError(null);
        return response;
      });
  };
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
