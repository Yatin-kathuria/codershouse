import React from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import styles from './Room.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef } = useWebRTC(roomId, user);

  return (
    <div>
      <h1>All Connected clients</h1>
      {clients.map((client) => (
        <div key={client.id}>
          <audio
            src=''
            ref={(instance) => provideRef(instance, client.id)}
            controls
            autoPlay
          ></audio>
          <h4>{client.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Room;
