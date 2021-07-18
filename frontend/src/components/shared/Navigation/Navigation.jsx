import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={`${styles.navbar} container`}>
      <Link to="/" className={styles.brand}>
        <img src="/images/logo.png" alt="logo" />
        <span className={styles.logoText}>Codershouse</span>
      </Link>
    </nav>
  );
}

export default Navigation;
