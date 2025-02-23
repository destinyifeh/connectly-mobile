import {useUserStore} from '@/stores/user-store';
import {useEffect, useState} from 'react';
import {Socket, io} from 'socket.io-client';

export const useUserOnline = () => {
  const {currentUser, setIsConnnected} = useUserStore(state => state);
  const [userOnline, setUserOnline] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!currentUser?._id) return;

    const newSocket = io('http://192.168.0.199:4000'); // Replace with your backend URL
    setSocket(newSocket);

    // Notify backend that the user is online
    newSocket.emit('userConnected', currentUser._id);

    // Listen for real-time status updates
    newSocket.on('userStatus', ({userId, isOnline}) => {
      if (userId === currentUser._id) {
        console.log(`User ${userId} is ${isOnline ? 'online' : 'offline'}`);
        setUserOnline(isOnline);
        setIsConnnected(true);
      }
    });

    // Clean up on unmount or logout
    return () => {
      // newSocket.emit('userDisconnected', currentUser._id); // Notify server
      newSocket.disconnect();
      setIsConnnected(false);
    };
  }, [currentUser?._id]);

  return userOnline;
};
