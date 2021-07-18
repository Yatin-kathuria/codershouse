import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <buton className={styles.button} onClick={onClick}>
      <span>{text}</span>
      <img
        className={styles.arrow}
        src="/images/arrow-forward.png"
        alt="arrow"
      />
    </buton>
  );
};

export default Button;
