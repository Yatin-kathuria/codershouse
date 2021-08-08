import React, { useState } from "react";
import styles from "../StepPhoneEmail.module.css";
import Button from "../../../../components/shared/button/Button";
import Card from "../../../../components/shared/card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";

function Email(onNext) {
  const [emailId, setEmailId] = useState("");
  return (
    <Card title="Enter your Email id" icon="email-emoji">
      <TextInput value={emailId} onChange={(e) => setEmailId(e.target.value)} />
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

export default Email;
