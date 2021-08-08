import React, { useState } from "react";
import styles from "./StepPhoneEmail.module.css";
import Button from "../../../components/shared/button/Button";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  const onTypeChange = (type) => {
    setType(type);
  };

  return (
    <div className={styles.cardWrapper}>
      <div>
        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.tabButton} ${
              type === "phone" ? styles.active : ""
            }`}
            onClick={() => onTypeChange("phone")}
          >
            <img src="/images/phone-white.png" alt="phone" />
          </button>
          <button
            className={`${styles.tabButton} ${
              type === "email" ? styles.active : ""
            }`}
            onClick={() => onTypeChange("email")}
          >
            <img src="/images/mail-white.png" alt="email" />
          </button>
        </div>
        <Component onNext={onNext} />
      </div>
    </div>
  );
};

export default StepPhoneEmail;
