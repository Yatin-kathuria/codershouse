import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from "../../http";
import { useHistory } from "react-router-dom";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const history = useHistory();

  const onRoomTypeChange = (type) => {
    setRoomType(type);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const createRoom = async () => {
    try {
      if (!topic) return;
      const { data } = await create({ topic, roomType });
      history.push(`/room/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src="/images/close.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput
            fullWidth="true"
            onChange={handleTopicChange}
            value={topic}
          />
          <h2 className={styles.subHeading}>Room Types</h2>
          <div className={styles.roomTypes}>
            <div
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
              onClick={onRoomTypeChange.bind(null, "open")}
            >
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
              onClick={onRoomTypeChange.bind(null, "social")}
            >
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
              onClick={onRoomTypeChange.bind(null, "private")}
            >
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2 className={styles.footerHeading}>
            Start a room, open to everyone
          </h2>
          <button className={styles.footerButton} onClick={createRoom}>
            <img src="/images/celebration.png" alt="celebration" />
            <span>Let's Go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
