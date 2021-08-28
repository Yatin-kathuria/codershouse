import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { setAuth } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

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
      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  );
}

export default Navigation;
