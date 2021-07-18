import React from "react";
import Button from "../../../components/shared/button/Button";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  return (
    <>
      <div>StepOtp</div>
      <Button text="Next" onClick={onNext}></Button>
    </>
  );
};

export default StepOtp;
