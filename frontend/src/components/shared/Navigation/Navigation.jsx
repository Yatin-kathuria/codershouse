import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { setAuth } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link to="/" className={styles.brand}>
        <img src="/images/logo.png" alt="logo" />
        <span className={styles.logoText}>Codershouse</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          <Link to="/home">
            <img
              className={styles.avatar}
              src={user.avatar ? user.avatar : "/images/monkey-avatar.png"}
              alt="avatar"
            />
          </Link>
          <button onClick={logoutUser} className={styles.logoutButton}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
