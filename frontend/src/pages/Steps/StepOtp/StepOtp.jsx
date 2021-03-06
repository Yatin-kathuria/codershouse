import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/button/Button";
import Card from "../../../components/shared/card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { verifyOtp } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import styles from "./StepOtp.module.css";

const StepOtp = () => {
  const dispatch = useDispatch();
  const { phone, hash, ...rest } = useSelector((state) => state.auth.otp);

  const [otp, setOtp] = useState("");
  async function submit() {
    if (!otp || !hash || !phone) return;
    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="cardWrapper">
      <Card
        title={`Enter the code we just texted you .\nYour OTP (${rest.otp})`}
        icon="lock-emoji"
      >
        <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </div>
  );
};

export default StepOtp;
