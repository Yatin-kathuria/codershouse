import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/button/Button";
import Card from "../../../components/shared/card/Card";
import Loader from "../../../components/shared/Loader/Loader";
import { activate } from "../../../http";
import { setAvatar } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import styles from "./StepAvatar.module.css";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.activate);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);

  useEffect(() => {
    return () => {
      setUnMounted(true);
    };
  }, []);

  const submit = async () => {
    if (!name || !image) return;
    setLoading(true);
    try {
      const { data } = await activate({ name, image });
      if (data.auth) {
        // check
        if (!unMounted) {
          dispatch(setAuth(data));
        }
        // onNext();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  if (loading) {
    return <Loader message="Activation in progress..." />;
  }

  return (
    <div className="cardWrapper">
      <Card title={`okay, ${name}`} icon="monkey-emoji">
        <p className={styles.subHeading}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img
            src={image ? image : "/images/monkey-avatar.png"}
            alt="avatar"
            className={styles.avatar}
          />
        </div>
        <div>
          <label htmlFor="avatarInput" className={styles.avatarLabel}>
            Choose a different photo
          </label>
          <input
            type="file"
            className={styles.avatarInput}
            onChange={captureImage}
            id="avatarInput"
            hidden
          />
        </div>
        <div>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
