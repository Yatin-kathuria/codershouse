import React, { useState } from "react";
import styles from "../StepPhoneEmail.module.css";
import Button from "../../../../components/shared/button/Button";
import Card from "../../../../components/shared/card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";

function Phone({ onNext }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Card title="Welcome to CodersHouse!" icon="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className={styles.actionButtonWrap}>
        <Button text="Next" onClick={onNext} />
      </div>
      <p className={styles.bottomParagraph}>
        By entering your number, you're areeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
}

export default Phone;
