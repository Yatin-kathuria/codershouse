import React from "react";
import Button from "../../../components/shared/button/Button";
import styles from "./StepUsername.module.css";

const StepUsername = ({ onNext }) => {
  return (
    <>
      <div>StepUsername</div>
      <Button text="Next" onClick={onNext}></Button>
    </>
  );
};

export default StepUsername;
