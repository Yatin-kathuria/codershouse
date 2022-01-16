import React, { useEffect, useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import styles from './Room.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRoom } from '../../http';

const Room = () => {
  const { id: roomId } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const [room, setRoom] = useState(null);
  const { clients, provideRef } = useWebRTC(roomId, user);

  const handleManualLeave = () => {
    history.push('/rooms');
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom(data);
    };

    fetchRoom();
  }, [roomId]);

  return (
    <div>
      <div className='container'>
        <button className={styles.goBack} onClick={handleManualLeave}>
          <img src='/images/arrow-left.png' alt='arrow-left' />
          <span>All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src='/images/palm.png' alt='palm-icon' />
            </button>
            <button className={styles.actionBtn} onClick={handleManualLeave}>
              <img src='/images/win.png' alt='win-icon' />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => (
            <div className={styles.client}>
              <div key={client.id} className={styles.userHead}>
                <audio
                  ref={(instance) => provideRef(instance, client.id)}
                  autoPlay
                />
                <img
                  src={client.avatar}
                  alt='avatar'
                  className={styles.userAvatar}
                />
                <button className={styles.micBtn}>
                  {/* <img src='/images/mic.png' alt='mic-icon' /> */}
                  <img src='/images/mic-mute.png' alt='mic-mute-icon' />
                </button>
              </div>
              <h4>{client.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
