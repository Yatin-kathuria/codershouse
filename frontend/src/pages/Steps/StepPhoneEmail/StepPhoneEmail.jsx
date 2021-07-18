import React from "react";
import styles from "./StepPhoneEmail.module.css";
import Button from "../../../components/shared/button/Button";

const StepPhoneEmail = ({ onNext }) => {
  return (
    <>
      <div>StepPhoneEmail</div>
      <Button text="Next" onClick={onNext}></Button>
    </>
  );
};

export default StepPhoneEmail;
