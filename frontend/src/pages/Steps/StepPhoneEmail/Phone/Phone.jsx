import React, { useState } from "react";
import styles from "../StepPhoneEmail.module.css";
import Button from "../../../../components/shared/button/Button";
import Card from "../../../../components/shared/card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

function Phone({ onNext }) {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  const submit = async () => {
    // server request
    const { data } = await sendOtp({ phone: phoneNumber });
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  };

  return (
    <Card title="Welcome to CodersHouse!" icon="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className={styles.actionButtonWrap}>
        <Button text="Next" onClick={submit} />
      </div>
      <p className={styles.bottomParagraph}>
        By entering your number, you're areeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
}

export default Phone;
