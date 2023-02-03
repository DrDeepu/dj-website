import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { register, error } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passowrd dosen't match");
    }
    register({ username, email, password });
  };

  return (
    <Layout title="Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> User Registration
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              value={passwordConfirm}
              id="passwordConfirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete="on"
            />
          </div>
          <input type="submit" className="btn" value="Register" />
        </form>
        <p>
          Already have an account <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
