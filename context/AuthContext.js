import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "@/config/index";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //Register User
  const register = async (user) => {
    console.log(user);
  };
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
        return response;
      })
      .catch((response) => {
        console.log(
          "FAILED in Auth Context",
          response.response.data.error
        );
        setError(response.response.data.error);
        setError(null);
        return response;
      });
  };
  //Logout User
  const logout = async () => {
    console.log("LOGOUT");
  };
  const checkUserLoggedIn = async (user) => {
    console.log("Check");
  };
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
