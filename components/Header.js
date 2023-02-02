import Link from "next/link";
import { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import styles from "@/styles/Header.module.css";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">Add Event</Link>
              </li>
              <li>
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <button className="btn-secondary" onClick={() => logout()}>
                  <FaSignOutAlt />
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/account/login" className="btn-secondary btn-icon">
                <FaSignInAlt /> Log In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
