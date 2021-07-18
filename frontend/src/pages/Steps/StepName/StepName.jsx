import React from "react";
import Button from "../../../components/shared/button/Button";
import styles from "./StepName.module.css";

const StepName = ({ onNext }) => {
  return (
    <>
      <div>StepName</div>
      <Button text="Next" onClick={onNext}></Button>
    </>
  );
};

export default StepName;
