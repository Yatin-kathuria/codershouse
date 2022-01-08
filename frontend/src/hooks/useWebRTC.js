import { useCallback, useEffect, useRef } from 'react';
import { socketInit } from '../socket';
import { useStateWithCallback } from './useStateWithCallback';
import { ACTIONS } from '../actions';

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketInit();
    console.log(socket.current);
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  const addNewClients = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.some((client) => client.id === newClient.id);

      if (!lookingFor) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  // Capture media
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };
    startCapture().then(() => {
      addNewClients(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        // socket emit JOIN socketio
        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });
  }, []);

  return { clients, provideRef };
};
