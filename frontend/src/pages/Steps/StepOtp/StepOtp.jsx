import React, { useState } from "react";
import Button from "../../../components/shared/button/Button";
import Card from "../../../components/shared/card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  function next() {}

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={next} text="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
