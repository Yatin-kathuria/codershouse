import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/button/Button";
import Card from "../../../components/shared/card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { setName } from "../../../store/activateSlice";
import styles from "./StepName.module.css";

const StepName = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.activate);
  const [fullname, setFullname] = useState(name);

  const nextStep = () => {
    if (!fullname) return;

    dispatch(setName(fullname));
    onNext();
  };

  return (
    <div className="cardWrapper">
      <Card title="What's your full name?" icon="goggle-emoji">
        <TextInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <p className={styles.paragraph}>
          People use real names at coderhouse :) !
        </p>
        <div>
          <Button onClick={nextStep} text="Next" />
        </div>
      </Card>
    </div>
  );
};

export default StepName;
