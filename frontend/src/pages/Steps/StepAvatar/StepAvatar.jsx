import React from "react";
import Button from "../../../components/shared/button/Button";
import styles from "./StepAvatar.module.css";

const StepAvatar = ({ onNext }) => {
  return (
    <>
      <div>StepAvatar</div>
      <Button text="Next" onClick={onNext}></Button>
    </>
  );
};

export default StepAvatar;
